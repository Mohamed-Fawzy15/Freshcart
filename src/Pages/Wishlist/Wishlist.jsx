import { useEffect, useState } from "react";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import styles from "./Wishlist.module.css";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Cart/CartSlice";
import {
  getWishlist,
  removeFromWishlist,
} from "../../Redux/Wishlist/WishlistSlice";
import MainBtn from "../../Component/MainBtn/MainBtn";

export default function Wishlist() {
  const [wishListData, setWishListData] = useState([]);
  console.log(wishListData);

  const dispatch = useDispatch();

  const getData = async () => {
    await dispatch(getWishlist())
      .then((res) => {
        setWishListData(res.payload);
      })
      .catch((err) => console.log(err));
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

  const handleDeleteFromWishist = async (id) => {
    dispatch(removeFromWishlist(id))
      .then(() => {
        setWishListData((prev) => prev.filter((product) => product.id !== id));
        toast.success("Product removed from wishlist", {
          style: {
            fontWeight: 600,
          },
        });
      })
      .catch(() => {
        toast.error("Failed to remove product", {
          style: {
            fontWeight: 600,
          },
        });
      });
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
        <p className="dark:text-white"> your wishlist</p>
      </h2>

      {wishListData.length > 0 ? (
        wishListData.map((product) => (
          <div
            key={product.id}
            className="max-w-screen-lg p-2 mx-auto my-10  shadow-black-600 shadow rounded-md relative dark:shadow-gray-300"
          >
            <div className="p-4  mx-auto">
              <div className="grid sm:grid-cols-2 gap-2">
                <div className="rounded-md flex justify-center to-gray-50 w-full h-full p-4 shrink-0 text-center ">
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
                  <h2 className="font-bold text-2xl dark:text-white">
                    {product.title}
                  </h2>

                  <div className="flex items-center my-2">
                    <FaStar className="text-yellow-300 mx-2" />
                    <span className="dark:text-white">
                      {product.ratingsAverage}
                    </span>
                  </div>

                  <ul className="list-disc">
                    <li className="mt-2 font-semibold dark:text-white">
                      <span className="font-normal">Category:</span>{" "}
                      {product.category?.name}
                    </li>
                    <li className="mt-2 font-semibold dark:text-white">
                      <span className="font-normal ">SubCategory:</span>{" "}
                      {product.subcategory[0].name}
                    </li>
                    <li className="mt-2 font-semibold dark:text-white">
                      <span className="font-normal d">Brand:</span>{" "}
                      {product?.brand.name}
                    </li>
                    <li className="mt-2 font-semibold dark:text-white">
                      <span className="font-normal ">Price :</span>{" "}
                      {product.price} LE
                    </li>
                  </ul>

                  <div className="py-2 pt-0 flex justify-between">
                    <div className="flex gap-1 items-center mt-4">
                      <MainBtn
                        text={"Add to Cart"}
                        onClick={() => handleAddToCart(product.id)}
                        icon={FaShoppingCart}
                      />

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
        <div className="text-center">
          <p>No Data found</p>
        </div>
      )}
    </div>
  );
}
