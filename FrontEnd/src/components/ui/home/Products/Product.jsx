import React from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "@/components/ui/designLayouts/Image";
import Badge from "@/components/ui/home/Products/Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import imagenPorDefecto from "@/assets/images/products/Anillos/Oro/oro1.jpg";
import { agregarAlCarrito } from "@/redux/carritoSlice";

const Product = (producto) => {
  const dispatch = useDispatch();
  const _id = producto.nombreProducto;
  const idString = (str) => String(str).toLowerCase().split(" ").join("");
  const rootId = idString(_id);
  const { precio, precioEspecial } = producto;

  const navigate = useNavigate();
  const productItem = producto;

  const handleProductDetails = () => {
    navigate(`/clientes/producto/${producto.idProducto}`, {
      state: {
        item: producto,
      },
    });
  };

  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden shadow-md border border-[#e5e5e5] rounded-md">
        <div>
          <img src={producto.image_url} alt={producto.nombreProducto} />
        </div>
        <div className="absolute top-6 left-6">
          {producto.destacado === 1 && <Badge text="Nuevo" />}
        </div>
        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li
              onClick={() =>
                dispatch(
                  agregarAlCarrito({
                    _id: producto.idProducto,
                    name: producto.nombreProducto,
                    quantity: 1,
                    image: producto.image_url,
                    price: producto.precioEspecial || producto.precio,
                  })
                )
              }
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 cursor-pointer pb-1 duration-300 w-full"
            >
              Añadir al carrito
              <span><FaShoppingCart /></span>
            </li>
            <li
              onClick={handleProductDetails}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 cursor-pointer pb-1 duration-300 w-full"
            >
              Ver detalles
              <span className="text-lg"><MdOutlineLabelImportant /></span>
            </li>
            <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 cursor-pointer pb-1 duration-300 w-full">
              Añadir a favoritos
              <span><BsSuitHeartFill /></span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 border-[#e5e5e5] px-4 rounded-b-md">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-semibold tracking-wide">
            {producto.nombreProducto}
          </h2>
          {precioEspecial ? (
            <div className="text-[#767676] text-[14px]">
              <span className="line-through mr-2">${precio} USD</span>
              <span className="text-rose-600">${precioEspecial} USD</span>
            </div>
          ) : (
            <p className="text-[#767676] text-[14px]">
              ${precio} USD
            </p>
          )}
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{producto.nombreMaterial}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;