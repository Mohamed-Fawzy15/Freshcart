import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { tokenContext } from "../Token/TokenContext";
import { jwtDecode } from "jwt-decode";

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
    .put("https://ecommerce.routemisr.com/api/v1/users/updateMe/", data, {
      headers,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// user address
const addAddress = (values) => {
  return axios
    .post("https://ecommerce.routemisr.com/api/v1/addresses", values, {
      headers,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getUserAddress = () => {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/addresses", {
      headers,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export default function ApiContextProvider({ children }) {
  const [wishlistItem, setWishlistItem] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const { token } = useContext(tokenContext);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [token]);

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
        userName,
        setUserName,
        addAddress,
        getUserAddress,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}
