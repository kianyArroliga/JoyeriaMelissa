import React from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";

import aretesPerlas from "@/assets/images/products/Aretes/Plata/StudsPlataDiamantesBruto3_5mm.jpg";
import dijeCorazon from "@/assets/images/products/Dijes-Cadenas/Plata/CadenaDijeParaWineLovers.jpg";
import pulseraOnix from "@/assets/images/products/Pulseras/Plata/PulseraPlataPerlasAmazonitaNatural.jpg";
import aretesRubi from "@/assets/images/products/Aretes/Plata/AretesColgarRubiSinteticoFormaGota.jpg";


const OfertasEspeciales = () => {
  return (
    <div className="w-full pb-20">
      <Heading heading="Ofertas Especiales" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        <Product
          _id="1101"
          img={aretesPerlas}
          productName="Aretes con perlas naturales"
          price="35.00"
          color="Blanco"
          badge={true}
          des="Diseño delicado con perlas cultivadas en oro laminado."
        />
        <Product
          _id="1102"
          img={dijeCorazon}
          productName="Dije corazón en cuarzo rosa"
          price="45.00"
          color="Rosa y dorado"
          badge={true}
          des="Colgante artesanal con cuarzo rosa tallado en forma de corazón."
        />
        <Product
          _id="1103"
          img={pulseraOnix}
          productName="Pulsera ajustable con ónix"
          price="25.00"
          color="Negro y dorado"
          badge={true}
          des="Pulsera hecha a mano con ónix natural y detalles dorados."
        />
        <Product
          _id="1104"
          img={aretesRubi}
          productName="Aretes mini con rubí sintético"
          price="22.00"
          color="Rojo rubí"
          badge={true}
          des="Perfectos para el uso diario con un toque de color."
        />
      </div>
    </div>
  );
};

export default OfertasEspeciales;