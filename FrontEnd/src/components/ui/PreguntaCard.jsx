import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast"
import { ToastAction, ToastClose } from "@/components/ui/toast"
import axios from 'axios'

export function PreguntaCard({ pregunta, onPreguntaActualizada, onEditar, onEliminada }) {
  const eliminarPregunta = (idPregunta) => {
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
                await axios.delete(
                  `http://localhost:4000/api/preguntas/borrarPregunta/${idPregunta}`
                );

                toast({
                  title: "Eliminada",
                  description: "La pregunta fue eliminada correctamente.",
                  variant: "success",
                  duration: 1000,
                  className:
                    "rounded-xl border border-green-300 shadow-md bg-white text-green-700 animate-slide-out-right transition-all duration-300",
                });

                onEliminada(idPregunta);
                if (onPreguntaActualizada) onPreguntaActualizada(); // refrescar lista
              } catch (error) {
                console.error("Error al eliminar la pregunta:", error);
                toast({
                  title: "Error al eliminar",
                  description: "Hubo un problema al eliminar la pregunta.",
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
    <Card className="w-full max-w-2xl bg-gradient-to-b from-white via-gray-100 to-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 mx-auto">
      {/* Contenido */}
      <CardContent className="p-4 flex justify-between items-center">
        <div className="flex-1 pr-3">
          <h2 className="text-lg text-center font-semibold  text-gray-800">
            {pregunta.pregunta}
          </h2>
          <p className="text-base text-center text-gray-600 mt-1">{pregunta.respuesta}</p>
          <p
            className={`text-sm text-center font-medium mt-2 ${pregunta.visible ? "text-[#0000FF]" : "text-[#CC0000]"
              }`}
          >
            {pregunta.visible ? "Visible para usuarios" : "Oculta para usuarios"}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-gray-300 p-1 w-7 h-8 bg-gray-100 hover:scale-110 hover:bg-[#b3edc3] transition-transform duration-300"
            onClick={() => onEditar(pregunta)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-gray-300 p-1 w-7 h-8 bg-gray-100 hover:scale-110 hover:bg-[#f9bebe] transition-transform duration-300"
            onClick={() => eliminarPregunta(pregunta.idPregunta)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

}