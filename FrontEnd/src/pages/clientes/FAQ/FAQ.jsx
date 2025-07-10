import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "@/components/ui/pageProps/Breadcrumbs";

const FAQ = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    setPrevLocation(location.state?.data || "Inicio");
  }, [location]);

  const preguntasFrecuentes = [
    {
      pregunta: "¿Realizan envíos internacionales?",
      respuesta: "Actualmente solo realizamos envíos dentro de Costa Rica.",
    },
    {
      pregunta: "¿Las piezas son hechas a mano?",
      respuesta: "Sí, todas las joyas son diseñadas y elaboradas a mano por Melissa Aguilar con piedras seleccionadas cuidadosamente.",
    },
    {
      pregunta: "¿Puedo solicitar una pieza personalizada?",
      respuesta: "¡Por supuesto! Podés realizar un pedido especial desde la sección correspondiente.",
    },
    {
      pregunta: "¿Qué tipo de piedras utilizan?",
      respuesta: "Trabajamos con piedras naturales y sintéticas según la solicitud del cliente. Siempre se indica claramente el tipo en la descripción.",
    },
    {
      pregunta: "¿Cómo puedo pagar?",
      respuesta: "Aceptamos pagos por SINPE Móvil y transferencia bancaria. Al finalizar el pedido se te brindarán los detalles.",
    },
    {
      pregunta: "¿Dónde están ubicados?",
      respuesta: "Trabajamos desde San José, Costa Rica. No contamos con tienda física, pero coordinamos entregas personalizadas.",
    },
    {
      pregunta: "¿Cuánto tiempo tarda un pedido?",
      respuesta: "Los pedidos regulares se entregan entre 3 y 5 días hábiles. Los pedidos personalizados pueden tardar entre 7 y 10 días.",
    },
    {
      pregunta: "¿Puedo devolver o cambiar una joya?",
      respuesta: "Aceptamos cambios solo si la pieza presenta un defecto de fabricación. No aceptamos devoluciones por cambio de opinión.",
    },
    {
      pregunta: "¿Cómo debo cuidar mi joyería?",
      respuesta: "Te recomendamos guardar tus piezas en una bolsa suave, evitar contacto con agua, perfumes o productos químicos, y limpiarlas con un paño seco.",
    },
    {
      pregunta: "¿Cómo puedo contactarlos?",
      respuesta: "Podés escribirnos por WhatsApp, Instagram o desde la sección de Contacto en esta página.",
    },
  ];

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Preguntas Frecuentes" prevLocation={prevLocation} />
      <div className="py-10">
        <h2 className="text-2xl font-titleFont font-semibold mb-6 text-primeColor">
          Preguntas Frecuentes
        </h2>
        <div className="flex flex-col gap-6">
          {preguntasFrecuentes.map((faq, index) => (
            <div key={index} className="border-b pb-4">
              <h3 className="text-lg font-semibold">{faq.pregunta}</h3>
              <p className="text-sm mt-2 text-lightText">{faq.respuesta}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
