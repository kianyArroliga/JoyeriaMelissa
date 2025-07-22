import { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PreguntaCard } from "@/components/ui/PreguntaCard";
import EditarPreguntaModal from "@/components/ui/EditarPreguntaModal";
import { List } from "lucide-react";
import { Star, StarOff } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Pregunta() {
    const [preguntas, setPreguntas] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [preguntaEditar, setPreguntaEditar] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [nuevaPregunta, setNuevaPregunta] = useState({
        pregunta: "",
        respuesta: "",
        visible: true,
    });

    // Traer productos al cargar
    const obtenerPreguntas = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/preguntas/preguntas");
            setPreguntas(response.data);
        } catch (error) {
            console.error("Error al obtener las preguntas:", error);
        }
    };


    // Traer datos fijos
    useEffect(() => {
        obtenerPreguntas();
    }, []);

    return (
        <div className="space-y-4 p-4 bg-white shadow-md rounded-xl max-w-md">
            <h2 className="text-lg font-bold text-gray-700">Agregar nueva pregunta</h2>
            <Input
                name="pregunta"
                placeholder="Escribe la pregunta"
                value={nuevaPregunta.pregunta}
                onChange={(e) => setNuevaPregunta({ ...nuevaPregunta, pregunta: e.target.value })}
            />
            <Textarea
                name="respuesta"
                placeholder="Escribe la respuesta"
                value={nuevaPregunta.respuesta}
                onChange={(e) => setNuevaPregunta({ ...nuevaPregunta, respuesta: e.target.value })}
            />
            <Select
                value={nuevaPregunta.visible ? "1" : "0"}
                onValueChange={(value) => setNuevaPregunta({ ...nuevaPregunta, visible: value === "1" })}
            >
                <SelectTrigger><SelectValue placeholder="Visibilidad" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">Visible</SelectItem>
                    <SelectItem value="0">Oculta</SelectItem>
                </SelectContent>
            </Select>
            <Button
                onClick={async () => {
                    try {
                        await axios.post("http://localhost:4000/api/preguntas/agregarPregunta", nuevaPregunta);
                        obtenerPreguntas();
                        setNuevaPregunta({ pregunta: "", respuesta: "", visible: true });
                    } catch (err) {
                        console.error("Error al guardar la pregunta:", err);
                    }
                }}
            >
                Guardar
            </Button>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {preguntas.map((p) => (
                    <PreguntaCard
                        key={p.idPregunta}
                        pregunta={p}
                        onEditar={(p) => {
                            setPreguntaEditar(p);
                            setMostrarModal(true);
                        }}
                        onEliminada={(id) => setPreguntas((prev) => prev.filter((q) => q.idPregunta !== id))}
                        onPreguntaActualizada={obtenerPreguntas}
                    />
                ))}
            </div>

            {mostrarModal && (
                <EditarPreguntaModal
                    pregunta={preguntaEditar}
                    onCerrar={() => setMostrarModal(false)}
                    onPreguntaActualizada={obtenerPreguntas}
                />
            )}
        </div>


    );
}