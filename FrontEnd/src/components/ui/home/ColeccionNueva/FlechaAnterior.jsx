import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";

const FlechaAnterior = (props) => {
  const { onClick } = props;
  return (
    <div
      className="w-14 h-14 rounded-full text-white bg-black bg-opacity-40 hover:bg-opacity-100 duration-300 cursor-pointer flex justify-center items-center absolute z-10 top-[35%] left-2"
      onClick={onClick}
    >
      <span className="text-xl">
        <FaLongArrowAltLeft />
      </span>
    </div>
  );
};

export default FlechaAnterior;
