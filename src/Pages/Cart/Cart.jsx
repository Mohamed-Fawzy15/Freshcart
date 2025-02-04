import { Helmet } from "react-helmet";
// import styles from "./Cart.module.css";
import { useContext } from "react";
import { useEffect } from "react";
import { CartContext } from "../../Context/CartContext/CartContext";
import { useState } from "react";
// import Loader from "../../Component/Loader/Loader";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    getLoggedCart,
    removeCartItem,
    updateCartItem,
    clearCartItem,
    setNumOfCartItems,
    setCartId,
  } = useContext(CartContext);
  const [cartData, setCartData] = useState(null);
  const navigate = useNavigate();

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
    console.log(data);
    console.log(cartData);

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
          <div className="flex justify-between my-4 ">
            <h4 className="text-2xl font-semibold">Shopping Cart</h4>
            <h6>
              <span className="font-semibold">Total Price: </span>
              {cartData.totalCartPrice ? cartData.totalCartPrice : "0"} EGP
            </h6>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartData.products?.map((product) => (
                  <tr
                    key={product._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={product.product?.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.product?.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product?.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
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
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price} EGP
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={() => deleteProduct(product.product?.id)}
                      >
                        <FaTrashCan className="text-2xl" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between">
            <button
              className="btn-main w-1/5"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </button>

            <button
              className="btn-main w-1/5"
              disabled={cartData === null}
              onClick={() => deleteAllProducts()}
            >
              clear item
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center flex-col my-5 w-1/2 mx-auto">
          <h3>Add product to the cart</h3>
          <button className="btn-main" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}
