import React, { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumbs from "@/components/ui/pageProps/Breadcrumbs";
import Pagination from "@/components/ui/pageProps/shopPage/Pagination";
import ProductBanner from "@/components/ui/pageProps/shopPage/ProductBanner";
import Product from "@/components/ui/home/Products/Product";
import FiltrosCatalogo from "@/components/ui/pageProps/shopPage/FiltrosCatalogo";

const Catalogo = () => {
  const [itemsPorPagina, setItemsPorPagina] = useState(12);
  const [productos, setProductos] = useState([]);
  const [filtros, setFiltros] = useState({});
  const [busqueda, setBusqueda] = useState("");

  // Hook que se activa cuando se cambian los filtros
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/clientes/catalogo/filtros", {
          params: filtros,  // Pasamos los filtros como parámetros
        });
        setProductos(res.data);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    obtenerProductos();
  }, [filtros]);  // Se vuelve a ejecutar cuando cambian los filtros

  // Función para manejar el cambio en el número de productos por página
  const manejarItemsPorPagina = (valor) => {
    setItemsPorPagina(valor);
  };

  // Función para actualizar los filtros
  const manejarFiltros = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Catálogo" />

      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] md:block h-full">
          <FiltrosCatalogo onFilterChange={manejarFiltros} />
        </div>

        {/* Panel Derecho */}
        <div className="flex-1 overflow-y-auto bg-white p-5 mt-20 sm:mt-12 scrollbar-none">
          {/* responsive celular */}
          <div className="md:hidden flex flex-col gap-y-4">
            {productos
              .filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
              .map((producto) => (
                <Product
                  key={producto.idProducto}
                  idProducto={producto.idProducto}
                  nombreProducto={producto.nombreProducto}
                  descripcion={producto.descripcion}
                  precio={producto.precio}
                  precioEspecial={producto.precioEspecial}
                  image_url={producto.image_url}
                  nombreMaterial={producto.nombreMaterial}
                  destacado={producto.destacado}
                />
              ))}
          </div>

          {/* Vista Computadora */}
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productos
              .filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
              .map((producto) => (
                <div key={producto.idProducto} className="w-full">
                  <Product
                    key={producto.idProducto}
                    idProducto={producto.idProducto}
                    nombreProducto={producto.nombreProducto}
                    descripcion={producto.descripcion}
                    precio={producto.precio}
                    precioEspecial={producto.precioEspecial}
                    image_url={producto.image_url}
                    nombreMaterial={producto.nombreMaterial}
                    destacado={producto.destacado}
                  />
                </div>
              ))}
          </div>

          <Pagination itemsPerPage={itemsPorPagina} />
        </div>
      </div>
    </div>
  );
};

export default Catalogo;
