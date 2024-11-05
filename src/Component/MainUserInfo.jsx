import React, { useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { MapPinIcon } from "@heroicons/react/16/solid";
import { ShoppingBagIcon } from "@heroicons/react/16/solid";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Account } from "./UserInfoPage/Account";
import ChangePasswordPopup from "./UserInfoPage/ChangePasswordPopup";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function MainUserInfo() {
  const [activateHover, setActivateHover] = useState(false);
  const navigate = useNavigate();
  const hoverEffect = (path) => {
    setActivateHover(true);
    navigate("/");
  };

  return (
    <div className="mt-2 h-screen ">
      <div className="py-4 text-4xl font-semibold">
        <h1 className="font-serif">Setting</h1>
      </div>
      <div className="flex min-h-52 w-[25vw] items-center  text-base font-semibold">
        <ul className="w-screen border-2 border-red-50 ">
          <li className=" p-5 pl-10 hover:bg-cyan-500">
            <NavLink
              to="/account"
              style={({ isActive }) => ({
                color: isActive ? "	#888888" : "black",
              })}
            >
              <button
                className="flex focus:outline-none focus:ring-4 focus:ring-blue-300 "
                onClick={() => hoverEffect("/account")}
              >
                <UserCircleIcon className="w-6 " />
                Account
              </button>
            </NavLink>
          </li>
          <li className=" p-5 pl-10 hover:bg-cyan-500">
            <NavLink
              to="/address"
              style={({ isActive }) => ({
                color: isActive ? "orange" : "black",
              })}
              onClick={hoverEffect}
            >
              <div className="flex gap-2">
                <MapPinIcon className="w-6" />
                Address
              </div>
            </NavLink>
          </li>

          <NavLink
            to="/wishlist"
            style={({ isActive }) => ({
              color: isActive ? "orange" : "black",
              backgroundColor: isActive ? "cyan" : "white",
            })}
            onClick={hoverEffect}
            className="flex gap-2  p-5 pl-10 hover:bg-cyan-500"
          >
            <ShoppingBagIcon className="flex w-6" />
            Wishlist
          </NavLink>

          <li className="m-0  p-5 pl-10 hover:bg-cyan-500">Log out</li>
        </ul>
      </div>
      <button className="w-full cursor-pointer  hover:bg-violet-600 focus:bg-slate-500 focus:outline-none focus:ring focus:ring-violet-300 active:bg-blue-700">
        Log out
      </button>
      <Link to="/viewcart">
        <button className="w-full cursor-pointer  hover:bg-violet-600 focus:bg-slate-500 focus:outline-none focus:ring focus:ring-violet-300 active:bg-blue-700">
          View Cart
        </button>
      </Link>
    </div>
  );
}
