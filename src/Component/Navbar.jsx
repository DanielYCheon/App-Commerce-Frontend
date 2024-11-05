import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import api from "../Apis/api";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  // User Authentication States
  const { user, isLoggedIn } = useContext(AuthContext);

  // Navigation
  const navigate = useNavigate();

  // UI States
  const [isHovered, setIsHovered] = useState(false);
  const [isPageRefresh, setPageRefresh] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Shopping Cart Management
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Toggle the Menu
  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  // Toggle Open/Close Shopping Cart
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Trigger the Menu Open and Close
  function triggerMenu() {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      console.log("Menu is open");
    } else {
      setIsMenuOpen(false);
      console.log("Menu is closed");
    }
  }

  // Trigger the Menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close the Menu if clicked outside the menu area
  const handleClickOutside = (event) => {
    if (isMenuOpen && !event.target.closest("content")) {
      closeMenu();
    }
  };

  // Get user's shopping cart from session storage
  const shoppingCartHandler = () => {
    const sessionUsername = sessionStorage.getItem("username");
  };

  // Check if the user is logged in or not using session and Token
  function handlerUserLoginClick() {
    if (
      sessionStorage.getItem("username") &&
      localStorage.getItem("accessToken")
    ) {
      navigate("/account");
    } else {
      navigate("/login");
    }
  }

  // Fetch the total quantity of the items in the shopping cart
  const url = "http://localhost:8080/api/auth/count";
  const data = {
    username: sessionStorage.getItem("username"),
  };
  const fetchTotalQuantity = async () => {
    try {
      const response = await axios.post(url, {
        username: sessionStorage.getItem("username"),
      });

      // Grouping the data based on the product name
      const groupedData = response.data.reduce((accumulator, item) => {
        // Get the key from the product name
        const key = item.productName;
        if (!accumulator[key]) {
          // If the key does not exist, create a new key with the item
          accumulator[key] = { ...item, quantity: 1 };
        } else {
          // If the key exists, increment the quantity
          accumulator[key].quantity += 1;
        }
        return accumulator;
      }, {});

      // To test the total quantity of the items in the shopping cart in the console
      console.log("Total Quantity::", response.data.length);

      // Combine the items in the shopping cart
      const combinedItems = Object.values(groupedData);
      setCartItems(combinedItems);

      // Set the total quantity of the items in the shopping cart
      setTotalQuantity(
        combinedItems.reduce((total, item) => total + item.quantity, 0),
      );

      // Set the total price of the items in the shopping cart
      setTotalPrice(
        combinedItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ),
      );
    } catch (error) {
      console.log("Error Detail: ", error);
    }
  };

  // Fetch the total quantity of the items in the shopping cart
  useEffect(() => {
    fetchTotalQuantity();
  }, [user]);

  return (
    <div onClick={handleClickOutside}>
      <nav className="flex h-[5.5vh] w-full items-center justify-between bg-stone-800 text-cyan-50 opacity-70 md:px-4">
        <h1 className="md:text-1xl font-bold lg:text-2xl">
          <Link to="/">DANIELC</Link>
        </h1>
        <div className="flex flex-row justify-between gap-x-10">
          <Link to="/men">Men</Link>

          <Link to="/women">Woman</Link>
        </div>

        <div className="flex flex-row">
          <button type="button" onClick={handlerUserLoginClick}>
            <AiOutlineUser className="mr-4 text-xl md:mr-6 md:text-2xl lg:mr-8 lg:text-3xl" />
          </button>
          <button type="button" onClick={shoppingCartHandler}>
            <div className="relative">
              <HiOutlineShoppingBag
                className="mr-6 text-xl md:mr-8 md:text-2xl lg:mr-0 lg:text-3xl"
                onClick={toggleCart}
              />

              {totalQuantity >= 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {totalQuantity}
                </span>
              )}
            </div>
          </button>
          <AiOutlineMenu
            className="ml-8 text-xl md:text-2xl lg:text-3xl"
            onClick={triggerMenu}
          />
        </div>
      </nav>
      {/*------------Click Shopping Cart Triggle---------------------- */}
      {isCartOpen && (
        <div
          class="fixed z-10"
          aria-labelledby="slide-over-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>

          <div class="fixed inset-0 overflow-hidden">
            <div class="absolute inset-0 overflow-hidden">
              <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div class="pointer-events-auto w-screen max-w-md">
                  <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div class="flex items-start justify-between">
                        <h2
                          class="text-lg font-medium text-gray-900"
                          id="slide-over-title"
                        >
                          Shopping cart
                        </h2>
                        <div class="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={toggleCart}
                          >
                            <span class="absolute -inset-0.5"></span>
                            <span class="sr-only">Close panel</span>
                            <svg
                              class="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div class="mt-8">
                        <div class="flow-root">
                          <ul
                            role="list"
                            class="-my-6 divide-y divide-gray-200"
                          >
                            {cartItems.map((item) => (
                              <li key={item.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={`data:image/jpeg;base64,${item.imageData}`}
                                    alt={item.name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>
                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href="#">{item.name}</a>
                                      </h3>
                                      <p className="ml-4">${item.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {item.color}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      Qty {item.quantity}
                                    </p>
                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div class="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${totalPrice}</p>
                      </div>
                      <p class="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div class="mt-6">
                        <a
                          href="#"
                          class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </a>
                      </div>
                      <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            class="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/*------------------Click Menu Triggle--------------------------------- */}
      {isMenuOpen && (
        <div
          className="fixed right-0 top-0 z-50 flex h-full w-full justify-center bg-stone-800/80 text-cyan-50 sm:w-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
          onMouseLeave={handleMouseLeave}
        >
          <ul className="ml-90 mt-16 flex min-w-min flex-col pt-11 text-center sm:text-right">
            <li className="py-6 text-4xl sm:px-7 sm:text-3xl md:px-7  md:text-4xl lg:px-7 lg:text-5xl">
              <h3> New Collection</h3>
            </li>
            <li className="py-2 text-3xl sm:px-7 sm:text-2xl md:px-7  md:text-3xl lg:text-4xl">
              <Link to="/women">Women</Link>
            </li>
            <li className="py-2 text-3xl sm:px-7 sm:text-2xl md:px-7  md:text-3xl lg:text-4xl">
              <Link to="/men">Men</Link>
            </li>
            <li className="py-2 text-3xl sm:px-7 sm:text-2xl md:px-7  md:text-3xl lg:text-4xl">
              Jewelry
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
