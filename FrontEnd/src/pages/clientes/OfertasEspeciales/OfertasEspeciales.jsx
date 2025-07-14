import React from "react";
import Breadcrumbs from "@/components/ui/pageProps/Breadcrumbs";
import OfertasEsps from "@/components/ui/home/OfertasEspeciales/OfertasEspeciales";

const OfertasEspeciales = () => {
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Ofertas Especiales" prevLocation="Inicio" />
      <div className="pb-10">
        <OfertasEsps />
      </div>
    </div>
  );
};

export default OfertasEspeciales;
