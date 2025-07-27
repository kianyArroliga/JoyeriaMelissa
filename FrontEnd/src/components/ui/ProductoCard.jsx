import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import axios from 'axios'

export function ProductoCard({ producto, onProductoActualizado, onEditar }) {
  const eliminarProducto = async (idProducto) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await axios.delete(`http://localhost:4000/api/productos/borrar/${idProducto}`)
        alert("Producto eliminado correctamente")
        onProductoActualizado() // Refresca la lista
      } catch (error) {
        console.error("Error al eliminar producto:", error)
        alert("Hubo un error al eliminar el producto")
      }
    }
  }




  return (
    <Card className="w-64 bg-gradient-to-b from-white via-gray-100 to-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden border border-gray-100">
      {/* Imagen estática */}
      <img
        src={producto.image_url}
        alt={producto.nombre}
        className="w-full h-52 object-cover rounded-t-xl"
      />

      {/* Contenido */}
      <CardContent className="p-3 flex flex-col justify-between flex-grow">
        <div className="flex justify-between items-start">
          {/* Texto elegante */}
          <div>
            <h2 className="text-base font-semibold text-gray-800 tracking-tight">
              {producto.nombre}
            </h2>
            <p className="text-gray-600 text-sm font-medium">₡{producto.precio}</p>
            <p
              className={`text-sm font-semibold mt-1 ${parseInt(producto.estado, 10) === 1
                ? "text-green-500"
                : "text-red-500"
                }`}
            >
              {parseInt(producto.estado, 10) === 1
                ? "Disponible"
                : "No Disponible"}
            </p>
          </div>

          {/* Botones con animación */}
          <div className="flex flex-col gap-1.5">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-gray-300 p-1 w-7 h-7 bg-gray-100 hover:scale-110 hover:bg-gray-300 transition-transform duration-300"
              onClick={() => onEditar(producto)}
            >
              <Pencil className="w-3 h-3" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-gray-300 p-1 w-7 h-7 bg-gray-100 hover:scale-110 hover:bg-gray-300 transition-transform duration-300"
              onClick={() => eliminarProducto(producto.idProducto)}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>




  )
}