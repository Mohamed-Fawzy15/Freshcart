import { useEffect, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Cart/CartSlice";
import { getProducts } from "../../Redux/Products/ProductsSlice";
import MainBtn from "../MainBtn/MainBtn";
import { CgMoreVerticalO } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

export default function LatestProducts() {
  const [products, setProducts] = useState([]);

  const naviagte = useNavigate();

  const dispatch = useDispatch();

  const getData = async () => {
    dispatch(getProducts())
      .then((res) => {
        setProducts(res.payload.data.slice(0, 8));
      })
      .catch((err) => {
        console.log(err);
      });
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

      <div className="flex justify-center">
        <MainBtn
          text="Load More"
          icon={CgMoreVerticalO}
          onClick={() => naviagte("/products")}
          className="bg-green-500 text-white hover:bg-green-600"
        />
      </div>
    </div>
  );
}
