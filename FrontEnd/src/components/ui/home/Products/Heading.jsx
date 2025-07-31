import React from "react";

const Heading = ({ heading }) => {
  return (
    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#4e342e] pb-6 tracking-wide uppercase">
      {heading}
    </div>
  );
};

export default Heading;
