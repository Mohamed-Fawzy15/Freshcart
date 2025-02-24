import { configureStore } from "@reduxjs/toolkit";
import { tokenReducer } from "./Token/TokenSlice";
import { OrderReducer } from "./Orders/OrderSlice";

export const Store = configureStore({
  reducer: {
    token: tokenReducer,
    orders: OrderReducer,
  },
});
