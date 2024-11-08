import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { MapPinIcon, ShoppingBagIcon } from "@heroicons/react/16/solid";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MainUserInfo from "../MainUserInfo";
import ChangePasswordPopup from "./ChangePasswordPopup";
import { AuthContext } from "../../Context/AuthContext";

export default function Wishlist() {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/count",
          {
            username: sessionStorage.getItem("username"),
          },
        );
        // Grouping the data based on the product name
        const groupedData = response.data.reduce((accumulator, item) => {
          const key = item.productName;
          if (!accumulator[key]) {
            accumulator[key] = { ...item, count: 1 };
          } else {
            accumulator[key].count += 1;
          }
          return accumulator;
        }, {});

        setImageData(Object.values(groupedData));
        console.log("Grouped Image Data: ", Object.values(groupedData));
      } catch (error) {
        console.log("Error Detail: ", error);
      }
    };
    fetchImage();
  }, []);

  const totalPrice = (() => {
    const items = imageData;
    return items.reduce((total, item) => total + item.price * item.count, 0);
  })();

  return (
    <div className="flex p-2">
      <MainUserInfo />
      <div className="mt-20 w-screen rounded-lg border border-gray-200 bg-gray-50 p-10">
        <div className="Header">
          <h1 className="text-3xl font-semibold">Wishlist</h1>
          <p className="border-b-2 border-black py-2 text-base">
            Your saved items
          </p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {imageData.map((item, index) => (
            <div key={index} className="space-y-4 md:col-span-2">
              <div className="grid grid-cols-3 items-start gap-4">
                <div className="col-span-2 flex items-start gap-4">
                  <div className="h-28 w-28 shrink-0 rounded-md bg-gray-100 p-2 max-sm:h-24 max-sm:w-24">
                    <img
                      src={`data:image/jpeg;base64,${item.imageData}`}
                      alt="Product"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-base font-bold text-gray-800">
                      {item.productName}
                    </h3>
                    <p className="mt-0.5 text-xs font-semibold text-gray-500">
                      Quantity: {item.count}
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-gray-500">
                      Price: ${item.price}
                    </p>
                    <button
                      type="button"
                      className="mt-6 flex shrink-0 items-center gap-1 text-xs font-semibold text-red-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline w-4 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                          data-original="#000000"
                        ></path>
                        <path
                          d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                          data-original="#000000"
                        ></path>
                      </svg>
                      REMOVE
                    </button>
                  </div>
                </div>
                <div className="flex">
                  <h className="ml-auto mt-6 flex items-center   border-gray-300 bg-transparent px-3 py-1.5 text-xs text-gray-800 outline-none">
                    QTY
                  </h>
                  <div type="button" className="">
                    <span className="ml-auto mt-6 flex items-center rounded-md border border-gray-300 bg-transparent px-3 py-1.5 text-xs text-gray-800 outline-none">
                      {item.count}
                    </span>
                  </div>
                  <div className="outline-noneo ml-auto mt-6 flex items-center rounded-md border border-gray-300 bg-transparent px-3 py-1.5 text-xs text-gray-800">
                    <h4 className="font-bold">${item.price}</h4>
                  </div>
                </div>
              </div>
              <hr className="border-gray-300" />
            </div>
          ))}
        </div>
        <div class=" flex w-[50rem] items-center justify-between gap-4 p-10">
          <div class="text-base font-bold text-gray-900 dark:text-white">
            Total
          </div>
          <div class="text-base font-bold text-gray-900 dark:text-white">
            ${totalPrice.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
