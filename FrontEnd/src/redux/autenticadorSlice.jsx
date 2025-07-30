import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
  token: null,
  usuario: null,
};
 
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload.token;
      state.usuario = action.payload.usuario;
    },
    logout: (state) => {
      state.token = null;
      state.usuario = null;
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
    },
  },
});
 
export const { setLogin, logout } = authSlice.actions;
export default authSlice.reducer;