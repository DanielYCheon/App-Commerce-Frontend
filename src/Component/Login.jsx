import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CRUDservice from "../Apis/CRUDservice";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import api from "../Apis/api";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
export const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const { loginForComponent, errorMessages } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Handling the input fields
  const onSubmitLoginHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Call the loginForComponent function from the AuthContext
    try {
      const response = await loginForComponent(username, password, navigate);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center bg-stone-800/95 sm:justify-center">
      {isLoading ? (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          Loading...
        </div>
      ) : (
        ""
      )}

      <div className="w-96 rounded-md bg-white p-5 sm:max-w-md">
        <h1 className="mb-10 font-serif text-4xl ">Login</h1>

        <form onSubmit={onSubmitLoginHandler}>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              value={username}
              className="w-full border-b-2 border-b-black py-2 focus:bg-zinc-100/70 focus:outline-none"
              onChange={(envent) => setUsername(envent.target.value)}
            />
            <label className="font-md block">User ID</label>
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={password}
              className="w-full border-b-2 border-b-black py-2 focus:bg-zinc-100/70 focus:outline-none "
              onChange={(event) => setPassword(event.target.value)}
            />
            <label className="font-md block">Password</label>
          </div>
          {errorMessages && <div className="text-red-500">{errorMessages}</div>}
          <div className="relative justify-center text-center">
            <button
              className=" text-md mb-2 me-2 mt-7 w-full rounded-lg border border-gray-300 bg-white px-5 py-2.5 font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>

        <div className="">
          <button className="m-3 text-sm" type="button">
            Forgot Password?
          </button>
        </div>

        <div className="flex  border-t-2 border-t-zinc-300 p-3">
          <h2>If you don't have account?</h2>
          <button className="ml-2" type="button">
            <Link to="/Register">Register</Link>
          </button>
        </div>
      </div>
    </div>
  );
};
