import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
/*
function AddToCartButton() {
  const [cartItemCount, setCartItemCount] = useState(0);

  const addToCart = (username, imageName, quantity) => {
    axios
      .post("http://localhost:8080/api/cart/add", {
        username: username,
        imageName: imageName,
        quantity: quantity,
      })
      .then(() => {
        axios
          .get(`http://localhost:8080/api/cart/count?username=${username}`)
          .then((response) => {
            setCartItemCount(response.data);
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  const testoutput = () => {
    console.log();
  };

  return (
    <div>
      <button onClick={() => addToCart("username", "imageName", 1)}>
        Add to Cart
      </button>
      <p>Items in cart: {cartItemCount}</p>
      <button onClick={testoutput}>Click Here for test</button>
    </div>
  );
}

export default AddToCartButton;
*/
