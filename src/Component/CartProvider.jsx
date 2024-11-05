import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // State to store total quantity of the cart
  const [totalQuantity, setTotalQuantity] = useState(0);
  const url = "http://localhost:8080/api/auth/count";
  const data = {
    username: sessionStorage.getItem("username"),
  };

  // Fetch total quantity of the cart
  const fetchTotalQuantity = async () => {
    try {
      const response = await axios.post(url, {
        username: sessionStorage.getItem("username"),
      });

      console.log("Total Quantity:", response.data);
      setTotalQuantity(response.data);
    } catch (error) {
      console.log("Error Detail: ", error);
    }
  };

  useEffect(() => {
    const fetchTotalQuantity = async () => {
      try {
        const response = await axios.post(url, {
          username: sessionStorage.getItem("username"),
        });

        console.log("Total Quantity:", response.data);
        setTotalQuantity(response.data);
      } catch (error) {
        console.log("Error Detail: ", error);
      }
    };
    fetchTotalQuantity();
  }, []);
  return (
    <CartContext.Provider value={{ totalQuantity, fetchTotalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
