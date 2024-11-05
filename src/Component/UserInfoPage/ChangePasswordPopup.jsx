import React from "react";
import { useState } from "react";
import { Account } from "./Account";
import api from "../../Apis/api";

import axios from "axios";

const ChangePasswordPopup = ({
  newPassword,
  confirmPassword,
  currentPassword,
}) => {
  const [isPopup, setIsPopup] = useState(true);
  const username = sessionStorage.getItem("username");

  const ClickHandler = () => {
    if (newPassword === confirmPassword) {
      setIsPopup(true);

      alert("Password successfully changed");
    } else {
      setIsPopup(false);
      console.log("Password does not match");
    }
  };

  const changePassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/change-password",
        {
          username: username,
          oldPassword: currentPassword,
          newPassword: newPassword,
        },
      );

      if (response.status === 200) {
        alert("Password changed successfully");
      } else {
        console.log("Password change failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Change Password">
      {!isPopup && (
        <div className="popup">
          <p className="text-md text-red-600">
            Password does not match. Try again
          </p>
        </div>
      )}
      <button
        className="rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white"
        onClick={ClickHandler}
      >
        Change Password
      </button>
    </div>
  );
};

export default ChangePasswordPopup;
