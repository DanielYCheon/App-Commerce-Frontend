import React from "react";
import MainUserInfo from "../MainUserInfo";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import ChangePasswordPopup from "./ChangePasswordPopup";
export const Account = () => {
  const userID = sessionStorage.getItem("username");
  const userEmail = sessionStorage.getItem("email");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const checkPass1 = (event) => {
    event.preventDefault();
    setNewPassword(event.target.value);
  };
  const checkPass2 = (event) => {
    event.preventDefault();
    setConfirmPassword(event.target.value);
  };
  const currentPasswordHandler = (event) => {
    event.preventDefault();
    setCurrentPassword(event.target.value);
  };

  return (
    <div className="flex p-2">
      <MainUserInfo />
      <div className="mt-20 w-screen rounded-lg border border-gray-200 bg-gray-50 p-10">
        <div className="Header">
          <h1 className="text-3xl font-semibold">Account settings</h1>
          <p className="border-b-2 border-black py-2 text-base">
            Change your account settings
          </p>
        </div>
        <div className="mt-10 ">
          <h2 className="text-2xl font-semibold">User Infomation</h2>
          <p className="mt-6 text-base  text-gray-600">
            Your login user name is
            <span className="font-bold"> {userID}</span>
          </p>
        </div>
        <p className="mt-5 border-[1px] border-gray-300"></p>
        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Email Address</h2>
          <p className="mt-6  text-base  text-gray-600">
            Your email addres is
            <span className="font-bold"> {userEmail}</span>
          </p>
        </div>
        <p className="mt-5 border-[1px] border-gray-300"></p>
        <form>
          <h3 className="mt-10 text-2xl font-semibold">Change Password</h3>
          <div className="mt-5">
            {/* ------------------Current Password----------------- */}
            <div className="mb-6 w-1/2">
              <label className="mb-2 block text-base font-medium text-gray-500 ">
                Current Password
              </label>
              <input
                onChange={currentPasswordHandler}
                type="password"
                autoComplete="new-password"
                className="block w-[15vw] rounded-lg border border-gray-300 bg-gray-50 p-4 text-base text-gray-900  focus:border-blue-500 focus:outline-none  focus:ring-blue-500 "
              />
            </div>
            {/* -------------------------------------------------------------------------- */}
            <div className="flex gap-x-14">
              <div className="mb-6">
                <label className="mb-2 block text-base font-medium text-gray-500 ">
                  New Password
                </label>

                <input
                  onChange={checkPass1}
                  type="password"
                  className="block  w-[15vw] rounded-lg border border-gray-300 bg-gray-50 p-4 text-base  text-gray-900 focus:border-blue-500 focus:outline-none"
                  autoComplete="new-password"
                />
              </div>
              <div className="mb-6 w-1/2">
                <label className="mb-2 block text-base font-medium text-gray-500 ">
                  Confirm New Password
                </label>

                <input
                  onChange={checkPass2}
                  type="password"
                  autoComplete="new-password"
                  className="block w-[15vw] rounded-lg border border-gray-300 bg-gray-50 p-4 text-base text-gray-900  focus:border-blue-500 focus:outline-none  focus:ring-blue-500 "
                />
              </div>
            </div>
          </div>
        </form>
        <ChangePasswordPopup
          currentPassword={currentPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
        />
      </div>
    </div>
  );
};
