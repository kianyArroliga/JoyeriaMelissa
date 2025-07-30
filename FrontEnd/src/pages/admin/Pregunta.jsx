import { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PreguntaCard } from "@/components/ui/PreguntaCard";
import EditarPreguntaModal from "@/components/ui/EditarPreguntaModal";
import { MessageCirclePlus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast"


export default function Pregunta() {
  const [preguntas, setPreguntas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [preguntaEditar, setPreguntaEditar] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [busqueda] = useState("");

  const [nuevaPregunta, setNuevaPregunta] = useState({
    pregunta: "",
    respuesta: "",
    visible: true,
  });

  const obtenerPreguntas = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/preguntas/preguntas");
      setPreguntas([...response.data].reverse()); // mantiene las nuevas al final siempre
    } catch (error) {
      console.error("Error al obtener las preguntas:", error);
    }
  };

  // Traer datos fijos
  useEffect(() => {
    obtenerPreguntas();
  }, []);

  useEffect(() => {
    if (!mostrarFormulario) {
      setNuevaPregunta({ pregunta: "", respuesta: "", visible: true });
    }
  }, [mostrarFormulario]);


  const handleGuardar = async () => {
    try {
      if (!nuevaPregunta.pregunta.trim() || !nuevaPregunta.respuesta.trim()) {
        toast({
          title: "Campos incompletos",
          description: "Debes completar todo.",
          variant: "destructive",
          duration: 3000,
          className:
            "rounded-xl border border-red-300 shadow-md bg-white text-red-700 animate-slide-out-right transition-all duration-300",
        });
        return;
      }

      const response = await axios.post(
        `http://localhost:4000/api/preguntas/agregarPregunta`,
        nuevaPregunta,
        { headers: { "Content-Type": "application/json" } }
      );

      const nuevaConID = { ...nuevaPregunta, idPregunta: response.data.idPregunta || Date.now() };
      setPreguntas((prev) => [...prev, nuevaConID]); //  al final

      // Limpiar formulario
      setNuevaPregunta({ pregunta: "", respuesta: "", visible: true });
      setMostrarFormulario(false);

      toast({
        title: "Guardada",
        description: "La pregunta fue agregada correctamente.",
        variant: "success",
        duration: 4000,
        className:
          "rounded-xl border border-green-300 shadow-md bg-white text-green-700 animate-slide-out-right transition-all duration-300",
      });

    } catch (error) {
      console.error("Error al guardar pregunta:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar la pregunta.",
        variant: "destructive",
        duration: 4000,
        className:
          "rounded-xl border border-red-300 shadow-md bg-white text-red-700 animate-slide-out-right transition-all duration-300",
      });
    }
  };

  return (
    <div className="relative w-full max-w-6xl h-screen mx-auto bg-white-50 px-3 py-3 overflow-y-auto scrollbar-none">

      <Button
        onClick={() => setMostrarFormulario((prev) => !prev)}
        className={`fixed top-6 left-8 z-50 p-4 rounded-full shadow-lg transition duration-300
    ${mostrarFormulario ? "bg-[#8C162A] hover:bg-[#660022]" : "bg-[#8C162A] hover:bg-[#660022]"}`}
      >
        <MessageCirclePlus className="!w-5 !h-5" />
      </Button>

      <div
        className={`fixed left-6 top-24 bg-gray-50 shadow-lg rounded-xl overflow-hidden transition-all duration-500 ease-in-out
        ${mostrarFormulario ? "max-h-[500px] opacity-100 p-5" : "max-h-0 opacity-0 p-0"}`}
        style={{ width: "370px" }}
      >

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Pregunta */}
          <div className="flex flex-col sm:col-span-2">
            <label className="text-gray-800 font-semibold text-base mb-1">Pregunta</label>
            <Input
              name="pregunta"
              value={nuevaPregunta.pregunta}
              onChange={(e) =>
                setNuevaPregunta({ ...nuevaPregunta, pregunta: e.target.value })
              }
              className="rounded-lg appearance-none text-[18px] font-medium leading-tight text-gray-700 placeholder:text-gray-400 border border-gray-400
    focus:border-gray-300 focus:ring-0
    transition-all duration-200 ease-out transform focus:scale-105"
            />
          </div>

          {/* Respuesta */}
          <div className="flex flex-col sm:col-span-2">
            <label className="text-gray-800 font-semibold text-base mb-1">Respuesta</label>
            <Textarea
              name="respuesta"
              value={nuevaPregunta.respuesta}
              onChange={(e) =>
                setNuevaPregunta({ ...nuevaPregunta, respuesta: e.target.value })
              }
              rows={2}
              className="rounded-lg appearance-none text-[18px] font-medium leading-tight text-gray-700 placeholder:text-gray-400 border border-gray-400
    focus:border-gray-300 focus:ring-0
    transition-all duration-200 ease-out transform focus:scale-105"
            />
          </div>

          {/* Visibilidad */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-semibold text-base mb-1">Visibilidad</label>
            <Select
              value={nuevaPregunta.visible ? "1" : "0"}
              onValueChange={(value) =>
                setNuevaPregunta({ ...nuevaPregunta, visible: value === "1" })
              }
            >
              <SelectTrigger
                className="w-full rounded-lg text-[15px] font-normal border border-gray-400 px-3 py-2
      focus:border-gray-500 focus:ring-0
      transition-all duration-200 ease-out transform focus:scale-105 appearance-none"
              >
                <SelectValue placeholder="Selecciona visibilidad" />
              </SelectTrigger>
              <SelectContent className="bg-white border rounded-lg shadow-lg">
                <SelectItem
                  value="1"
                  className="flex justify-center items-center hover:bg-gray-100 focus:bg-[#faebd7e5]
        text-[16px] font-medium text-gray-600 rounded-full px-3 py-1 transition-all duration-200"
                >
                  Visible
                </SelectItem>
                <SelectItem
                  value="0"
                  className="flex justify-center items-center hover:bg-gray-100 focus:bg-[#faebd7e5]
        text-[16px] font-medium text-gray-600 rounded-full px-3 py-1 transition-all duration-200"
                >
                  Oculta
                </SelectItem>
              </SelectContent>
            </Select>
          </div>


          {/* Boton */}
          <div className="flex justify-center sm:col-span-2">
            <Button
              onClick={handleGuardar}
              className="bg-[#83cbb1] hover:bg-[#6ca791] text-white px-6 py-2 rounded-full shadow-md
            transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#BAD1C9]"
            >
              Guardar
            </Button>
          </div>
        </div>
      </div>

      {/* Cards centradas con scroll */}
      <div className="flex-1 mt-6 overflow-hidden flex justify-center">
        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 p-4 w-full max-w-6xl">
          <div className="flex flex-col gap-4 items-center p-4 w-full">
            {preguntas.map((p) => (
              <PreguntaCard
                key={p.idPregunta}
                pregunta={p}
                onEditar={(preg) => {
                  setPreguntaEditar(preg);
                  setMostrarModal(true);
                }}
                onEliminada={(id) =>
                  setPreguntas((prev) => prev.filter((q) => q.idPregunta !== id))
                }
                onPreguntaActualizada={obtenerPreguntas}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal editar pregunta */}
      {mostrarModal && (
        <EditarPreguntaModal
          open={mostrarModal}
          pregunta={preguntaEditar}
          onCerrar={() => setMostrarModal(false)}
          onPreguntaActualizada={obtenerPreguntas}
        />
      )}
    </div>
  );

}
