import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  cart: [],
  numOfCartItem: 0,
  cartId: null,
};

const headers = {
  token: localStorage.getItem("token"),
};

export const addToCart = createAsyncThunk("cart/addToCart", async (id) => {
  try {
    const res = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId: id,
      },
      {
        headers,
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const getLoggedCart = createAsyncThunk(
  "cart/getLoggedCart",
  async () => {
    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (productId) => {
    try {
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ productId, count }) => {
    try {
      const res = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers,
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
  try {
    const res = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { headers }
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const cashOrder = createAsyncThunk(
  "cart/cashOrder",
  async ({ values, cartId }) => {
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        values,
        { headers }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const onlineOrder = createAsyncThunk(
  "cart/onlineOrder",
  async ({ values, cartId }) => {
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        values,
        {
          headers,
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // add item to cart
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToCart.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
      state.numOfCartItem = action.payload.numOfCartItems;
    });

    // get logged Cart Item
    builder.addCase(getLoggedCart.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getLoggedCart.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getLoggedCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
      state.numOfCartItem = action.payload.numOfCartItems;
      state.cartId = action.payload.cartId;
    });

    // remove cart item
    builder.addCase(removeCartItem.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(removeCartItem.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(removeCartItem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
      state.numOfCartItem = action.payload.numOfCartItems;
    });

    // update cart item
    builder.addCase(updateCartQuantity.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(updateCartQuantity.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(updateCartQuantity.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
      state.numOfCartItem = action.payload.numOfCartItems;
    });

    // clear cart
    builder.addCase(clearCart.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(clearCart.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(clearCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
      state.numOfCartItem = 0;
    });

    // cash order
    builder.addCase(cashOrder.fulfilled, (state) => {
      state.isLoading = false;
      state.cart = [];
      state.numOfCartItem = 0;
      state.cartId = null;
    });

    // Online order
    builder.addCase(onlineOrder.fulfilled, (state) => {
      state.isLoading = false;
      state.cart = [];
      state.numOfCartItem = 0;
      state.cartId = null;
    });
  },
});

export const CartReducer = CartSlice.reducer;
