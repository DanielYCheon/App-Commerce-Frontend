import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CRUDservice from "../Apis/CRUDservice";
import ProductsLayOut from "./ProductsLayOut";

const FetchDataForLayOut = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CRUDservice.GETallProductsByGender();
        setProducts(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {products.map((productCollection, index) => (
        <ProductsLayOut key={index} product={productCollection} />
      ))}
    </div>
  );
};
