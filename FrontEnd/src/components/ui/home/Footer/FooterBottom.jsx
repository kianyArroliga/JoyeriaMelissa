import React from "react";
import { AiOutlineCopyright } from "react-icons/ai";

const FooterBottom = () => {
  return (
    <div className="w-full bg-[#F5F5F3] group">
      <div className="max-w-container mx-auto border-t-[1px] pt-10 pb-10 md:pb-20">
        <p className="text-titleFont font-normal text-center flex md:items-center justify-center text-lightText duration-200 text-sm px-4">
          <span
            className="text-md mr-[4px] mt-[2px] md:mt-0 inline-flex md:hidden"
            aria-hidden="true"
          >
            <AiOutlineCopyright />
          </span>
          {new Date().getFullYear()} | Melissa Aguilar Joyería Artesanal | Todos los derechos reservados
        </p>
      </div>
    </div>
  );
};

export default FooterBottom;
