import axios from "axios";
import { AuthContext } from "./Context/AuthContext";
import { useContext } from "react";

const useAxios = () => {
  const { token, logout, refreshToken } = useContext(AuthContext);

  const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        await refreshToken();
        return instance(originalRequest);
      }
      if (error.response.status === 403) {
        logout();
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export default useAxios;
