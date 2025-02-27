import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  isLoading: false,
};

export const getCategories = createAsyncThunk(
  "categories/getcategories",
  async () => {
    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const CategoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getCategories.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
  },
});

export const categoriesReducer = CategoriesSlice.reducer;
