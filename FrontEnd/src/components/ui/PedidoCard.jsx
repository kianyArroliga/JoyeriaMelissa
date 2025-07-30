import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function PedidoCard({ cliente, producto, estado, onAceptar, onEnviar }) {
  return (

    <Card className="w-64 bg-gradient-to-b from-white via-gray-100 to-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 p-7">
      {/* Badge enviado, aceptado o regular */}
      {estado === "enviado" ? (
        <span className="relative -top-2 bg-purple-100 text-purple-700 text-sm px-2 py-0.5 rounded-full mb-2 -ml-3 inline-block max-w-fit">
          Enviado
        </span>
      ) : estado === "aceptado" ? (
        <span className="relative -top-2 bg-blue-100 text-blue-700 text-sm px-2 py-0.5 rounded-full mb-2 -ml-3 inline-block max-w-fit">
          Aceptado
        </span>
      ) : (
        <span className="relative -top-2 bg-[#d8e8e6] text-[#3a5b57] text-sm px-2 py-0.5 rounded-full mb-2 -ml-3 inline-block max-w-fit">
          Regular
        </span>
      )}

      <CardContent className="p-0 text-center">
        <p className="font-semibold">Cliente: {cliente}</p>
        <p>Producto: {producto}</p>
      </CardContent>

      <div className="mt-4 flex gap-2 justify-center">
        {estado === "aceptado" ? (
          <div className="mt-4 flex justify-center">
            <Button
              className="bg-[#ECECEC] hover:bg-[#83cbb1] text-black px-4 py-1 rounded-full shadow-md transition duration-300 hover:scale-105 text-sm"
              onClick={() => onEnviar({ cliente, producto })}
            >
              Enviar
            </Button>
          </div>
        ) : estado === "enviado" ? (
          <div className="mt-4 flex justify-center">
            <span className="text-gray-700 font-semibold text-sm">Pedido enviado ✔</span>
          </div>
        ) : (
          <div className="mt-4 flex gap-2 justify-center">
            <Button
              className="bg-[#ECECEC] hover:bg-[#b3edc3] text-black px-3 py-1 rounded-full shadow-md transition duration-300 hover:scale-105 text-xs"
              onClick={() => onAceptar({ cliente, producto })}
            >
              Aceptar
            </Button>
            <Button className="bg-[#ECECEC] hover:bg-[#f9bebe] text-black px-3 py-1 rounded-full shadow-md transition duration-300 hover:scale-105 text-xs">
              Rechazar
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
