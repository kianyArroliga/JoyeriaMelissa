import React from "react";
import Category from "@/components/ui/pageProps/shopPage/filtrarPor/Category";
import Precio from "@/components/ui/pageProps/shopPage/filtrarPor/Precio";
import NavTitle from "@/components/ui/pageProps/shopPage/filtrarPor/NavTitle";
import Piedras from "@/components/ui/pageProps/shopPage/filtrarPor/Piedras";
import TallaDedo from "@/components/ui/pageProps/shopPage/filtrarPor/TallaDedo";

const NavLatTienda = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Category icons={false} />
      <NavTitle />
      <Precio />
      <TallaDedo />
      <Piedras />
    </div>
  );
};

export default NavLatTienda;
