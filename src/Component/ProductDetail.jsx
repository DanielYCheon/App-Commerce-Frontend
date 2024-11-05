import React from "react";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { click } from "@testing-library/user-event/dist/click";
import axios from "axios";
import api from "../Apis/api";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import { Error } from "./Error";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { productName } = useParams();
  const location = useLocation();
  const { product } = location.state;
  const [mouseCoordinate, setMouseCoordinate] = useState({ x: 0, y: 0 });
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageURL = `data:${product};base64,${product.imageData}`; //Encode the image data to base64
  const [isHovering, setIsHovering] = useState(false);
  const [size, setSize] = useState("");
  const [username, setUsername] = useState("");
  const [quantity, setQuantity] = useState(1);
  const userDisplay = sessionStorage.getItem("username");
  const navigate = useNavigate();

  const { user, isUserAuthentic } = useContext(AuthContext);

  const replaceProductName = productName
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const mouseMoveHandler = (event) => {
    const { left, top, width, height } = event.target.getBoundingClientRect();

    /*
    Find the coordinate(x,y) of the mouse on the image.
    Formula to calculate the coordinate of the mouse on the image
    X_total = (Coordindate of the mouse (X_axis) - left) / total width of the image (W) * relative percentage of the image (100%)               
    */

    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;

    let mouseX = event.clientX - left;
    let mouseY = event.clientY - top;

    /*
    Determine the zoomBox area using the ratio W_total: W_zoomBox : W_zoomBox = (Width : w_zoomBox) = (100% : 20%)
    w_Total/W_zoomBox = 100% / 20%; multiply cross 
    W_zoomBox * 100% = (Width * 20%) = Width * 0.2
    */

    const zoomBoxWidth = width * 0.2;
    const zoomBoxHeight = height * 0.2;

    /*to find the boundary of the zoomBox within the image; using center of zoomBox. "center of zoomBoxWidth = zoomBoxWidth / 2 "*/

    //----------------X-axis boundary ---------------------//
    if (mouseX < zoomBoxWidth / 2) {
      //to find left side boundary of the zoomBox within the image
      mouseX = zoomBoxWidth / 2;
    } else if (mouseX > width - zoomBoxWidth / 2) {
      //to find right side boundary of the zoomBox within the image
      mouseX = width - zoomBoxWidth / 2;
    }
    // ----------------Y-axis boundary ---------------------//
    if (mouseY < zoomBoxHeight / 2) {
      //to find top side boundary of the zoomBox within the image
      mouseY = zoomBoxHeight / 2;
    } else if (mouseY > height - zoomBoxHeight / 2) {
      //to find bottom side boundary of the zoomBox within the image
      mouseY = height - zoomBoxHeight / 2;
    }

    setMouseCoordinate({ x: mouseX, y: mouseY });
    setZoomPosition({ x: `${x}%`, y: `${y}%` });
  };

  const mouseMoveHandlerEnter = () => {
    setIsHovering(true);
  };

  const mouseMoveHandlerLeave = () => {
    setIsHovering(false);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
    alert("Size selected: " + event.target.value);
  };
  const checkimage = () => {
    console.log(`${product.productName}`);
  };

  const addToCart = async () => {
    setQuantity(quantity + 1);
    try {
      const data = {
        username: userDisplay,
        productName: `${product.productName}`,
        quantity: quantity,
      };
      const response = await api.post("/api/auth/add", data);

      if (response.status === 200 && isUserAuthentic) {
        console.log("Item added to cart successfully");
        alert("Item added to cart successfully");
        window.location.reload();
      }
    } catch (error) {
      if (!isUserAuthentic) {
        navigate("/login");
      } else {
        console.log("Error Detail: ", error);
      }
    }
  };

  useEffect(() => {}, []);

  return (
    <section className="mt-4 bg-white  px-8">
      <div className="text-sm font-semibold">
        <Link to="/" className="text-blue-500">
          Home
        </Link>
        <Link to="/woman" className="text-blue-500">
          /women
        </Link>
        <Link> {replaceProductName}</Link>
      </div>
      <div className="flex max-lg:flex-col lg:m-4 lg:p-4">
        {/*--------------------*Product Image -------------------*/}
        <div className="relative flex-1">
          <img
            src={imageURL}
            onMouseMove={mouseMoveHandler}
            onMouseEnter={mouseMoveHandlerEnter}
            onMouseLeave={mouseMoveHandlerLeave}
            alt={product.productName}
            className="w-full max-lg:w-full"
          />
          {isHovering && (
            <div
              className="absolute overflow-hidden border-2 "
              style={{
                top: `${mouseCoordinate.y}px`,
                left: `${mouseCoordinate.x}px`,
                width: "20%",
                height: "20%",
                transform: "translate(-50%,-50%)",
                pointerEvents: "none",
              }}
            >
              <img
                src={imageURL}
                className="absolute h-full w-full "
                style={{
                  transformOrigin: `${zoomPosition.x} ${zoomPosition.y}`,
                  transform: `scale(7)`,
                }}
              />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col items-center">
          {/*--------------------*Product Description -------------------*/}
          <div className="w-[70%] bg-gray-50 text-start max-lg:w-full">
            <p className=" font-midium text-sm"> {product.gender}</p>
            <h2 className="mt-2 font-sans text-3xl font-bold text-gray-800 max-xl:text-2xl">
              {replaceProductName}
            </h2>
            <p className="mt-3 font-sans text-xl font-semibold max-xl:text-lg">
              ${product.productPrice}
            </p>
            <p className="pt-4 font-normal text-gray-600/80 max-xl:text-base">
              {product.productDescription}
            </p>
            {/*--------------------*Size Selection -------------------*/}

            <div className="mt-4 items-center gap-6">
              <form className="w-full">
                <label
                  htmlFor="size"
                  className="text-sm font-medium text-gray-700"
                >
                  Size
                </label>
                <select
                  id="size"
                  className="block w-[50%] rounded-lg border border-gray-200 px-4 py-1 pe-9 text-sm focus:border-blue-500 focus:ring-blue-500  disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  onChange={handleSizeChange}
                >
                  <option defaultValue disabled>
                    Select Size
                  </option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>

                <button
                  type="button"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 xl:mt-20"
                  onClick={addToCart}
                >
                  <ShoppingBagIcon className="mx-4 w-6" />
                  Add to Cart
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
