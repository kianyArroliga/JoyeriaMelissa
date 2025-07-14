import React, { useState } from "react";
import { useSelector } from "react-redux";
import Breadcrumbs from "@/components/ui/pageProps/Breadcrumbs";

const Pago = () => {
  const productos = useSelector((state) => state.carrito?.productos ?? []);
  const [comprobante, setComprobante] = useState(null);

  const total = productos.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const envio = total <= 200 ? 30 : total <= 400 ? 25 : 20;
  const totalFinal = total + envio;

  const handleArchivo = (e) => {
    setComprobante(e.target.files[0]);
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Pago" prevLocation="Carrito" />

      <div className="pb-10">
        <h2 className="text-2xl font-semibold mb-4">Resumen de Pago</h2>
        <div className="bg-white shadow-md rounded p-4 mb-6">
          <p className="text-lg">
            Subtotal: <strong>${total.toFixed(2)}</strong>
          </p>
          <p className="text-lg">
            Costo de Envío: <strong>${envio.toFixed(2)}</strong>
          </p>
          <p className="text-xl mt-2">
            Total Final: <strong>${totalFinal.toFixed(2)}</strong>
          </p>
        </div>

        <h3 className="text-xl font-semibold mb-2">Métodos de Pago</h3>
        <p className="mb-4">
          Puedes realizar el pago por <strong>SINPE Móvil</strong> o{" "}
          <strong>Transferencia Bancaria</strong>.
        </p>

        <ul className="list-disc list-inside mb-6">
          <li>
            <strong>SINPE Móvil:</strong> +506 8431 2346, a nombre de{" "}
            <strong>Melissa Aguilar</strong>.
          </li>
          <li>
            <strong>Transferencia Bancaria:</strong> Cuenta IBAN{" "}
            <strong>CR12345678901234567890</strong>, a nombre de{" "}
            <strong>Melissa Aguilar</strong>.
          </li>
        </ul>

        <label className="block mb-2 font-medium" htmlFor="comprobante">
          Adjunta tu comprobante de pago (imagen o PDF):
        </label>
        <input
          type="file"
          id="comprobante"
          accept=".png,.jpg,.jpeg,.pdf"
          onChange={handleArchivo}
          className="mb-4"
        />

        {comprobante && (
          <p className="text-sm text-green-600">
            Archivo seleccionado: {comprobante.name}
          </p>
        )}

        <button className="mt-6 bg-primeColor text-white px-6 py-2 rounded hover:bg-black transition-colors duration-300">
          Confirmar Pedido
        </button>
      </div>
    </div>
  );
};

export default Pago;
