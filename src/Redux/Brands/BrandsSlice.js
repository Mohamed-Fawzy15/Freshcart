import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  brands: [],
  isLoading: false,
};

export const getBrands = createAsyncThunk("brands/getBrands", async () => {
  try {
    const res = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
});
export const BrandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBrands.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getBrands.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getBrands.fulfilled, (state, action) => {
      state.isLoading = false;
      state.brands = action.payload;
    });
  },
});

export const BrandsReducer = BrandsSlice.reducer;
