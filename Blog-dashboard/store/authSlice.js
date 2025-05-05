import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    
  },
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      
      localStorage.setItem("token", action.payload.token); // Save token to local storage
      localStorage.setItem("user", JSON.stringify(action.payload.user)); // Save user to local storage
      
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token"); // Remove token from local storage
      localStorage.removeItem("user"); // Remove user from local storage
      
    },
    
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice;