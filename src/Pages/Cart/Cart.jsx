import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useState } from "react";
import { FaEye, FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import styles from "./Cart.module.css";
import { IoBagCheckOutline } from "react-icons/io5";
import SpringModel from "../../Component/SpringModel/SpringModel";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  getLoggedCart,
  removeCartItem,
  updateCartQuantity,
} from "../../Redux/Cart/CartSlice";
import toast from "react-hot-toast";

export default function Cart() {
  const [cartData, setCartData] = useState(null);
  const navigate = useNavigate();
  const [openProductId, setOpenProductId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();
  const numOfCartItems = useSelector((state) => state.cart.numOfCartItem);

  const getData = async () => {
    dispatch(getLoggedCart())
      .then((res) => {
        console.log(res);

        setCartData(res.payload.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteProduct = (id) => {
    dispatch(removeCartItem(id))
      .then((res) => {
        console.log(res.payload.data);
        setCartData(res.payload.data);
        console.log(res.payload);
        toast.success("Product deleted successfully", {
          style: {
            fontWeight: 600,
          },
        });
      })
      .catch((err) => console.log(err));
  };

  const updateProduct = async (id, count) => {
    dispatch(updateCartQuantity({ productId: id, count }))
      .then((res) => {
        console.log(res);
        setCartData(res.payload.data);
      })
      .catch((err) => console.log("Error updating item quantity:", err));
  };

  const deleteAllProducts = async () => {
    dispatch(clearCart())
      .then((res) => {
        if (res.payload.message === "success") setCartData(null);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mx-auto ">
      <Helmet>
        <title>Cart</title>
      </Helmet>

      <div className="py-5">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-5  ">
            <div className="header"></div>
            <h1 className="text-center text-2xl font-bold">Shopping Cart</h1>
          </div>
          {cartData && (
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
          )}
        </div>

        <div className="relative mx-auto max-w-5xl justify-center px-6 lg:flex  lg:space-x-6 xl:px-0">
          {/* Cart Items Section */}
          <div className="rounded-lg w-full lg:w-2/3">
            {cartData ? (
              cartData.products?.map((product) => (
                <div
                  key={product._id}
                  className="justify-between gap-3 mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                >
                  {openProductId === product.product?.id && (
                    <SpringModel
                      isOpen={true}
                      setIsOpen={() => setOpenProductId(null)} // Close the modal
                      productId={product.product?.id}
                    />
                  )}
                  <img
                    src={product.product?.imageCover}
                    alt={product.product?.title}
                    className="w-full rounded-lg sm:w-40"
                  />

                  <div>
                    <div className="sm:ml-4 flex sm:w-full justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {product.product?.title}
                        </h2>
                        <p className="mt-1 text-xs text-gray-700">
                          <div className="flex items-center my-2">
                            <FaStar className="text-yellow-300 mx-2 " />
                            <span className="font-semibold">
                              {product.product?.ratingsAverage}
                            </span>
                          </div>
                        </p>
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
                            <span className="font-normal">Price :</span>{" "}
                            {product.price * product.count} LE
                          </li>
                        </ul>
                      </div>

                      <div className="flex  ">
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

                    <div className="flex items-center gap-3 mt-3">
                      <button
                        className="CartBtn w-1/2"
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
              ))
            ) : (
              <div className="flex justify-center items-center h-64">
                <p className="text-2xl font-semibold">No data found</p>
              </div>
            )}
          </div>

          {/* Subtotal Section */}
          <div className="sticky w-full  h-full rounded-lg border bg-white p-6 shadow-md  lg:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Items</p>
              <p className="text-gray-700">{numOfCartItems}</p>
            </div>

            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">
                {cartData?.totalCartPrice ? cartData.totalCartPrice : "0"} LE
              </p>
            </div>

            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Tax</p>
              <p className="text-gray-700">0 LE</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">50 LE</p>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className>
                <p className="mb-1 text-lg font-bold text-center">
                  {cartData?.totalCartPrice
                    ? cartData.totalCartPrice + 50
                    : "0"}{" "}
                  LE
                </p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-6">
              <select
                name="payment"
                id="payment"
                className="rounded-lg border-green-500 outline-green-600 "
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="cash">Cash</option>
                <option value="online">Online</option>
              </select>

              <button
                className={`${styles.CartBtn} `}
                type="button"
                onClick={() => navigate("/checkout", { state: paymentMethod })}
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
    </div>
  );
}
