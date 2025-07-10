import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-3xl font-bold font-titleFont mb-4 text-destructive">
        404 - Página no encontrada
      </h1>
      <p className="text-lg text-lightText">
        Lo sentimos, la página que buscas no existe o fue movida.
      </p>
      <Link
        to="/"
        className="mt-6 text-primeColor font-medium hover:underline"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default ErrorPage;
