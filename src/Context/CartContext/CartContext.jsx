import axios from "axios";
import { useState } from "react";
import { createContext } from "react";

export const CartContext = createContext(null);

const headers = {
  token: localStorage.getItem("token"),
};
const addToCart = (id) => {
  return axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId: id,
      },
      {
        headers,
      }
    )
    .then((res) => res.data)
    .catch((err) => err);
};

const getLoggedCart = () => {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
    .then((res) => res.data)
    .catch((err) => err);
};

const removeCartItem = (productId) => {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      headers,
    })
    .then((res) => res.data)
    .catch((err) => err);
};

const updateCartItem = (productId, count) => {
  return axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        count,
      },
      {
        headers,
      }
    )
    .then((res) => res.data)
    .catch((err) => err);
};

const clearCartItem = () => {
  return axios
    .delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers,
    })
    .then((res) => res.data)
    .catch((err) => err);
};

export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartId, setCartId] = useState(null);
  return (
    <CartContext.Provider
      value={{
        addToCart,
        getLoggedCart,
        removeCartItem,
        updateCartItem,
        clearCartItem,
        numOfCartItems,
        setNumOfCartItems,
        cartId,
        setCartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
