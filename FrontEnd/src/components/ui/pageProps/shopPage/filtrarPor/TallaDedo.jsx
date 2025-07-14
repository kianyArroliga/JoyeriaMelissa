import React from "react";
import NavTitle from "@/components/ui/pageProps/shopPage/filtrarPor/NavTitle";


const TallaDedo = () => {
  const tallas = ["5", "6", "7", "8"];

  return (
    <div className="cursor-pointer">
      <NavTitle title="Filtrar por Talla de Dedo" icons={false} />
      <div className="font-titleFont">
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {tallas.map((talla, index) => (
            <li
              key={index}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
            >
              {talla}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TallaDedo;
