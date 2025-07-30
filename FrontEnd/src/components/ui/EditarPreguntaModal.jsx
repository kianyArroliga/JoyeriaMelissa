import { useEffect, useState } from "react"
import axios from "axios"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast"


export default function EditarPreguntaModal({ pregunta, open, onCerrar, onPreguntaActualizada }) {
    const [formulario, setFormulario] = useState({
        pregunta: "",
        respuesta: "",
        visible: true,
    });

    useEffect(() => {
        if (pregunta) {
            setFormulario({
                pregunta: pregunta.pregunta || "",
                respuesta: pregunta.respuesta || "",
                visible: pregunta.visible === 1 || pregunta.visible === true,
            });
        }
    }, [pregunta]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formulario.pregunta.trim() || !formulario.respuesta.trim()) {
            toast({
                title: "Campos incompletos",
                description: "Todos los campos son obligatorios.",
                variant: "destructive",
                duration: 3000,
                className:
                    "rounded-xl border border-red-300 shadow-md bg-white text-red-700 animate-slide-out-right transition-all duration-300",
            });
            return;
        }

        try {
            await axios.put(
                `http://localhost:4000/api/preguntas/editarPregunta/${pregunta.idPregunta}`,
                {
                    pregunta: formulario.pregunta,
                    respuesta: formulario.respuesta,
                    visible: formulario.visible ? 1 : 0,
                },
                { headers: { "Content-Type": "application/json" } }
            );

            toast({
                title: "Actualizado",
                description: "La pregunta se actualizó correctamente.",
                variant: "success",
                duration: 3000,
                className:
                    "rounded-xl border border-green-300 shadow-md bg-white text-green-700 animate-slide-out-right transition-all duration-300",
            });

            onPreguntaActualizada();
            onCerrar();
        } catch (error) {
            console.error("Error al editar la pregunta:", error);
            toast({
                title: "Error",
                description: "Ocurrió un error al actualizar la pregunta.",
                variant: "destructive",
                duration: 3000,
                className:
                    "rounded-xl border border-red-300 shadow-md bg-white text-red-700 animate-slide-out-right transition-all duration-300",
            });
        }
    };


    return (
        <Dialog open={open} onOpenChange={onCerrar}>
            <DialogContent className="max-w-lg bg-white p-9 rounded-2xl shadow-lg">
                <DialogHeader>

                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-8 mt-[-20px]">
                    {/* Pregunta */}
                    <div className="flex flex-col">
                        <label className="text-gray-800 font-semibold text-base mb-2">Pregunta</label>
                        <div className="rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-[#8C162A] focus-within:border-transparent transition duration-200 ease-out">
                            <Input
                                name="pregunta"
                                value={formulario.pregunta}
                                onChange={handleChange}
                                placeholder="Escribe la pregunta"
                                className="w-full rounded-lg border-none px-3 py-2 text-[15px] font-medium text-gray-700 placeholder-gray-400 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Respuesta */}
                    <div className="flex flex-col">
                        <label className="text-gray-800 font-semibold text-base mb-2">Respuesta</label>
                        <div className="rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-[#8C162A] focus-within:border-transparent transition duration-200 ease-out">
                            <Textarea
                                name="respuesta"
                                value={formulario.respuesta}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Escribe la respuesta"
                                className="w-full rounded-lg border-none px-3 py-2 text-[15px] font-medium text-gray-700 placeholder-gray-400 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Visibilidad */}
                    <div className="flex flex-col w-44 transform -translate-y-1">
                        <label className="text-gray-800 font-semibold text-base mb-2">Visibilidad</label>
                        <div className="rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-[#8C162A] focus-within:border-transparent transition duration-200 ease-out">
                            <Select
                                value={formulario.visible ? "1" : "0"}
                                onValueChange={(value) =>
                                    setFormulario((prev) => ({ ...prev, visible: value === "1" }))
                                }
                            >
                                <SelectTrigger
                                    className="w-full rounded-lg text-[15px] font-normal border border-gray-400 px-3 py-2
        focus:border-gray-500 focus:ring-0
        transition-all duration-200 ease-out appearance-none"
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
                    </div>


                    <div className="flex justify-center -translate-y-1">
                        <Button
                            type="submit"
                            className="bg-[#83cbb1] hover:bg-[#6ca791] text-white px-5 py-2 rounded-full shadow-md transition duration-300 hover:scale-105"
                        >
                            Cambiar
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}