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

  const editarProducto = () => {
    console.log("Editar producto:", producto)
    // Aquí abrirías el modal de edición
  }

  return (
    <Card className="w-64 bg-white rounded-md shadow hover:shadow-lg transition duration-300">
      <img
        src={producto.image_url}
        alt={producto.nombre}
        className="w-full h-32 object-cover rounded-t-md"
      />
      <CardContent className="p-2">
        <h2 className="text-sm font-semibold text-gray-800 truncate">{producto.nombre}</h2>
        <p className="text-gray-600 text-sm mb-1">₡{producto.precio}</p>

        <p
          className={`text-sm font-semibold ${parseInt(producto.estado, 10) === 1 ? "text-green-600" : "text-red-600"
            }`}
        >
          {parseInt(producto.estado, 10) === 1 ? "Disponible" : "No Disponible"}
        </p>



        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            className="text-[#8C162A] hover:text-[#660022] p-1"
            onClick={() => onEditar(producto)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            className="text-[#BAD1C9] hover:text-[#8FB6AC] p-1"
            onClick={() => eliminarProducto(producto.idProducto)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>

  )
}