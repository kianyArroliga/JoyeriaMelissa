import React from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "@/components/ui/designLayouts/Image";
import Badge from "@/components/ui/home/Products/Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { agregarAlCarrito } from "@/redux/carritoSlice";

const Product = (props) => {
  const dispatch = useDispatch();
  const _id = props.productName;
  const idString = (str) => String(str).toLowerCase().split(" ").join("");
  const rootId = idString(_id);

  const navigate = useNavigate();
  const productItem = props;

  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: productItem,
      },
    });
  };

  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden shadow-md border border-[#e5e5e5] rounded-md">
        <div>
          <Image className="w-full h-full object-cover" imgSrc={props.img} />
        </div>
        <div className="absolute top-6 left-6">
          {props.badge && <Badge text="Nuevo" />}
        </div>
        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li
              onClick={() =>
                dispatch(
                  agregarAlCarrito({
                    _id: props._id,
                    name: props.productName,
                    quantity: 1,
                    image: props.img,
                    badge: props.badge,
                    price: props.price,
                    colors: props.color,
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
            {props.productName}
          </h2>
          <p className="text-[#767676] text-[14px]">${props.price}</p>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{props.color}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
