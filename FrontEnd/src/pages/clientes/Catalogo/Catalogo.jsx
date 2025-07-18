import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumbs from "@/components/ui/pageProps/Breadcrumbs";
import Pagination from "@/components/ui/pageProps/shopPage/Pagination";
import ProductBanner from "@/components/ui/pageProps/shopPage/ProductBanner";
import NavLatTienda from "@/components/ui/pageProps/shopPage/NavLatTienda";
import Product from "@/components/ui/home/Products/Product";

const Catalogo = () => {
  const [itemsPorPagina, setItemsPorPagina] = useState(12);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/catalogo/inicio");
        setProductos(res.data);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    obtenerProductos();
  }, []);

  const manejarItemsPorPagina = (valor) => {
    setItemsPorPagina(valor);
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Catálogo" />

      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
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