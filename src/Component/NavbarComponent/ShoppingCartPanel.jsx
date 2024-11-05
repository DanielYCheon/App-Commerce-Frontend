/*
This component descript when user click the icon shopping cart, it will show the product that user has added to the cart.

*/
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const ShoppingCartPanel = () => {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/count",
          {
            username: sessionStorage.getItem("username"),
          },
        );
        setImageData(response.data);
        console.log("Image Data: ", response.data);
      } catch (error) {
        console.log("Error Detail: ", error);
      }
    };
    fetchImage();
  }, []);

  return (
    <div>
      <div>
        <p>This is Result:</p>
        <div>
          {imageData.map((imageData, index) => (
            <div key={index}>
              asdf
              <p>{imageData.price}</p>
              <p>{imageData.description}</p>
              <img
                src={`data:image/jpeg;base64,${imageData.imageData}`}
                alt="Product"
                className="h-[10%] w-[10%]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
