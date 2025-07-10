import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";

const DetallesProducto = () => {
  const { id } = useParams();

  const producto = useSelector((state) =>
    state.carrito?.productos.find((item) => item.id === id)
  );

  if (!producto) {
    return (
      <div className="max-w-screen-xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-700">
          Producto no encontrado 😕
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{producto.nombre}</h2>
            <p className="text-xl text-gray-600 mb-4">
              {producto.categoria} | Hecho en Costa Rica
            </p>
            <p className="text-base text-gray-700 mb-6">
              {producto.descripcion}
            </p>
            <p className="text-2xl font-semibold text-rose-600">
              ${producto.precio} USD
            </p>
          </div>

          <button className="mt-6 flex items-center justify-center gap-2 bg-rose-600 text-white py-3 px-6 rounded-lg hover:bg-rose-700 transition duration-300">
            <FiShoppingCart className="text-xl" /> Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetallesProducto;
