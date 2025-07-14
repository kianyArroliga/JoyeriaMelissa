import React from "react";
import Slider from "react-slick";
import Heading from "@/components/ui/Productos/Encabezado";
import Producto from "@/components/ui/Productos/Producto";
import SampleNextArrow from "./FlechaSiguiente";
import SamplePrevArrow from "./SamplePrevArrow";

import oro1 from "@/assets/images/products/Anillos/Oro/oro1.jpg";
import oro2 from "@/assets/images/products/Anillos/Oro/oro2.jpg";
import oro3 from "@/assets/images/products/Anillos/Oro/oro3.jpg";
import oro4 from "@/assets/images/products/Anillos/Oro/oro4.jpg";

const ColeccionNueva = () => {
  const configuracionSlider = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="w-full pb-16">
      <Heading heading="Colección Nueva" />
      <Slider {...configuracionSlider}>
        <div className="px-2">
          <Producto
            _id="20001"
            img={oro1}
            productName="Anillo con amatista natural"
            price="75.00"
            color="Oro 14K"
            badge={true}
            des="Anillo artesanal con piedra amatista montada sobre oro."
          />
        </div>
        <div className="px-2">
          <Producto
            _id="20002"
            img={oro2}
            productName="Anillo doble con topacios"
            price="82.00"
            color="Oro laminado"
            badge={false}
            des="Diseño moderno con topacios naturales y acabado brillante."
          />
        </div>
        <div className="px-2">
          <Producto
            _id="20003"
            img={oro3}
            productName="Anillo cruzado con esmeraldas"
            price="105.00"
            color="Oro"
            badge={true}
            des="Esmeraldas naturales en diseño entrelazado único."
          />
        </div>
        <div className="px-2">
          <Producto
            _id="20004"
            img={oro4}
            productName="Anillo minimalista con rubí"
            price="69.00"
            color="Oro"
            badge={false}
            des="Elegante y sutil, perfecto para uso diario o regalo."
          />
        </div>
      </Slider>
    </div>
  );
};

export default ColeccionNueva;
