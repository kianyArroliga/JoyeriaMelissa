import React, { useState } from "react";
import Breadcrumbs from "@/components/ui/pageProps/Breadcrumbs";
import Pagination from "@/components/ui/pageProps/shopPage/Pagination";
import ProductBanner from "@/components/ui/pageProps/shopPage/ProductBanner";
import NavLatTienda from "@/components/ui/pageProps/shopPage/NavLatTienda";

const Catalogo = () => {
  const [itemsPorPagina, setItemsPorPagina] = useState(12);

  const manejarItemsPorPagina = (valor) => {
    setItemsPorPagina(valor);
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Catálogo" />

      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <NavLatTienda />
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner itemsPerPageFromBanner={manejarItemsPorPagina} />
          <Pagination itemsPerPage={itemsPorPagina} />
        </div>
      </div>

    </div>
  );
};

export default Catalogo;
