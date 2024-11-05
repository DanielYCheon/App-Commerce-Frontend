import React from "react";
import { Link, useNavigate } from "react-router-dom";

function ProductsLayOut({ index, product }) {
  //product is the object that is passed from the parent component, the parent component is
  const navigate = useNavigate();
  const urlPathSpaceToDash = product.productName
    .replace(/\s/g, "_")
    .toLowerCase();
  const onclick = () => {
    navigate(`/${product.gender}/${urlPathSpaceToDash}`, {
      state: { product },
      //replace is used to replace the current URL with the new URL, or going back to the previous page will not show the current page
      replace: false,
    });
  };

  return (
    <div className="group relative" key={index} onClick={onclick}>
      <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
        <img
          //below code is used to display image from the database, imageData is the column name in the database
          src={`data:${product};base64,${product.imageData}`}
          alt={product.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <span aria-hidden="true" className="absolute inset-0"></span>
            {product.gender}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.productName}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">
          $ {product.productPrice}
        </p>
      </div>
    </div>
  );
}
export default ProductsLayOut;
