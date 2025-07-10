import { createSlice } from "@reduxjs/toolkit";

const estadoInicial = {
  usuarioInfo: [],
  productos: [],
};

export const carritoSlice = createSlice({
  name: "carrito",
  initialState: estadoInicial,
  reducers: {
    agregarAlCarrito: (state, action) => {
      const producto = state.productos.find(
        (item) => item._id === action.payload._id
      );
      if (producto) {
        producto.cantidad += action.payload.cantidad;
      } else {
        state.productos.push(action.payload);
      }
    },
    aumentarCantidad: (state, action) => {
      const producto = state.productos.find(
        (item) => item._id === action.payload._id
      );
      if (producto) {
        producto.cantidad++;
      }
    },
    disminuirCantidad: (state, action) => {
      const producto = state.productos.find(
        (item) => item._id === action.payload._id
      );
      if (producto.cantidad > 1) {
        producto.cantidad--;
      }
    },
    eliminarProducto: (state, action) => {
      state.productos = state.productos.filter(
        (item) => item._id !== action.payload
      );
    },
    vaciarCarrito: (state) => {
      state.productos = [];
    },
  },
});

export const {
  agregarAlCarrito,
  aumentarCantidad,
  disminuirCantidad,
  eliminarProducto,
  vaciarCarrito,
} = carritoSlice.actions;

export default carritoSlice.reducer;
