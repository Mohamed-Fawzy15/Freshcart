import { configureStore } from "@reduxjs/toolkit";
import { tokenReducer } from "./Token/TokenSlice";
import { OrderReducer } from "./Orders/OrderSlice";
import { AddressReducer } from "./Address/AddressSlice";
import { authReducer } from "./Auth/AuthSlice";

export const Store = configureStore({
  reducer: {
    token: tokenReducer,
    orders: OrderReducer,
    address: AddressReducer,
    auth: authReducer,
  },
});
