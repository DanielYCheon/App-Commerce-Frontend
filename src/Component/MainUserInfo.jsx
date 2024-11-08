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
                color: isActive ? "orange" : "black",
                backgroundColor: isActive ? "cyan" : "white",
              })}
            >
              <button
                className="flex focus:outline-none focus:ring-4 "
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
                backgroundColor: isActive ? "cyan" : "white",
              })}
              onClick={hoverEffect}
            >
              <div className="flex gap-2">
                <MapPinIcon className="w-6" />
                Address
              </div>
            </NavLink>
          </li>
          <li className=" p-5 pl-10 hover:bg-cyan-500">
            <NavLink
              to="/wishlist"
              style={({ isActive }) => ({
                color: isActive ? "orange" : "black",
                backgroundColor: isActive ? "white" : "white",
              })}
              onClick={hoverEffect}
            >
              <div className="flex gap-2">
                <ShoppingBagIcon className="flex w-6" />
                Wishlist
              </div>
            </NavLink>
          </li>

          <li className="m-0  p-5 pl-10 hover:bg-cyan-500">Log out</li>
        </ul>
      </div>
    </div>
  );
}
