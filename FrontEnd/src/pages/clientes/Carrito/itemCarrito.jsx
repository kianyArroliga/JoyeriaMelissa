import React from "react";
import { useDispatch } from "react-redux";
import {
  eliminarProducto,
  aumentarCantidad,
  disminuirCantidad,
} from "@/redux/carritoSlice";
import { FiTrash2 } from "react-icons/fi";

const ItemCarrito = ({ producto }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between border p-4 rounded-md">
      <div className="flex items-center gap-4">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-24 h-24 object-cover rounded"
        />
        <div>
          <h3 className="font-semibold text-lg">{producto.nombre}</h3>
          <p className="text-gray-600">${producto.precio.toFixed(2)} USD</p>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => dispatch(disminuirCantidad(producto.id))}
              className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
            >
              -
            </button>
            <span>{producto.cantidad}</span>
            <button
              onClick={() => dispatch(aumentarCantidad(producto.id))}
              className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => dispatch(eliminarProducto(producto.id))}
        className="text-red-600 hover:text-red-800"
        title="Eliminar del carrito"
      >
        <FiTrash2 className="text-xl" />
      </button>
    </div>
  );
};

export default ItemCarrito;
