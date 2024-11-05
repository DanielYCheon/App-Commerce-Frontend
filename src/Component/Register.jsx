import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CRUDservice from "../Apis/CRUDservice";

export const Register = () => {
  const navigate = useNavigate();
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isUserExist, setIsUserExist] = useState(null);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  function onChangeHandler(event) {
    console.log(event.target.value);
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  }

  const onSubmitRegisterHandler = async (event) => {
    event.preventDefault();
    if (userData.password !== userData.confirmpassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
      try {
        const user_Data = await CRUDservice.POSTregister(
          userData.username,
          userData.email,
          userData.password,
        );
        if (user_Data) {
          navigate("/login");
        } else {
          setIsUserExist("User already exist");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-stone-800/95">
      <div className="w-96 rounded-md bg-white p-5 sm:max-w-md">
        <h1 className="font-italic mb-10 text-4xl">Register</h1>

        <form onSubmit={onSubmitRegisterHandler}>
          <div className="mb-4">
            {isUserExist && <p className="text-red-500">{isUserExist}</p>}
            <input
              type="text"
              name="username"
              className="w-full border-b-2 border-b-black py-2  focus:bg-zinc-100/70 focus:outline-none"
              value={userData.username}
              onChange={onChangeHandler}
            />

            <label className="block" htmlFor="username">
              Username
            </label>
          </div>

          <div className="mb-4">
            <input
              type="email"
              name="email"
              className="w-full border-b-2 border-b-black py-2  focus:bg-zinc-100/70 focus:outline-none"
              value={userData.email}
              onChange={onChangeHandler}
            />
            <label className="block" htmlFor="email">
              Email
            </label>
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              className="w-full border-b-2 border-b-black py-2 
                        focus:bg-zinc-100/70 focus:outline-none"
              value={userData.password}
              onChange={onChangeHandler}
            />
            <label className="block">Password</label>
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="confirmpassword"
              className="w-full border-b-2 border-b-black py-2 
                        focus:bg-zinc-100/70 focus:outline-none"
              value={userData.confirmpassword}
              onChange={onChangeHandler}
            />
            <label className="block">Confirm Password</label>
            {!passwordMatch && (
              <p className="text-red-500">Password does not match</p>
            )}
          </div>

          <div className="relative justify-center text-center">
            <button
              className="text-md mb-2 me-2 mt-7 w-full rounded-lg border border-gray-300 bg-white px-5 py-2.5 font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>

        <div className="flex border-t-2 border-t-zinc-300 p-3">
          <h2>Already have an account?</h2>
          <button className="ml-2" type="button">
            <Link to="/Login">Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
};
