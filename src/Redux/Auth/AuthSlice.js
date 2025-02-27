import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  user: {},
  token: "",
  userName: JSON.parse(localStorage.getItem("user"))?.name || "",
  userEmail: JSON.parse(localStorage.getItem("user"))?.email || "",
};

export const addUser = createAsyncThunk("auth/addUser", async (values) => {
  try {
    const res = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      values
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const loginUser = createAsyncThunk("auth/loginUser", async (values) => {
  try {
    const res = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signin",
      values
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (values) => {
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const resetCode = createAsyncThunk("auth/resetCode", async (values) => {
  try {
    const res = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      values
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const newPassword = createAsyncThunk(
  "auth/newPassword",
  async (values) => {
    try {
      const res = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "auth/updateUserInfo",
  async (values) => {
    try {
      const res = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
        values,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // signup
    builder.addCase(addUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });

    // login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    });

    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
    });

    // forget password
    builder.addCase(forgetPassword.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(forgetPassword.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(forgetPassword.fulfilled, (state) => {
      state.isLoading = false;
    });

    //reset code
    builder.addCase(resetCode.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(resetCode.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(resetCode.fulfilled, (state) => {
      state.isLoading = false;
    });

    // new password
    builder.addCase(newPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(newPassword.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(newPassword.fulfilled, (state) => {
      state.isLoading = false;
    });

    // update user info
    builder.addCase(updateUserInfo.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(updateUserInfo.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    });
  },
});

export const authReducer = AuthSlice.reducer;
