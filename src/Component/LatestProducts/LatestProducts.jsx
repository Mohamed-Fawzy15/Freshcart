import { useContext, useEffect, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext/CartContext";
import { ApiContext } from "../../Context/APi/ApiContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/Cart/CartSlice";

export default function LatestProducts() {
  const [products, setProducts] = useState([]);
  const { setNumOfCartItems } = useContext(CartContext);
  const { getProducts } = useContext(ApiContext);


  const dispatch = useDispatch();

  const getData = async () => {
    const data = await getProducts();
    setProducts(data.data);
  };

  const handleAddToCart = async (id) => {
    dispatch(addToCart(id))
      .then((res) => {
        if (res.payload.status === "success") {
          console.log(res);

          toast.success(res.payload.message, {
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
      })
      .catch((err) => console.log(err));
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
