import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const initialState = {
  allOrders: [],
  isLoading: false,
};

const token = localStorage.getItem("token");
const userData = token ? jwtDecode(token) : null;

export const getOrders = createAsyncThunk("order/getData", async () => {
  if (!userData || !userData.id) {
    console.error("User is not authenticated or token is invalid.");
    return [];
  }
  return await axios
    .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userData.id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.allOrders = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getOrders.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const OrderReducer = OrderSlice.reducer;
