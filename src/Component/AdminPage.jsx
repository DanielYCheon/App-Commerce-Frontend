import react from "react";
import { useState } from "react";
import axios from "axios";
import api from "../Apis/api";
import POSTimage from "../Apis/CRUDservice";
import CRUDservice from "../Apis/CRUDservice";

export function AdminPage() {
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    gender: "",
  });

  //Handling the input fields
  function onChangeHandler(event) {
    console.log(event.target.value);
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  }

  //Handling the file upload
  function fileUploadHandler(event) {
    console.log(event.target.files);

    //Setting the file to the state
    setFile(event.target.files[0]);
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await CRUDservice.POSTimage(
        file,
        product.productName,
        product.productDescription,
        product.productPrice,
        product.gender,
      );
      console.log(response);
      alert("Product uploaded successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-zinc-400/30 px-28">
      {/* Call "finally", and showing Loaing screen. Response success or Response fail*/}
      {isLoading ? (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          Loading...
        </div>
      ) : (
        ""
      )}
      <h1 className="pt-10 text-center font-serif">A d m i n P a n e l</h1>
      {/*------------------------------Product Upload Component---------------------------------*/}

      <div className="CONTAINER">
        <div className="flex h-full w-full flex-col items-center justify-center bg-zinc-300/80">
          <h2 className="mb-5 mt-5">Product Upload</h2>
          <form className="mb-10" onSubmit={submitHandler}>
            <div className="flex flex-col gap-5">
              {/*-------------------------------------------------------------------*/}
              <label className="font-medium text-black">Select Gender</label>
              <select
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={product.gender}
                name="gender"
                onChange={onChangeHandler}
              >
                <option value="" disabled>
                  Choose a gender
                </option>
                <option name="gender" value="Women">
                  Women
                </option>
                <option name="gender" value="Men">
                  Men
                </option>
              </select>

              {/*-----------------------------------------*/}
              <label>Product Name</label>
              <input
                type="text"
                name="productName"
                className="rounded-lg border-2 p-2"
                value={product.productName}
                onChange={onChangeHandler}
              ></input>

              <label>Product Description</label>
              <textarea
                className="rounded-lg border-2 p-2"
                name="productDescription"
                value={product.productDescription}
                rows={15}
                cols={50}
                onChange={onChangeHandler}
              ></textarea>
              <label>Product Price</label>
              <input
                type="text"
                name="productPrice"
                className="rounded-lg border-2 p-2"
                value={product.productPrice}
                onChange={onChangeHandler}
              ></input>

              <div className="File Upload  border-10 w-72">
                <label className="mb-2 text-sm font-medium text-gray-900">
                  Upload file
                </label>
                <input
                  className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  id="file_input"
                  type="file"
                  onChange={fileUploadHandler}
                ></input>
                <p className="mt-1 text-sm text-gray-500 " id="file_input_help">
                  SVG, PNG, JPG or GIF (MAX. 800x400px).
                </p>
                <button
                  type="sumbit"
                  className="mt-5 h-10 w-24 rounded-lg bg-blue-500 text-center font-semibold text-white hover:bg-blue-600"
                >
                  Upload
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/*------------------------------------------------------------------------------------*/}
    </div>
  );
}
