import React from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { redirect, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const sessionUsername = sessionStorage.getItem("username");
  const localStorageAccessToken = localStorage.getItem("accessToken");

  if (sessionUsername && localStorageAccessToken) {
    return children;
  } else {
    return redirect("/adminpage");
  }
};
export default ProtectedRoute;
