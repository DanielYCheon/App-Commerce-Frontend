import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import api from "../Apis/api";
import { useNavigate } from "react-router-dom";
// Create the context
export const AuthContext = createContext();

// Create the provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");
  const [isUserAuthentic, setIsUserAuthentic] = useState(false);
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    user: "",
    token: null,
    isLoggedIn: false,
    isLoading: false,
    isPasswordMatch: null,
    errorMessages: "",
    isUserAuthentic: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const stayUserLogin = async () => {
      if (token) {
        setIsLoggedIn(true);
        console.log("page refresh and user is still logged in");
      } else {
        console.log("page refresh");
      }
    };
    stayUserLogin();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/refresh",
        {
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        setToken(response.data.accessToken);
      }
    } catch (error) {
      console.log("Authentication check failed: ", error);
    }
  };

  // Login function for the login component
  const loginForComponent = async (username, password, navigate) => {
    try {
      const response = await api.post(
        "http://localhost:8080/api/auth/authenticate",
        { username, password },
        { withCredentials: true },
      );
      console.log(response);

      // Store the token in the local storage
      localStorage.setItem("accessToken", response.data.accessToken);

      // Store the username and email in the session storage
      sessionStorage.setItem("username", response.data.username);
      sessionStorage.setItem("email", response.data.email);

      // Set the user state
      setUser(response.data.username);
      setErrorMessages(null);
      setIsLoggedIn(true);

      if (
        isLoggedIn &&
        localStorage.getItem("accessToken") &&
        sessionStorage.getItem("username")
      ) {
        setIsUserAuthentic(true);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setErrorMessages("Invalid username or password");
      setIsLoggedIn(false);
      navigate("/login");
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };
  // Check if the user is logged in

  const authContextValue = {
    user,
    logout,
    isLoggedIn,
    errorMessages,
    loginForComponent,
    isUserAuthentic,
  };

  return (
    // pass the value to the provider using the value prop
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
