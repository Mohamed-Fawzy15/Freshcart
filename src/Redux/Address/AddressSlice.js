import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  allAddress: [],
};

const headers = {
  token: localStorage.getItem("token"),
};

export const getAddress = createAsyncThunk("address/getAddress", async () => {
  try {
    const res = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/addresses",
      {
        headers,
      }
    );
    return res.data;
  } catch (err) {
    return console.log(err);
  }
});

export const removeAddress = createAsyncThunk(
  "address/removeAddress",
  async (id) => {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
        headers,
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
);

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (values) => {
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/addresses",
        values,
        { headers }
      );
      return res.data;
    } catch (err) {
      return console.log(err);
    }
  }
);

export const AddressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get the address
    builder.addCase(getAddress.fulfilled, (state, action) => {
      state.allAddress = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getAddress.pending, (state) => {
      state.isLoading = true;
    });

    //   remove address
    builder.addCase(removeAddress.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(removeAddress.fulfilled, (state, action) => {
      state.allAddress = action.payload;
      state.isLoading = false;
    });

    // add address
    builder.addCase(addAddress.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(addAddress.fulfilled, (state, action) => {
      if (!Array.isArray(state.allAddress)) {
        state.allAddress = [];
      }
      state.allAddress = [...state.allAddress, action.payload]; // Use spread operator to avoid mutation
      state.isLoading = false;
    });
  },
});

export const AddressReducer = AddressSlice.reducer;
