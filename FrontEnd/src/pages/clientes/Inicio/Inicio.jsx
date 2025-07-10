import React, { useEffect, useState } from "react";

import bannerImgOne from "@/assets/images/banner/bannerImgOne.png";
import bannerImgTwo from "@/assets/images/banner/bannerImgTwo.png";
import bannerImgThree from "@/assets/images/banner/bannerImgThree.png";

import forgetMeNotTurmalinas from "@/assets/images/products/Aretes/Plata/ForgetMeNotConTurmalinas.jpg";
import pulseraAmazonita from "@/assets/images/products/Pulseras/Plata/PulseraPlataPerlasAmazonitaNatural.jpg";
import oro1 from "@/assets/images/products/Anillos/Oro/oro1.jpg";

const Inicio = () => {
  const banners = [bannerImgOne, bannerImgTwo, bannerImgThree];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="w-full mx-auto">
      {/* Banner principal */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src={banners[index]}
          alt="Banner joyería artesanal"
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40 text-white text-center">
          <h1 className="text-4xl font-bold mb-2">Melissa Aguilar Joyería</h1>
          <p className="text-lg">Joyas artesanales hechas con amor en Costa Rica</p>
        </div>
      </section>

      {/* Contenido principal */}
      <div className="max-w-container mx-auto px-4">
        {/* Piezas destacadas */}
        <section className="my-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Piezas Destacadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <img src={forgetMeNotTurmalinas} alt="Aretes de plata con turmalinas" className="mx-auto" />
              <h3 className="font-semibold mt-2">Aretes Forget-me-not</h3>
              <p className="text-[#767676]">$35.00 USD</p>
            </div>
            <div className="text-center">
              <img src={pulseraAmazonita} alt="Pulsera de plata con amazonita" className="mx-auto" />
              <h3 className="font-semibold mt-2">Pulsera con Amazonita</h3>
              <p className="text-[#767676]">$40.00 USD</p>
            </div>
            <div className="text-center">
              <img src={oro1} alt="Anillo de oro artesanal" className="mx-auto" />
              <h3 className="font-semibold mt-2">Anillo de Oro Artesanal</h3>
              <p className="text-[#767676]">$120.00 USD</p>
            </div>
          </div>
        </section>

        {/* Información adicional */}
        <section className="text-center my-10">
          <p className="text-[#555]">
            Envíos a todo Costa Rica. Pagos seguros por SINPE Móvil o transferencia bancaria.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Inicio;
