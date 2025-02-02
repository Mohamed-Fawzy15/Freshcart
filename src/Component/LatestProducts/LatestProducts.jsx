import axios from "axios";
// import style from "./LatestProducts.module.css";
import { useContext, useEffect, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext/CartContext";

export default function LatestProducts() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

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

  const handleAddToCart = async (id) => {
    let res = await addToCart(id);
    console.log(res);

    if (res.status === "success") {
      toast.success(res.message, {
        style: {
          fontWeight: 600,
        },
      });
    } else {
      toast.error("Something went wrong", {
        style: {
          fontWeight: 600,
        },
      });
    }
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
            <ProductItem product={product} handleAddToCart={handleAddToCart} />
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
}
