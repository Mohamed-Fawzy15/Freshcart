import { createSlice } from "@reduxjs/toolkit";

const headers = {
  token: localStorage.getItem("token"),
};

//   export const addToWishlist = create

const initialState = {
  wishlist: [],
  isLoading: false,
};

export const WishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
