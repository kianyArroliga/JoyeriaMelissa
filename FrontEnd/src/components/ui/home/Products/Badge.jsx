import React from "react";

const Badge = ({ text }) => {
  return (
    <div className="bg-[#a1887f] w-[100px] h-[35px] text-white flex justify-center items-center text-sm font-medium tracking-wide uppercase hover:bg-black duration-300 cursor-pointer rounded-full shadow-md">
      {text}
    </div>
  );
};

export default Badge;
