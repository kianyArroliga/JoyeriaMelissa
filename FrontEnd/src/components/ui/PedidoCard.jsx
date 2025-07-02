import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function PedidoCard({ cliente, producto, tipo }) {
  const badgeColor = tipo === "Especial"
    ? "bg-[#f2d7db] text-[#8C162A]"
    : "bg-[#d8e8e6] text-[#3a5b57]"

  return (
    <Card className="w-full sm:w-64 md:w-72 bg-[#FFFFFF] p-4 flex flex-col justify-between hover:shadow-lg hover:bg-[#f9f9f9] transition-all duration-300">

      <span className={`${badgeColor} text-xs px-2 py-0.5 rounded-full mb-2 inline-block max-w-fit`}>
        {tipo}
      </span>

      <CardContent className="p-0 text-center">
        <p className="font-semibold">Cliente: {cliente}</p>
        <p>Producto: {producto}</p>
      </CardContent>

      <div className="mt-3 flex gap-2 justify-center">
        <Button className="bg-[#ECECEC] hover:bg-[#6ebc86] text-black font-semibold text-sm px-3 py-1">
          Aceptar
        </Button>
        <Button className="bg-[#ECECEC] hover:bg-[#bc263f] text-black font-semibold text-sm px-3 py-1">
          Rechazar
        </Button>
      </div>

    </Card>
  )
}