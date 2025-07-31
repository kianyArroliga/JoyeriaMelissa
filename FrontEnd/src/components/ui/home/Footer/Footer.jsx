import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import FooterListTitle from "@/components/ui/home/Footer/FooterListTitle";
import Image from "@/components/ui/designLayouts/Image";
import { paymentCard } from "@/assets/images";

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const emailValidation = () => {
    return String(emailInfo)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubscription = () => {
    if (emailInfo === "") {
      setErrMsg("Por favor, ingresa un correo electrónico.");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("El correo ingresado no es válido.");
    } else {
      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
    }
  };

  return (
    <div className="w-full bg-[#F5F5F3] py-20">
      <div className="max-w-container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 px-4 gap-10">
        <div className="col-span-2 sm:col-span-2 md:col-span-1">
          <FooterListTitle title="Sobre Melissa Aguilar Joyería" />
          <div className="flex flex-col gap-6">
            <p className="text-base w-full xl:w-[80%]">
              Joyería artesanal creada con amor en Costa Rica. Piezas únicas, piedras naturales y un estilo que te acompaña siempre.
            </p>
            <ul className="flex gap-2">
              <li className="w-7 h-7 rounded-full bg-primeColor hover:bg-black duration-300 flex justify-center items-center">
                <a
                  href="https://www.instagram.com/melissaaguilarjoyeria/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="text-gray-100 hover:text-white text-lg"
                >
                  <FaInstagram />
                </a>
              </li>
              <li className="w-7 h-7 rounded-full bg-primeColor hover:bg-black duration-300 flex justify-center items-center">
                <a
                  href="https://www.facebook.com/melissaaguilarjoyeria"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="text-gray-100 hover:text-white text-lg"
                >
                  <FaFacebook />
                </a>
              </li>
              <li className="w-7 h-7 rounded-full bg-primeColor hover:bg-black duration-300 flex justify-center items-center">
                <a
                  href="https://wa.me/50684312346"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="text-gray-100 hover:text-white text-lg"
                >
                  <FaWhatsapp />
                </a>
              </li>
              <li className="w-7 h-7 rounded-full bg-primeColor hover:bg-black duration-300 flex justify-center items-center">
                <a
                  href="mailto:melissa@melissaaguilar.com"
                  aria-label="Email"
                  className="text-gray-100 hover:text-white text-lg"
                >
                  <MdEmail />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <FooterListTitle title="Categorías" />
          <ul className="flex flex-col gap-2">
            <li className="hover:underline cursor-pointer">Anillos</li>
            <li className="hover:underline cursor-pointer">Aretes</li>
            <li className="hover:underline cursor-pointer">Dijes y Cadenas</li>
            <li className="hover:underline cursor-pointer">Pulseras</li>
            <li className="hover:underline cursor-pointer">Piezas personalizadas</li>
          </ul>
        </div>

        <div>
          <FooterListTitle title="Tu cuenta" />
          <ul className="flex flex-col gap-2">
            <li className="hover:underline cursor-pointer">Perfil</li>
            <li className="hover:underline cursor-pointer">Pedidos</li>
            <li className="hover:underline cursor-pointer">Direcciones</li>
            <li className="hover:underline cursor-pointer">Detalles de cuenta</li>
            <li className="hover:underline cursor-pointer">Métodos de pago</li>
          </ul>
        </div>

        <div className="col-span-2 flex flex-col items-center w-full px-4">
          <FooterListTitle title="Suscríbete a nuestro boletín" />
          <div className="w-full">
            <p className="text-center mb-4">
              Sé la primera en enterarte de nuestras nuevas colecciones y promociones.
            </p>
            {subscription ? (
              <motion.p
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full text-center text-base font-titleFont font-semibold text-green-600"
              >
                ¡Suscripción exitosa!
              </motion.p>
            ) : (
              <div className="w-full flex-col xl:flex-row flex justify-between items-center gap-4">
                <div className="flex flex-col w-full">
                  <input
                    onChange={(e) => setEmailInfo(e.target.value)}
                    value={emailInfo}
                    className="w-full h-12 border-b border-gray-400 bg-transparent px-4 text-primeColor text-lg placeholder:text-base outline-none"
                    type="email"
                    placeholder="Ingresa tu correo..."
                  />
                  {errMsg && (
                    <p className="text-red-600 text-sm font-semibold text-center animate-bounce mt-2">
                      {errMsg}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSubscription}
                  className="bg-white text-lightText w-[30%] h-10 hover:bg-black hover:text-white duration-300 text-base tracking-wide"
                >
                  Suscribirme
                </button>
              </div>
            )}
            <Image
              className={`w-[80%] lg:w-[60%] mx-auto ${
                subscription ? "mt-2" : "mt-6"
              }`}
              imgSrc={paymentCard}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
