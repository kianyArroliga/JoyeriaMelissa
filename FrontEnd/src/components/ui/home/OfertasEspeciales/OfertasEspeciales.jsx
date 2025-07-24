import React, { useEffect, useState } from "react";
import axios from "axios";
import Heading from "../Products/Heading";
import Product from "../Products/Product";

const OfertasEspeciales = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/clientes/catalogo/ofertas");
        console.log("Productos cargados:", res.data);
        setProductos(res.data);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };
    obtenerProductos();
  }, []);

  return (
    <div className="w-full pb-20">
      <Heading heading="Ofertas Especiales" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {productos.map((producto) => (
          <Product
            key={producto.idProducto}
            idProducto={producto.idProducto}
            nombreProducto={producto.nombreProducto}
            descripcion={producto.descripcion}
            precio={producto.precio}
            precioEspecial={producto.precioEspecial}
            image_url={producto.image_url}
            nombreMaterial={producto.nombreMaterial}
            destacado={producto.destacado}
            imagen_url = { producto.imagen_url }
          />
        ))}
      </div>
    </div>
  );
};

export default OfertasEspeciales;