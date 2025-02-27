import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const headers = {
  token: localStorage.getItem("token"),
};

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (id) => {
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: id,
        },
        { headers }
      );
      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wihslist/removeFromWishlist",
  async (id) => {
    try {
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        { headers }
      );

      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async () => {
    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers }
      );
      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState = {
  wishlist: [],
  isLoading: false,
  numOfWishes: 0,
};

export const WishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // add items to wishlist
    builder.addCase(addToWishlist.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(addToWishlist.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addToWishlist.fulfilled, (state, action) => {
      state.wishlist = action.payload;
      state.isLoading = false;
      state.numOfWishes = state.wishlist.length;
    });

    // remove item from wishlist
    builder.addCase(removeFromWishlist.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeFromWishlist.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(removeFromWishlist.fulfilled, (state, action) => {
      state.wishlist = action.payload;
      state.isLoading = false;
      state.numOfWishes = state.wishlist.length;
    });

    // get wishlist
    builder.addCase(getWishlist.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getWishlist.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getWishlist.fulfilled, (state, action) => {
      state.wishlist = action.payload;
      state.numOfWishes = state.wishlist.length;
      state.isLoading = false;
    });
  },
});

export const WishlistReducer = WishlistSlice.reducer;
