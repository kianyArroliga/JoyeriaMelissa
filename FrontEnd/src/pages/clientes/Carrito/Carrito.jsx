import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/ui/pageProps/Breadcrumbs";
import { emptyCart } from "@/assets/images";
import ItemCard from "@/pages/clientes/Carrito/itemCarrito";
import axios from "axios";

const Carrito = () => {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [envio, setEnvio] = useState(0);

  useEffect(() => {
    const cargarCarrito = async () => {
      try {
        const res = await axios.get("http://localhost:4000/detalle_pedido");
        setProductos(res.data);
      } catch (err) {
        console.error("Error cargando carrito:", err);
      }
    };

    cargarCarrito();
  }, []);

  useEffect(() => {
    let precio = 0;
    productos.forEach((item) => {
      precio += item.precioUnitario * item.cantidad;
    });
    setTotal(precio);
  }, [productos]);

  useEffect(() => {
    if (total <= 200) {
      setEnvio(30);
    } else if (total <= 400) {
      setEnvio(25);
    } else if (total > 401) {
      setEnvio(20);
    }
  }, [total]);

  const vaciarCarritoLocal = async () => {
    try {
      await axios.delete("http://localhost:4000/detalle_pedido/expirar");
      setProductos([]);
    } catch (err) {
      console.error("Error al vaciar carrito:", err);
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Carrito" />
      {productos.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Producto</h2>
            <h2>Precio</h2>
            <h2>Cantidad</h2>
            <h2>Total</h2>
          </div>

          <div className="mt-5">
            {productos.map((item) => (
              <div key={item.idDetallePedido}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>

          <button
            onClick={vaciarCarritoLocal}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Vaciar carrito
          </button>

          <div className="flex flex-col mdl:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
            <div className="flex items-center gap-4">
              <input
                className="w-44 mdl:w-52 h-8 px-4 border text-primeColor text-sm outline-none border-gray-400"
                type="text"
                placeholder="Código de giftcard"
              />
              <p className="text-sm mdl:text-base font-semibold">Aplicar giftcard</p>
            </div>
            <p className="text-lg font-semibold">Actualizar carrito</p>
          </div>

          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Totales del carrito</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal
                  <span className="font-semibold tracking-wide font-titleFont">${total}</span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Envío
                  <span className="font-semibold tracking-wide font-titleFont">${envio}</span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    ${total + envio}
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                <Link to="/pago">
                  <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                    Proceder al pago
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img className="w-80 rounded-lg p-4 mx-auto" src={emptyCart} alt="Carrito vacío" />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Tu carrito está vacío.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Dale propósito a tu carrito llenándolo con piezas únicas y hechas a mano de Melissa Aguilar Joyería.
            </p>
            <Link to="/clientes/catalogo">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Ir al Catálogo
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Carrito;
