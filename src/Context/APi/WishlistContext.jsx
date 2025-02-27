import axios from "axios";
import { createContext, useState } from "react";

const headers = {
  token: localStorage.getItem("token"),
};

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

export const WishlistContext = createContext(null);

export default function WishlistContextProvider({ children }) {
  const [wishlistItem, setWishlistItem] = useState(0);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItem,
        setWishlistItem,
        addToWishlist,
        removeWishList,
        getWishList,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
