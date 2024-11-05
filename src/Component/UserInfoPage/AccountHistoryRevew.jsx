//this is the history review page for the user account

import React, { useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { MapPinIcon } from "@heroicons/react/16/solid";
import { ShoppingBagIcon } from "@heroicons/react/16/solid";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Account } from "./UserInfoPage/Account";
import Order from "./UserInfoPage/Order";
import ChangePasswordPopup from "./UserInfoPage/ChangePasswordPopup";

export default function MainUserInfo() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const userProps = sessionStorage.getItem("username");
  const [activateHover, setActivateHover] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  

  
  const userInfoComponent = [
    {
      name: "Account",
      icon: UserCircleIcon,
      link: "/account",
    },
    {
      name: "Address",
      icon: MapPinIcon,
      link: "/address",
    },
    {
      name: "Wishlist",
      icon: ShoppingBagIcon,
      link: "/wishlist",
    },
    {
      name: "Log out",
      icon: null,
      link: "/logout",
    },
  ];

  return (
    <div className="h-screen">
      <div className="mx-1 flex min-h-52 gap-3 pt-10 ">
        <div className="flex w-[25vw] items-center bg-red-600 text-base font-bold ">
          <ul className="w-full text-start">
            {userInfoComponent.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => onClickHandler(index)}
                  className={`m-0 my-6 rounded-lg border-2 p-5 pl-10 hover:bg-sky-700 ${activateHover === index ? "bg-white" : "bg-black"} `}
                >
                  <NavLink to={item.link} style={(isActive) =>({
                    color: isActive ? "white" : "black",
                  })}>
                    <div
                      className={`flex gap-2 focus:outline-none focus:ring-4 focus:ring-blue-300 `}
                    >
                      <button className="flex">
                        {item.icon && <item.icon className="w-6" />}
                        {item.name}
                      </button>
                    </div>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
