import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;

      // 🔒 PRIVATE LOGIN
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      sessionStorage.clear();
    },
  },
});

export const { setLoading, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
