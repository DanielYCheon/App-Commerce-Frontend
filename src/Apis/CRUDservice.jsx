import { useState } from "react";
import api from "./api";
import axios from "axios";

/*
export const POSTregister = (username, email, password) => api.post('/api/auth/register', {username, email, password});

export function POSTregister(data) {
  return ApiBaseUrl.post('/api/auth/register', data);
}
*/

class CRUDservice {
  static async POSTregister(username, email, password) {
    try {
      const response = await api.post("/api/auth/register", {
        username,
        email,
        password,
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async POSTlogin(username, password) {
    try {
      //Cookie is managing by server side. So, we need to set withCredentials to true.
      const response = await api.post(`/api/auth/authenticate`, {
        username,
        password,
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async POSTimage(
    file,
    productName,
    productDescription,
    productPrice,
    gender,
  ) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("productName", productName);
    formData.append("productDescription", productDescription);
    formData.append("productPrice", productPrice);
    formData.append("gender", gender);
    console.log(file);
    try {
      const response = await api.post("/api/auth/imageupload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async GETallProductsByGender(gender) {
    try {
      const response = await api.get(`/api/auth/get/products/${gender}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default CRUDservice;
