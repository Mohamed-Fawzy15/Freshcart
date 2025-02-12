import { Helmet } from "react-helmet";
// import styles from "./Cart.module.css";
import { useContext } from "react";
import { useEffect } from "react";
import { CartContext } from "../../Context/CartContext/CartContext";
import { useState } from "react";
// import Loader from "../../Component/Loader/Loader";
import { FaBackward, FaEye, FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import styles from "./Cart.module.css";
import { IoBagCheckOutline } from "react-icons/io5";
import SpringModel from "../../Component/SpringModel/SpringModel";
import Loader from "../../Component/Loader/Loader";

export default function Cart() {
  const {
    getLoggedCart,
    removeCartItem,
    updateCartItem,
    clearCartItem,
    setNumOfCartItems,
    setCartId,
    numOfCartItems,
  } = useContext(CartContext);
  const [cartData, setCartData] = useState(null);
  const navigate = useNavigate();
  const [openProductId, setOpenProductId] = useState(null); // Track which product's modal is open

  const getData = async () => {
    const data = await getLoggedCart();
    setCartData(data.data);
    setNumOfCartItems(data.numOfCartItems);
    setCartId(data.cartId);
    console.log(data);
  };

  const deleteProduct = async (id) => {
    const newData = await removeCartItem(id);
    setCartData(newData.data);
    setNumOfCartItems(newData.numOfCartItems);
  };

  const updateProduct = async (id, count) => {
    const data = await updateCartItem(id, count);
    setCartData(data.data);
  };

  const deleteAllProducts = async () => {
    const data = await clearCartItem();
    setNumOfCartItems(0);

    if (data.message === "success") {
      setCartData(null);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mx-auto">
      <Helmet>
        <title>Cart</title>
      </Helmet>

      {cartData ? (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-5 my-6 ">
              <div className="header"></div>
              <h1 className="text-2xl font-semibold">Shopping Cart</h1>
            </div>

            <button
              className={styles.noSelect}
              onClick={() => deleteAllProducts()}
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

          <div className="flex w-full">
            <div className="relative w-2/3 p-5 overflow-x-auto sm:rounded-lg">
              {cartData.products?.map((product) => (
                <div
                  className="flex p-4 shadow m-4 rounded-lg"
                  key={product._id}
                >
                  {openProductId === product.product?.id && (
                    <SpringModel
                      isOpen={true}
                      setIsOpen={() => setOpenProductId(null)} // Close the modal
                      productId={product.product?.id}
                    />
                  )}
                  <div className="w-1/3 rounded-lg ">
                    <img
                      src={product.product?.imageCover}
                      className="w-60 h-60 max-w-full max-h-full rounded-lg"
                      alt={product.product?.title}
                    />
                  </div>
                  <div className="w-2/3">
                    <h2 className="text-2xl font-semibold">
                      {product.product?.title}
                    </h2>
                    <div className="flex items-center my-2">
                      <FaStar className="text-yellow-300 mx-2 " />
                      <span className="font-semibold">
                        {product.product?.ratingsAverage}
                      </span>
                    </div>

                    <ul className="list-disc">
                      <li className="mt-2 font-semibold">
                        <span className="font-normal">Category:</span>{" "}
                        {product.product?.category?.name}
                      </li>
                      <li className="mt-2 font-semibold">
                        <span className="font-normal">SubCategory:</span>{" "}
                        {product.product?.subcategory[0].name}
                      </li>
                      <li className="mt-2 font-semibold">
                        <span className="font-normal">Brand:</span>{" "}
                        {product.product?.brand.name}
                      </li>
                      <li className="mt-2 font-semibold">
                        <span className="font-normal">Price per piece :</span>{" "}
                        {product.price} LE
                      </li>
                    </ul>
                    <div className="flex items-center mt-4 gap-2">
                      <span className="font-semibold">Quantity:</span>
                      <div className="flex items-center ">
                        <button
                          className="disabled:cursor-not-allowed inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                          onClick={() =>
                            updateProduct(
                              product.product?.id,
                              product.count - 1
                            )
                          }
                          disabled={product.count === 1}
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <p>{product.count}</p>
                        </div>
                        <button
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                          onClick={() => {
                            updateProduct(
                              product.product?.id,
                              product.count + 1
                            );
                          }}
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <p className="font-semibold text-lg">
                        {product.price * product.count} LE
                      </p>

                      <div className="flex items-center gap-3">
                        <button
                          className="CartBtn"
                          type="button"
                          onClick={() => setOpenProductId(product.product?.id)}
                        >
                          <span className="IconContainer">
                            <FaEye className="text-white text-lg me-2" />
                          </span>
                          <p className="text">Details</p>
                        </button>

                        <button
                          className={styles.noSelect}
                          onClick={() => deleteProduct(product.product?.id)}
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
              ))}
            </div>

            <div className="sticky w-1/3 p-5 pt-2 ">
              <div className="  inner p-2  rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center my-4 text-gray-600 ">
                  Order
                </h2>

                <div className="flex justify-between my-5">
                  <p className="font-semibold text-lg">Items</p>
                  <p>{numOfCartItems}</p>
                </div>

                <div className="flex justify-between my-5">
                  <p className="font-semibold text-lg">Products Price</p>
                  <p>
                    {cartData.totalCartPrice ? cartData.totalCartPrice : "0"} LE
                  </p>
                </div>

                <div className="flex justify-between my-5">
                  <p className="font-semibold text-lg">Tax</p>
                  <p>0 LE</p>
                </div>

                <div className="flex justify-between my-5">
                  <p className="font-semibold text-lg">Shipping Fee</p>
                  <p>50 LE</p>
                </div>

                <hr />

                <div className="flex justify-between my-5">
                  <p className="font-semibold text-lg">Total</p>
                  <p className="text-green-500 font-semibold">
                    {cartData.totalCartPrice
                      ? cartData.totalCartPrice + 50
                      : "0"}{" "}
                    LE
                  </p>
                </div>

                <div className="flex justify-center">
                  <button
                    className={styles.CartBtn}
                    type="button"
                    onClick={() => navigate("/checkout")}
                  >
                    <span className="IconContainer">
                      <IoBagCheckOutline className="text-white text-lg me-2" />
                    </span>
                    <p className="text">CheckOut</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="h-screen flex flex-col justify-center items-center gap-5">
          <Loader />

          <div className="flex justify-center w-1/4">
            <button
              className={styles.CartBtn}
              type="button"
              onClick={() => navigate("/checkout")}
            >
              <span className="IconContainer">
                <FaBackward className="text-white text-lg me-2" />
              </span>
              <p className="text">go back to home Page</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
