import axios from "axios";
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

export default function CartContextProvider({ children }) {
  return (
    <CartContext.Provider value={{ addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
