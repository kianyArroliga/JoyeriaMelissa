import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Save } from "lucide-react";
import { useState } from "react"
import { toast } from "@/hooks/use-toast"
import axios from "axios";

export function StockCard({ producto, onProductoActualizado, tallasGlobales }) {
  const [editando, setEditando] = useState(false);
  const [stock, setStock] = useState(producto.stock);
  const [tallasLocal, setTallasLocal] = useState(producto.tallas || []);



  const handleGuardarStock = async () => {
    try {
      const formData = new FormData();
      formData.append("nombre", producto.nombre);
      formData.append("precio", producto.precio && !isNaN(Number(producto.precio)) ? producto.precio : "");
      formData.append("descripcion", producto.descripcion);
      formData.append("idCategoria", producto.idCategoria);
      formData.append("idMaterial", producto.idMaterial);
      formData.append("idPiedra", producto.idPiedra);
      formData.append("estado", producto.estado);
      formData.append("imagen", producto.imagen);
      formData.append("precioEspecial", producto.precioEspecial && !isNaN(Number(producto.precioEspecial)) ? producto.precioEspecial : "");
      formData.append("destacado", producto.destacado ? 1 : 0);


        if (producto.categoria === "Anillos") {
      // si se actualiza 0
      const tallasSanitizadas = tallasLocal.map((t) => ({
        ...t,
        stock:
          t.stock === "" || t.stock === null || t.stock === undefined
            ? 0
            : parseInt(t.stock, 10),
      }));
      formData.append("tallas", JSON.stringify(tallasSanitizadas));
    } else {
      formData.append(
        "stock",
        stock === "" || stock === null || stock === undefined ? 0 : stock
      );
    }
      await axios.put(
        `http://localhost:4000/api/productos/editar/${producto.idProducto}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast({
        title: "Actualizado",
        description: "El stock se actualizó correctamente.",
        variant: "success",
        duration: 4000,
        className:
          "rounded-xl border border-green-300 shadow-md bg-white text-green-700 animate-slide-out-right transition-all duration-300",
      });
      onProductoActualizado();
      setEditando(false);
    } catch (error) {
      console.error("Error al actualizar stock:", error);
      toast({
        title: "Error al actualizar stock",
        description: "Hubo un problema al actualizar el stock.",
        variant: "destructive",
        duration: 3000,
        className:
          "rounded-xl border border-red-300 shadow-md bg-white text-red-700 animate-slide-out-right transition-all duration-300",
      });
    }
  };


  return (
    <Card className="w-64 bg-gradient-to-b from-white via-gray-100 to-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden border border-gray-100">
      {/* Imagen */}
      <img
        src={producto.image_url}
        alt={producto.nombre}
        
        className="w-full h-52 object-cover rounded-t-xl"
      />

      <CardContent
        className={`p-3 flex flex-col justify-between flex-grow transition-all duration-500 ease-in-out
  ${editando ? "scale-100 opacity-100" : "scale-95 opacity-90"}`}
      >
        <div className="flex justify-between items-start transition-all duration-500 ease-in-out">
          <div>
            <h2 className="text-base font-semibold text-gray-800 tracking-tight">
              {producto.nombre}
            </h2>

            <div
              className={`overflow-hidden transition-[max-height, opacity] duration-500 ease-in-out ${editando ? "max-h-[500px] opacity-100 mt-2 p-2" : "max-h-0 opacity-0"
                }`}
            >
              {producto.categoria === "Anillos" ? (
                <div className="grid grid-cols-2 gap-2">
                  {Array.isArray(tallasGlobales) ? (
                    tallasGlobales.map((talla) => {
                      const seleccionada = tallasLocal.find(
                        (t) => t.idTalla === talla.idTalla
                      );

                      return (
                        <div
                          key={talla.idTalla}
                          className="flex items-center justify-between gap-1"
                        >
                          {/* talla */}
                          <span className="text-[14px] font-medium text-gray-700 w-5 text-left">
                            {talla.tamanio}
                          </span>

                          {/* Input */}
                          <div
                            className="flex items-center rounded-md border border-gray-300 px-1 py-1 bg-white shadow-sm transition-all duration-300 ease-out transform focus-within:scale-105 focus-within:border-[#70B8A2]"
                          >
                            <input
                              type="number"
                              min="0"
                              value={
                                seleccionada && seleccionada.stock !== undefined
                                  ? seleccionada.stock === 0 && editando
                                    ? ""
                                    : seleccionada.stock
                                  : ""
                              }
                              onChange={(e) => {
                                const rawValue = e.target.value;
                                if (rawValue === "") {
                                  setTallasLocal((prev) =>
                                    prev.map((t) =>
                                      t.idTalla === talla.idTalla
                                        ? { ...t, stock: "" }
                                        : t
                                    )
                                  );
                                } else {
                                  const nuevoStock = parseInt(rawValue, 10);
                                  if (!isNaN(nuevoStock)) {
                                    setTallasLocal((prev) => {
                                      const existe = prev.find(
                                        (t) => t.idTalla === talla.idTalla
                                      );
                                      if (existe) {
                                        return prev.map((t) =>
                                          t.idTalla === talla.idTalla
                                            ? { ...t, stock: nuevoStock }
                                            : t
                                        );
                                      } else {
                                        return [
                                          ...prev,
                                          { idTalla: talla.idTalla, stock: nuevoStock },
                                        ];
                                      }
                                    });
                                  }
                                }
                              }}
                              className="w-11 text-center rounded-md text-[14px] px-1 py-0.5 bg-transparent border-none focus:outline-none placeholder-gray-400 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none -ml-1"
                              placeholder="0"
                            />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-red-500 text-sm mt-2">
                      Error: Tallas no cargadas
                    </p>
                  )}
                </div>
              ) : (
                // Categorias que no son Anillos
                <div className="mt-2 flex justify-center">
                  <div
                    className="rounded-md border border-gray-300 px-3 py-2 w-20
              transition-all duration-200 ease-out transform focus-within:scale-105
              focus-within:border-[#70B8A2] bg-white shadow-sm"
                  >
                    <input
                      type="number"
                      min="0"
                      value={stock === 0 ? "" : stock}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "") {
                          setStock(0);
                        } else {
                          setStock(parseInt(value, 10));
                        }
                      }}
                      className="block w-full text-center text-[15px] font-medium text-gray-700
                placeholder-gray-400 bg-transparent border-none focus:outline-none
                appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="0"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* lectura stock */}
            {!editando && (
              <>
                {producto.categoria === "Anillos" ? (
                  <p className="text-gray-600 text-sm mt-2">
                    {producto.tallas
                      .map((t) => `${t.tamanio}: ${t.stock}`)
                      .join(", ")}
                  </p>
                ) : (
                  <p className="text-gray-600 text-sm mt-2">
                    Stock: {producto.stock}
                  </p>
                )}
              </>
            )}
          </div>

          {/*  botones */}
          <div
            className={`flex flex-col gap-2 items-end transition-all duration-300 ease-in-out ${editando ? "space-y-2" : ""
              }`}
          >
            {/* editar */}
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-gray-300 p-1 w-8 h-9 bg-gray-100 hover:scale-110 hover:bg-[#b3edc3] transition-transform duration-300"
              onClick={() => {
                if (!editando) {
                  setStock(producto.stock);
                  setTallasLocal(producto.tallas);
                }
                setEditando(!editando);
              }}
            >
              <Pencil className="w-4 h-4" />
            </Button>

            {/* guardar */}
            {editando && (
              <div
                className="w-8 h-9 rounded-full overflow-hidden flex items-center justify-center transition-transform duration-300 ease-out hover:scale-110"
              >
                <Button
                  size="icon"
                  className="bg-[#8C162A] text-white rounded-full p-1 w-full h-full shadow-md hover:bg-[#8C162A]"
                  onClick={handleGuardarStock}
                >
                  <Save className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>

  );
}