import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PedidoCard } from "@/components/ui/PedidoCard";

export default function DashboardAdmin() {
  const navigate = useNavigate()
  const [menuAbierto, setMenuAbierto] = useState(false)

  // Simulación de pedidos (esto luego será reemplazado por datos del backend)
  const pedidos = [
    { cliente: "Juan Pérez", producto: "Pulsera oro 18k", tipo: "Regular" },
    { cliente: "Ana López", producto: "Collar personalizado", tipo: "Especial" },
    { cliente: "Carlos Méndez", producto: "Anillo plata", tipo: "Regular" },
    { cliente: "Lucía Vargas", producto: "Grabado especial", tipo: "Especial" },
    { cliente: "Carlos Méndez", producto: "Anillo plata", tipo: "Regular" },
        { cliente: "Carlos Méndez", producto: "Anillo plata", tipo: "Regular" },
    { cliente: "Carlos Méndez", producto: "Anillo plata", tipo: "Regular" },

  ]

  const pedidosRegulares = pedidos.filter(p => p.tipo === "Regular")
  const pedidosEspeciales = pedidos.filter(p => p.tipo === "Especial")

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      {/* Navbar */}
      <header className="w-full h-20 bg-gray-50 shadow flex items-center justify-between px-6 relative">
        <h1 className="text-xl font-semibold text-gray-800">Mi Joyería</h1>

        {/* Menú en pantallas pequeñas */}
        <div className="md:hidden relative">
          <Button onClick={() => setMenuAbierto(!menuAbierto)} variant="outline">
            Menú
          </Button>
          {menuAbierto && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md p-2 z-50 flex flex-col gap-2">
              <Button variant="ghost" onClick={() => navigate("/admin/productos")}>Productos</Button>
              <Button variant="ghost" onClick={() => navigate("/admin/pedidos")}>Pedidos</Button>
              <Button variant="ghost" onClick={() => navigate("/admin/cuentas")}>Cuentas</Button>
              <Button variant="ghost" onClick={() => navigate("/admin/stock")}>Stock</Button>
              <Button className="text-black-600" variant="ghost" onClick={() => console.log("Cerrar sesión")}>Cerrar sesión</Button>
            </div>
          )}
        </div>

        {/* Botones visibles en pantallas grandes */}
        <div className="hidden md:flex flex-1 justify-center gap-6">
          <Button variant="ghost" onClick={() => navigate("/admin/productos")}>Productos</Button>
          <Button variant="ghost" onClick={() => navigate("/admin/pedidos")}>Pedidos</Button>
          <Button variant="ghost" onClick={() => navigate("/admin/cuentas")}>Cuentas</Button>
          <Button variant="ghost" onClick={() => navigate("/admin/stock")}>Stock</Button>
        </div>
        {/* Cerrar sesión en escritorio */}
        <div className="hidden md:flex">
          <Button
            className="text-black-600"
            variant="ghost"
            onClick={() => {
              console.log("Cerrar sesión")
            }}
          >
            Cerrar sesión
          </Button>
        </div>

      </header>

      {/* Contenido */}
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex flex-col gap-8">
            {/* Sección Regular */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 overflow-x-auto justify-center md:pl-12 scrollbar-none">
                {pedidosRegulares.map((pedido, index) => (
                  <PedidoCard key={index} cliente={pedido.cliente} producto={pedido.producto} tipo={pedido.tipo} />
                ))}
              </div>
            </div>

            {/* Sección Especial */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 overflow-x-auto justify-center md:pl-12 scrollbar-none">
                {pedidosEspeciales.map((pedido, index) => (
                  <PedidoCard key={index} cliente={pedido.cliente} producto={pedido.producto} tipo={pedido.tipo} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
