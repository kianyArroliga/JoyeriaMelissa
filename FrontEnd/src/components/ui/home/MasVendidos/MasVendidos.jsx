import React from "react";
import Encabezado from "../Productos/Encabezado";
import Producto from "../Productos/Producto";
import {
  productoUno,
  productoDos,
  productoTres,
  productoCuatro,
} from "@/assets/images/productosMasVendidos";

const MasVendidos = () => {
  return (
    <div className="w-full pb-20">
      <Encabezado heading="Nuestros Más Vendidos" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        <Producto
          _id="001"
          img={productoUno}
          productName="Anillo en oro 14K con turmalinas Paraiba"
          price="320.00"
          color="Oro"
          badge={true}
          des="Elegante anillo de oro 14K con turmalinas Paraiba de 3mm, diseño exclusivo."
        />
        <Producto
          _id="002"
          img={productoDos}
          productName="Aretes de plata y zafiros amarillos"
          price="110.00"
          color="Plata"
          badge={false}
          des="Aretes delicados con zafiros amarillos montados en plata fina."
        />
        <Producto
          _id="003"
          img={productoTres}
          productName="Cadena en plata y piedra lunar"
          price="95.00"
          color="Plata"
          badge={true}
          des="Hermosa cadena con colgante de piedra lunar, perfecta para uso diario o regalo."
        />
        <Producto
          _id="004"
          img={productoCuatro}
          productName="Pulsera de plata y amazonita natural"
          price="75.00"
          color="Plata"
          badge={false}
          des="Pulsera con perlas y amazonita natural, montada en plata artesanal."
        />
      </div>
    </div>
  );
};

export default MasVendidos;
