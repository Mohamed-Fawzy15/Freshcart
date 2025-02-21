import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../Context/APi/ApiContext";
import image from "../../assets/logo.svg";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import styles from "./Wishlist.module.css";
import { CartContext } from "../../Context/CartContext/CartContext";
import toast from "react-hot-toast";
import Loader from "../../Component/Loader/Loader";
import { Helmet } from "react-helmet";

export default function Wishlist() {
  const [wishListData, setWishListData] = useState([]);

  const { getWishList, removeWishList, setWishlistItem } =
    useContext(ApiContext);
  const { addToCart, setNumOfCartItems } = useContext(CartContext);

  const getData = async () => {
    const data = await getWishList();
    setWishListData(data.data);
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

  const handleDeleteFromWishist = async (id) => {
    const data = await removeWishList(id);

    if (data.status === "success") {
      setWishListData((prev) => prev.filter((product) => product.id !== id));
      setWishlistItem((prev) => prev - 1);
      setWishlistItem(data.data.length);
      
      toast.success("Product removed from wishlist", {
        style: {
          fontWeight: 600,
        },
      });
    } else {
      toast.error("Failed to remove product", {
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
    <div className="container min-h-screen">
      <Helmet>
        <title>Wishlist</title>
      </Helmet>

      <h2 className="capitalize text-3xl font-bold my-10 flex gap-5 items-center justify-center ">
        <div className="header"></div>
        <p> your wishlist</p>
      </h2>

      {wishListData.length > 0 ? (
        wishListData.map((product) => (
          <div
            key={product.id}
            className="max-w-screen-lg p-2 mx-auto my-10  shadow-black-600 shadow rounded-md relative"
          >
            <div className="p-4  mx-auto">
              <div className="grid sm:grid-cols-2 gap-2">
                <div className="rounded-md flex justify-center to-gray-50 w-full h-full p-4 shrink-0 text-center">
                  <img
                    src={product.imageCover}
                    className="w-56 h-[300px] "
                    alt={product.title}
                  />
                </div>

                <div>
                  <p className="text-green-500 font-semibold mb-2">
                    {product.category?.name}
                  </p>
                  <h2 className="font-bold text-2xl">{product.title}</h2>

                  <div className="flex items-center my-2">
                    <FaStar className="text-yellow-300 mx-2" />
                    <span>{product.ratingsAverage}</span>
                  </div>

                  <ul className="list-disc">
                    <li className="mt-2 font-semibold">
                      <span className="font-normal">Category:</span>{" "}
                      {product.category?.name}
                    </li>
                    <li className="mt-2 font-semibold">
                      <span className="font-normal">SubCategory:</span>{" "}
                      {product.subcategory[0].name}
                    </li>
                    <li className="mt-2 font-semibold">
                      <span className="font-normal">Brand:</span>{" "}
                      {product?.brand.name}
                    </li>
                    <li className="mt-2 font-semibold">
                      <span className="font-normal">Price :</span>{" "}
                      {product.price} LE
                    </li>
                  </ul>

                  <div className="py-2 pt-0 flex justify-between">
                    <div className="flex gap-1 items-center mt-4">
                      <button
                        className="CartBtn"
                        onClick={() => handleAddToCart(product.id)}
                      >
                        <span className="IconContainer">
                          <FaShoppingCart className="text-white text-lg me-2" />
                        </span>
                        <p className="text">Add to Cart</p>
                      </button>

                      <button
                        className={styles.noSelect}
                        onClick={() => handleDeleteFromWishist(product.id)}
                      >
                        <span className={styles.text}>Delete</span>
                        <span className={styles.icon}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
}
