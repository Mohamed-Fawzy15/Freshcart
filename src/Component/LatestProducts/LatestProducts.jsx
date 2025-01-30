import axios from "axios";
// import style from "./LatestProducts.module.css";
import { useEffect, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";

export default function LatestProducts() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="row">
      {products.length > 0 ? (
        products.map((product) => (
          <div
            key={product._id}
            className="w-full md:w-1/2 lg:w-1/3 xl:w-1/6 p-3"
          >
            <ProductItem product={product} />
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
}
