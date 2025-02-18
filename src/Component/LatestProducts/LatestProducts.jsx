import { useContext, useEffect, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext/CartContext";
import { ApiContext } from "../../Context/APi/ApiContext";

export default function LatestProducts() {
  const [products, setProducts] = useState([]);
  const { addToCart, setNumOfCartItems } = useContext(CartContext);
  const { getProducts } = useContext(ApiContext);

  const getData = async () => {
    const data = await getProducts();
    setProducts(data.data);
  };

  const handleAddToCart = async (id) => {
    let res = await addToCart(id);
    setNumOfCartItems(res.numOfCartItems);

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
    getData();
  }, []);

  return (
    <div className="container my-10">
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 my-10 "
            >
              <ProductItem
                product={product}
                handleAddToCart={handleAddToCart}
              />
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
