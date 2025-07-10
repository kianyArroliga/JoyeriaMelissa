import React, { useState } from "react";
import { ImPlus } from "react-icons/im";
import NavTitle from "@/components/ui/pageProps/shopPage/filtrarPor/NavTitle";

const Categoria = () => {
  const [mostrarSubCat, setMostrarSubCat] = useState({});

  const categorias = [
    { _id: 992, title: "Anillos", icons: true },
    { _id: 990, title: "Aretes", icons: true },
    { _id: 993, title: "Cadenas y Dijes" },
    { _id: 991, title: "Pulseras" },
    { _id: 994, title: "Pedidos Especiales" },
  ];

  const toggleSubCat = (id) => {
    setMostrarSubCat((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="w-full">
      <NavTitle title="Filtrar por categoría" icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {categorias.map(({ _id, title, icons }) => (
            <li
              key={_id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between"
            >
              {title}
              {icons && (
                <span
                  onClick={() => toggleSubCat(_id)}
                  className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                >
                  <ImPlus />
                </span>
              )}
              {/* Ejemplo para subcategorías visibles */}
              {mostrarSubCat[_id] && (
                <ul className="pl-4 text-xs text-primeColor">
                  <li>Subcategoría 1</li>
                  <li>Subcategoría 2</li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categoria;
