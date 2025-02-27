import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  isLoading: false,
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getSpecificProduct = createAsyncThunk(
  "products/getSpecificProduct",
  async (id) => {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all products
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    });

    // get specific product
    builder.addCase(getSpecificProduct.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getSpecificProduct.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getSpecificProduct.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    });
  },
});

export const ProductReducer = ProductSlice.reducer;
