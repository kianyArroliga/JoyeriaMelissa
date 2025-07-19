import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PedidoCard } from "@/components/ui/PedidoCard";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Plus, PackageCheck, UserCog, Boxes, LogOut } from "lucide-react";

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
      <header className="w-full h-20 bg-[#EBE5CE] shadow flex items-center justify-between px-6 relative">
        <h1 className="text-xl font-semibold text-[#a00338]"></h1>

        {/* Menú en pantallas pequeñas */}
        <div className="md:hidden relative">
          <Button onClick={() => setMenuAbierto(!menuAbierto)} variant="outline">
            Menú
          </Button>
          {menuAbierto && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md p-2 z-50 flex flex-col gap-2">
              <Button variant="ghost" onClick={() => navigate("/admin/productos")}
                className="hover:bg-[#edefd5] hover:text-gray-900 transition-colors">Productos</Button>
              <Button variant="ghost" onClick={() => navigate("/admin/pedidos")}
                className="hover:bg-[#edefd5] hover:text-gray-900 transition-colors">Pedidos</Button>
              <Button variant="ghost" onClick={() => navigate("/admin/cuentas")}
                className="hover:bg-[#edefd5] hover:text-gray-900 transition-colors">Cuentas</Button>
              <Button variant="ghost" onClick={() => navigate("/admin/stock")}
                className="hover:bg-[#edefd5] hover:text-gray-900 transition-colors">Stock</Button>
              <Button variant="ghost" onClick={() => console.log("Cerrar sesión")} 
              className="hover:bg-[#f5c3bf] hover:text-gray-900 transition-colors">Cerrar sesión</Button>
            </div>
          )}
        </div>

        {/* Botones visibles en pantallas grandes */}
        <TooltipProvider>


          {/* Contenedor de iconos centrados */}
          <div className="hidden md:flex flex-1 justify-center gap-8">
            <Tooltip>
              <TooltipTrigger onClick={() => navigate("/admin/productos")} className="cursor-pointer text-[#434242]">
                <Plus className="w-6 h-6" />
              </TooltipTrigger>
              <TooltipContent>Productos</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger onClick={() => navigate("/admin/pedidos")} className="cursor-pointer text-[#434242]">
                <PackageCheck className="w-6 h-6" />
              </TooltipTrigger>
              <TooltipContent>Pedidos</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger onClick={() => navigate("/admin/cuentas")} className="cursor-pointer text-[#434242]">
                <UserCog className="w-6 h-6" />
              </TooltipTrigger>
              <TooltipContent>Cuentas</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger onClick={() => navigate("/admin/stock")} className="cursor-pointer text-[#434242]">
                <Boxes className="w-6 h-6 " />
              </TooltipTrigger>
              <TooltipContent>Stock</TooltipContent>
            </Tooltip>
          </div>

          <div className="hidden md:flex">
            <Tooltip>
              <TooltipTrigger
                onClick={() => navigate('/logout')}
                className="cursor-pointer text-[#9b0537] mr-7"
              >
                <LogOut className="w-6 h-6" />
              </TooltipTrigger>
              <TooltipContent>Cerrar Sesión</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>

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
