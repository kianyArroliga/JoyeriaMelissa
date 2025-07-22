import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import axios from 'axios'

export function PreguntaCard({ pregunta, onPreguntaActualizada, onEditar, onEliminada }) {
  const eliminarPregunta = async (idPregunta) => {
    try {
      await axios.delete(`http://localhost:4000/api/preguntas/borrarPregunta/${idPregunta}`);
      onEliminada(idPregunta);
      if (onPreguntaActualizada) onPreguntaActualizada(); // Para refrescar la lista
    } catch (err) {
      console.error("Error al eliminar la pregunta:", err);
    }
  };
  return (
    <Card className="w-64 bg-gradient-to-b from-white via-gray-100 to-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden border border-gray-100">
      {/* Contenido */}
      <CardContent className="p-3 flex flex-col justify-between flex-grow">
        <div className="flex justify-between items-start">
          {/* Texto elegante */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {pregunta.pregunta}
            </h2>
            <p className="text-sm text-gray-600 mt-1">{pregunta.respuesta}</p>
            <p
              className={`text-xs font-medium mt-2 ${pregunta.visible ? "text-green-600" : "text-red-500"
                }`}
            >
              {pregunta.visible ? "Visible para usuarios" : "Oculta para usuarios"}
            </p>
          </div>

          {/* Botones con animación */}
          <div className="flex flex-col gap-1.5">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-gray-300 p-1 w-7 h-7 bg-gray-100 hover:scale-110 hover:bg-gray-300 transition-transform duration-300"
              onClick={() => onEditar(pregunta)}
            >
              <Pencil className="w-3 h-3" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-gray-300 p-1 w-7 h-7 bg-gray-100 hover:scale-110 hover:bg-gray-300 transition-transform duration-300"
              onClick={() => eliminarPregunta(pregunta.idPregunta)}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>




  )
}