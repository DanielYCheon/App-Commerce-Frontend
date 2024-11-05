import axios from "axios";
import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';
/**
Create an axios instance
 */

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});


export default api;
