import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Torus, RulerDimensionLine, Hammer, Smartphone, MessageSquare } from "lucide-react";
//import placeholderImg from "@/assets/placeholder.jpg";

export function PedidoEspecialCard({ pedido, cliente, pieza, index, tarjetaActiva, setTarjetaActiva, onAceptar, estado, onEnviar }) {
  const mostrarDetalles = tarjetaActiva === index;
  // const imagenMostrada = pedido.referenciaURL
  //  ? pedido.referenciaURL   // URL directa de Cloudinary en la bd
  // : placeholderImg;

  return (
    <div className="relative flex items-start transition-all duration-500">
      <div className="relative flex" style={{ width: "16rem" }}>
        {/* Tarjeta principal */}
        <Card className="w-64 bg-gradient-to-b from-white via-gray-100 to-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 p-4">

          {/* Badge enviado. aceptado y especial */}
          {estado === "enviado" ? (
            <span className="bg-purple-100 text-purple-700 text-sm px-2 py-0.5 rounded-full mb-2 inline-block max-w-fit">
              Enviado
            </span>
          ) : estado === "aceptado" ? (
            <span className="bg-blue-100 text-blue-700 text-sm px-2 py-0.5 rounded-full mb-2 inline-block max-w-fit">
              Aceptado
            </span>
          ) : (
            <span className="bg-[#f2d7db] text-[#8C162A] text-sm px-2 py-0.5 rounded-full mb-2 inline-block max-w-fit">
              Especial
            </span>
          )}

          <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden mb-3">
            <img
            // src={imagenMostrada}
            // alt="Referencia del cliente"
            // className="w-full h-52 object-cover rounded-t-xl"
            />
          </div>

          <CardContent className="p-0">
            <p className="font-semibold text-center">Cliente: {cliente}</p>
            <p className="text-center">Pieza: {pieza}</p>
          </CardContent>


          <div className="mt-2 w-full flex justify-end">
            <span
              onClick={() => setTarjetaActiva(mostrarDetalles ? null : index)}
              className={`cursor-pointer text-sm font-medium transition-colors duration-300 ${mostrarDetalles
                ? "text-[#0000FF]"
                : "text-gray-500 hover:text-[#0000FF]"
                }`}
            >
              {mostrarDetalles ? "Ocultar detalles" : "Ver detalles"}
            </span>
          </div>
        </Card>

        {/* Panel de detalles  */}
        <div
          className={`absolute left-full top-0 bg-gray-50 border border-gray-200 rounded-xl p-9 w-60 translate-y-1 transition-all duration-500 ease-in-out ${mostrarDetalles
            ? "opacity-100 translate-x-2"
            : "opacity-0 -translate-x-4 pointer-events-none"
            } flex flex-col h-full`}
        >
          <div className="flex flex-col space-y-2">
            {/*  Piedra */}
            <div className="flex items-center gap-3">
              <Torus className="w-5 h-5 text-[#B3826C]" />
              <p className="text-sm font-medium text-gray-700" >
                <span className="font-semibold">Piedra:</span> Natural
              </p>
            </div>

            {/*  Talla */}
            <div className="flex items-center gap-3">
              <RulerDimensionLine className="w-5 h-5 text-[#B3826C]" />
              <p className="text-sm font-medium text-gray-700">
                <span className="font-semibold">Talla:</span> 5
              </p>
            </div>

            {/*  Material */}
            <div className="flex items-center gap-3">
              <Hammer className="w-5 h-5 text-[#B3826C]" />
              <p className="text-sm font-medium text-gray-700">
                <span className="font-semibold">Material:</span> Plata
              </p>
            </div>

            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-[#B3826C] flex-shrink-0 mt-1" />
              <p className="text-sm font-medium text-gray-700 leading-snug">
                <span className="font-semibold">Descripción:</span> Me gustaría que el anillo sea muy elegante y tenga varias piedras
              </p>
            </div>


            {/*  Contacto */}
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-[#B3826C]" />
              <p className="text-sm font-medium text-gray-700">
                <span className="font-semibold">Contacto:</span> 1234555
              </p>
            </div>
          </div>

          {/* Botones dependiendo del estado */}
          {estado === "aceptado" ? (
            <div className="flex justify-center mt-7">
              <Button className="bg-[#ECECEC] hover:bg-[#83cbb1] text-black px-4 py-1 rounded-full shadow-md transition duration-300 hover:scale-105 text-sm"
                onClick={() => onEnviar({ cliente, pieza })}>
                Enviar
              </Button>
            </div>
          ) : estado === "enviado" ? (
            <div className="flex justify-center mt-7">
              <span className="text-gray-700 font-semibold"> Pedido enviado ✔</span>
            </div>
          ) :
            (
              <div className="flex gap-2 justify-center mt-7">
                <Button
                  className="bg-[#ECECEC] hover:bg-[#b3edc3] text-black px-3 py-1 rounded-full shadow-md transition duration-300 hover:scale-105 text-xs"
                  onClick={() => onAceptar({ cliente, pieza })}
                >
                  Aceptar
                </Button>
                <Button className="bg-[#ECECEC] hover:bg-[#f9bebe] text-black px-3 py-1 rounded-full shadow-md transition duration-300 hover:scale-105 text-xs">
                  Rechazar
                </Button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}