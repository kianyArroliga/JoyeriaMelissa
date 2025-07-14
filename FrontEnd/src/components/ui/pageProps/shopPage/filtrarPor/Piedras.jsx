import React from "react";
import NavTitle from "@/components/ui/pageProps/shopPage/filtrarPor/NavTitle";


const Piedras = () => {
  const piedras = [
    "Amazonita",
    "Ágata",
    "Alexandrita",
    "Citrino",
    "Diamante en bruto",
    "Esmeralda",
    "Labradorita",
    "Ópalo de fuego",
    "Perla",
    "Rubí",
    "Topacio Swiss Blue",
    "Topacio London Blue",
    "Turmalina",
    "Turquesa",
    "Zafiro",
    "Piedra lunar",
  ];

  return (
    <div className="w-full">
      <NavTitle title="Filtrar por piedra" icons={false} />
      <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
        {piedras.map((piedra, index) => (
          <li
            key={index}
            className="border-b-[1px] border-b-[#F0F0F0] pb-2 hover:text-primeColor hover:border-gray-400 duration-300 cursor-pointer"
          >
            {piedra}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Piedras;
