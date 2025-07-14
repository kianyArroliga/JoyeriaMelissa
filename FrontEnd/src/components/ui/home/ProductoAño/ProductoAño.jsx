import React from "react";
import { Link } from "react-router-dom";
import { productOfTheYear } from "@/assets/images";
import ShopNow from "@/components/ui/designLayouts/buttons/ShopNow";
import Image from "@/components/ui/designLayouts/Image"; 


const ProductoAño = () => {
  return (
    <Link to="/shop">
      <div className="w-full h-80 mb-20 bg-[#f3f3f3] md:bg-transparent relative font-titleFont">
        <Image
          className="w-full h-full object-cover hidden md:inline-block"
          imgSrc={productOfTheYear}
        />
        <div className="w-full md:w-2/3 xl:w-1/2 h-80 absolute px-4 md:px-0 top-0 right-0 flex flex-col items-start gap-6 justify-center">
          <h1 className="text-3xl font-semibold text-primeColor">
            Producto del Año
          </h1>
          <p className="text-base font-normal text-primeColor max-w-[600px] mr-4">
            Este diseño ha conquistado los corazones con su elegancia atemporal
            y acabados artesanales únicos. Una joya que representa la esencia de nuestra marca.
          </p>
          <ShopNow />
        </div>
      </div>
    </Link>
  );
};

export default ProductoAño;
