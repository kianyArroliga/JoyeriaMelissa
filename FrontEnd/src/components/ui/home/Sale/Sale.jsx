import React from "react";
import { Link } from "react-router-dom";
import {
  saleImgOne,
  saleImgTwo,
  saleImgThree,
} from "@/assets/images"; 
import Image from "@/components/ui/designLayouts/Image";

const Sale = () => {
  return (
    <div className="py-20 flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-10">
      {/* Imagen grande destacada */}
      <div className="w-full md:w-2/3 lg:w-1/2 h-full">
        <Link to="/catalogo">
          <Image className="h-full w-full object-cover" imgSrc={saleImgOne} />
        </Link>
      </div>

      {/* Dos imágenes pequeñas de promoción */}
      <div className="w-full md:w-2/3 lg:w-1/2 h-auto flex flex-col gap-4 lg:gap-10">
        {[saleImgTwo, saleImgThree].map((img, index) => (
          <div key={index} className="h-1/2 w-full">
            <Link to="/catalogo">
              <Image className="h-full w-full object-cover" imgSrc={img} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sale;
