import React from "react";
import { FaStar } from "react-icons/fa";

export default function ProductItem({ product }) {
  return (
    <div className="inner product p-1 ">
      <img src={product.imageCover} className="w-full " alt="" />
      <small className="text-green-600">{product.category?.name}</small>
      <h5 className="font-semibold mb-2 line-clamp-1">
        {product.title.split(" ").slice(0, 3).join(" ")}
      </h5>
      <div className="flex justify-between">
        <div>{product.price}EGP</div>
        <div className="flex items-center">
          <FaStar className="text-yellow-300 mx-1" />{" "}
          <span>{product.ratingsAverage}</span>
        </div>
      </div>
    </div>
  );
}
