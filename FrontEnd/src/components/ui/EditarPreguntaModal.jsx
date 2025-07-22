import { useEffect, useState } from "react"
import axios from "axios"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function EditarPreguntaModal({ pregunta, onCerrar, onPreguntaActualizado }) {
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
                visible: !!pregunta.visible,
            });
        }
    }, [pregunta]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario((prev) => ({ ...prev, [name]: value }));
    };

    const handleSwitch = (checked) => {
        setFormulario((prev) => ({ ...prev, visible: checked }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:4000/api/preguntas/editarPregunta/${pregunta.idPregunta}`, formulario);
            onPreguntaActualizado(); // Para recargar la lista
            onCerrar();
        } catch (error) {
            console.error("Error al editar la pregunta:", error);
        }
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Editar Pregunta Frecuente</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Pregunta</Label>
                        <Input
                            name="pregunta"
                            value={formulario.pregunta}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <Label>Respuesta</Label>
                        <Textarea
                            name="respuesta"
                            value={formulario.respuesta}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <Switch
                            checked={formulario.visible}
                            onCheckedChange={handleSwitch}
                            id="visible"
                        />
                        <Label htmlFor="visible">Visible en el sitio</Label>
                    </div>

                    <div className="text-end">
                        <Button type="submit">Guardar cambios</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}