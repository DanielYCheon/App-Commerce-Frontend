import React, { useEffect } from "react";
import { useState } from "react";
import CRUDservice from "../Apis/CRUDservice";
import ProductsLayOut from "./ProductsLayOut";

const WomanSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CRUDservice.GETallProductsByGender("Women");
        setProducts(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
          For Women
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products?.map((productCollection, index) => (
            <ProductsLayOut key={index} product={productCollection} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WomanSection;
