import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "@/components/ui/pageProps/Breadcrumbs";

const AcercaDe = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    setPrevLocation(location.state?.data || "");
  }, [location]);

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Acerca de" prevLocation={prevLocation} />
      <div className="pb-10">
        <h1 className="max-w-[700px] text-base text-lightText mb-4 leading-7">
          <span className="text-primeColor font-semibold text-lg">
            Melissa Aguilar Joyería
          </span>{" "}
          es una marca costarricense dedicada a la creación de joyas únicas,
          artesanales y con historia. Cada pieza es elaborada con atención al
          detalle, utilizando materiales de alta calidad como plata 925, oro de
          14k y piedras naturales o sintéticas, según la preferencia del cliente.
        </h1>
        <p className="max-w-[700px] text-base text-lightText mb-6 leading-7">
          Nuestro compromiso es ofrecer un servicio personalizado, donde cada
          clienta se sienta escuchada y acompañada en la elección de sus joyas.
          También ofrecemos piezas personalizadas por encargo mediante nuestro
          formulario de <strong>Pedido Especial</strong>.
        </p>
        <p className="max-w-[700px] text-base text-lightText mb-6 leading-7">
          Podés contactarnos a través del correo{" "}
          <a
            href="mailto:melissa@melissaaguilar.com"
            className="text-primeColor underline"
          >
            melissa@melissaaguilar.com
          </a>
          , por WhatsApp al{" "}
          <a
            href="https://wa.me/50684312346"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primeColor underline"
          >
            +506 8431 2346
          </a>{" "}
          o en nuestras redes sociales:{" "}
          <a
            href="https://www.instagram.com/melissaaguilarjoyeria/"
            className="text-primeColor underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>{" "}
          y{" "}
          <a
            href="https://www.facebook.com/melissaaguilarjoyeria"
            className="text-primeColor underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          .
        </p>
        <Link to="/catalogo">
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
            Ver Catálogo
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AcercaDe;
