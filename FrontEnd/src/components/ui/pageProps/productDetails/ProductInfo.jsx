import React from "react";
import { useDispatch } from "react-redux";
import { agregarAlCarrito } from "@/redux/carritoSlice"; // Mejor usar alias

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.productName}</h2>
      <p className="text-xl font-semibold">${productInfo.price}</p>
      <p className="text-base text-gray-600">{productInfo.des}</p>
      <p className="text-sm text-gray-500">Sé la primera en dejar una reseña ✨</p>
      <p className="font-medium text-lg">
        <span className="font-normal">Material:</span> {productInfo.color}
      </p>

      <button
        onClick={() =>
          dispatch(
            agregarAlCarrito({
              _id: productInfo._id, // aquí era "id", pero en tu resto de código usás "_id"
              name: productInfo.productName,
              quantity: 1,
              image: productInfo.img,
              badge: productInfo.badge,
              price: productInfo.price,
              colors: productInfo.color,
            })
          )
        }
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Añadir al carrito
      </button>

      <p className="font-normal text-sm text-gray-600">
        <span className="text-base font-medium">Colección:</span> Joyería artesanal, Hecho a mano, Exclusivo Melissa Aguilar
      </p>
    </div>
  );
};

export default ProductInfo;
