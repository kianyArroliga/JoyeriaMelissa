import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "@/components/ui/pageProps/Breadcrumbs";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

const Contacto = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    setPrevLocation(location.state?.data || "");
  }, [location]);

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Contacto" prevLocation={prevLocation} />
      <div className="py-12 text-center">
        <h1 className="font-titleFont font-semibold text-3xl mb-6">
          ¿Quieres ponerte en contacto?
        </h1>
        <p className="text-lg text-[#555] mb-4">
          Puedes escribirnos directamente a nuestro correo:
        </p>
        <p className="text-xl text-primeColor font-semibold mb-8 flex justify-center items-center gap-2">
          <FaEnvelope />
          <a
            href="mailto:melissa@melissaaguilar.com"
            className="hover:underline"
          >
            melissa@melissaaguilar.com
          </a>
        </p>
        <p className="text-lg text-[#555] mb-4">
          O seguirnos y escribirnos por nuestras redes sociales:
        </p>
        <div className="flex justify-center gap-10 text-2xl text-primeColor">
          <a
            href="https://www.instagram.com/melissaaguilarjoyeria/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#d6249f]"
            title="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com/melissaaguilarjoyeria"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1877f2]"
            title="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=50684312346&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#25d366]"
            title="WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
