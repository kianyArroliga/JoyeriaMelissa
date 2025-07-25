import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast"
import { ToastAction, ToastClose } from "@/components/ui/toast"
import axios from 'axios'

export function ProductoCard({ producto, onProductoActualizado, onEditar }) {

  const eliminarProducto = (idProducto) => {
    toast({
      title: "¿Estás segura?",
      description: "No se puede deshacer.",
      variant: "confirmar-eliminar",
      duration: 4000,
      className:
        "rounded-xl border border-yellow-300 shadow-md bg-yellow-50 text-yellow-900 animate-slide-out-right transition-all duration-300",
      action: (
        <div className="mt-3 flex gap-2 justify-center w-full">
          <ToastAction
            altText="Eliminar"
            className="bg-red-200 text-red-800 hover:bg-red-300 focus:ring-2 focus:ring-red-400 rounded-md px-3 py-1 text-sm transition-colors"
            onClick={async () => {
              try {
                await axios.delete(`http://localhost:4000/api/productos/borrar/${idProducto}`);
                toast({
                  title: "Eliminado",
                  description: "El producto fue eliminado correctamente.",
                  variant: "success",
                  duration: 1000,
                  className:
                    "rounded-xl border border-green-300 shadow-md bg-white text-green-700 animate-slide-out-right transition-all duration-300",
                });
                onProductoActualizado(idProducto);
              } catch (error) {
                console.error("Error al eliminar producto:", error);
                toast({
                  title: "Error al eliminar",
                  description: "Hubo un problema al eliminar el producto.",
                  variant: "destructive",
                  className:
                    "rounded-xl border border-red-300 shadow-md bg-white text-red-700 animate-slide-out-right transition-all duration-300",
                });
              }
            }}
          >
            Eliminar
          </ToastAction>

          <ToastClose
            className="text-yellow-900 hover:text-red-600 focus:text-red-600 active:text-red-700 transition-colors duration-200"
          />
        </div>
      ),
    });
  };

  return (
    <Card className="w-64 bg-gradient-to-b from-white via-gray-100 to-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden border border-gray-100">
      {/* Imagen */}
      <img
        src={producto.image_url}
        alt={producto.nombre}
        className="w-full h-52 object-cover rounded-t-xl"
      />

      {/* Contenido */}
      <CardContent className="p-3 flex flex-col justify-between flex-grow">
        <div className="flex justify-between items-start">
          <div className="space-y-1.5 leading-snug"> 
            <h2 className="text-base font-semibold text-gray-800 tracking-tight leading-tight">
              {producto.nombre}
            </h2>

            {producto.precioEspecial !== null && producto.precioEspecial !== undefined ? (
              <div className="flex items-center gap-2 leading-normal">
                <p className="text-gray-500 text-base line-through leading-normal">
                  ${producto.precio}
                </p>
                <p className="text-gray-700 text-base font-semibold leading-normal">
                  ${producto.precioEspecial}
                </p>
              </div>
            ) : (
              <p className="text-gray-700 text-base font-semibold leading-normal">
                ${producto.precio}
              </p>
            )}

            <p
              className={`text-sm font-semibold ${parseInt(producto.estado, 10) === 1
                ? "text-[#0000FF]"
                : "text-[#CC0000]"
                }`}
            >
              {parseInt(producto.estado, 10) === 1
                ? "Disponible"
                : "No Disponible"}
            </p>
          </div>



          {/* Botones */}
          <div className="flex flex-col gap-1.5">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-gray-300 p-1 w-7 h-8 bg-gray-100 hover:scale-110 hover:bg-[#b3edc3] transition-transform duration-300"
              onClick={() => onEditar(producto)}
            >
              <Pencil className="w-3 h-3" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-gray-300 p-1 w-7 h-8 bg-gray-100 hover:scale-110 hover:bg-[#f9bebe] transition-transform duration-300"
              onClick={() => {
                console.log("Producto al eliminar:", producto);
                eliminarProducto(producto.idProducto);
              }}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

  )
}