import axios from "axios";
// import style from "./LatestProducts.module.css";
import { useEffect, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";

export default function LatestProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    setIsLoading(true);
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        setProducts(res.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="row">
      {products.map((product) => (
        <div key={product._id} className="w-1/6 p-3">
          {isLoading ? <Loader /> : <ProductItem product={product} />}
        </div>
      ))}
    </div>
  );
}
