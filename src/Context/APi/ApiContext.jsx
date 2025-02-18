import axios from "axios";
import { createContext, useState } from "react";

export const ApiContext = createContext(null);

const headers = {
  token: localStorage.getItem("token"),
};

// all get method
const getProducts = () => {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/products")
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getCategories = () => {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/categories")
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getBrands = () => {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/brands")
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// wishlist api
const addToWishlist = (id) => {
  return axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
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

const removeWishList = (id) => {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
      headers,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getWishList = () => {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// update user data
const updateUserInfo = (data) => {
  return axios
    .put(
      "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
      { data },
      {
        headers,
      }
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export default function ApiContextProvider({ children }) {
  const [wishlistItem, setWishlistItem] = useState(0);
  const [userEmail, setUserEmail] = useState("");

  return (
    <ApiContext.Provider
      value={{
        getProducts,
        getCategories,
        getBrands,
        addToWishlist,
        removeWishList,
        getWishList,
        wishlistItem,
        setWishlistItem,
        userEmail,
        setUserEmail,
        updateUserInfo,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}
