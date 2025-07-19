import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { agregarAlCarrito } from "@/redux/carritoSlice";
import { FiShoppingCart } from "react-icons/fi";

const DetallesProducto = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/catalogo/${_id}`);
        setProducto(res.data);
      } catch (err) {
        console.error("Error al cargar producto:", err);
      } finally {
        setCargando(false);
      }
    };
    fetchProducto();
  }, [_id]);

  if (cargando) {
    return <div className="text-center py-10">Cargando producto...</div>;
  }

  if (!producto) {
    return (
      <div className="text-center py-10 text-red-600 font-semibold">
        Producto no encontrado 😕
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Imagen del producto */}
        <div>
          <img src={producto.image_url} alt={producto.nombreProducto} />
        </div>

        {/* Detalles del producto */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              {producto.nombreProducto}
            </h2>
            <p className="text-xl text-gray-600 mb-2">
              {producto.nombreCategoria} | {producto.nombreMaterial}
            </p>
            <p className="text-base text-gray-700 mb-4">
              {producto.descripcion}
            </p>
            {producto.tallasDisponibles && (
              <p className="text-sm text-gray-500 mb-1">
                Tallas disponibles: <strong>{producto.tallasDisponibles}</strong>
              </p>
            )}

            {producto.precioEspecial ? (
              <div className="text-2xl font-semibold">
                <span className="text-gray-400 line-through mr-3">${producto.precio} USD</span>
                <span className="text-rose-600">${producto.precioEspecial} USD</span>
              </div>
            ) : (
              <p className="text-2xl font-semibold text-rose-600">
                ${producto.precio} USD
              </p>
            )}
          </div>

          <button
            onClick={() =>
              dispatch(
                agregarAlCarrito({
                  _id: producto.idProducto,
                  name: producto.nombreProducto,
                  quantity: 1,
                  image: producto.image_url,
                  price: producto.precioEspecial || producto.precio,
                })
              )
            }
            className="mt-6 flex items-center justify-center gap-2 bg-rose-600 text-white py-3 px-6 rounded-lg hover:bg-rose-700 transition duration-300"
          >
            <FiShoppingCart className="text-xl" />
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetallesProducto;