import React from "react";

const Badge = ({ text }) => {
  return (
    <div className="bg-[#a1887f] w-auto min-w-[100px] h-[35px] text-white flex justify-center items-center text-sm font-medium tracking-wide uppercase hover:bg-black duration-300 cursor-pointer rounded-full shadow-md px-3 sm:px-4">
      {text}
    </div>
  );
};

export default Badge;
