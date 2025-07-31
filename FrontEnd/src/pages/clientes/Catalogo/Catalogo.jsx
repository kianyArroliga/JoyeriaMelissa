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
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner itemsPerPageFromBanner={manejarItemsPorPagina} />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {productos.map((producto) => (
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
          <Pagination itemsPerPage={itemsPorPagina} />
        </div>
      </div>
    </div>
  );
};

export default Catalogo;
