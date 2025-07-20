import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Flex from "@/components/ui/designLayouts/Flex";
import { paginationItems } from "@/constants";


const HeaderBottom = () => {
 const products = useSelector((state) => state.carrito?.productos ?? []);
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && ref.current.contains(e.target)) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    document.body.addEventListener("click", handler);
    return () => document.body.removeEventListener("click", handler);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = paginationItems.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          {/* Categorías */}
          <div
            onClick={() => setShow(!show)}
            ref={ref}
            className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
          >
            <HiOutlineMenuAlt4 className="w-5 h-5" />
            <p className="text-[14px] font-normal">Categorías</p>

            {show && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-36 z-50 bg-primeColor text-[#767676] p-4 pb-6"
              >
                {["Aretes", "Anillos", "Dijes y Cadenas", "Pulseras"].map((cat) => (
                  <li
                    key={cat}
                    className="text-gray-400 px-4 py-1 border-b border-gray-400 hover:text-white hover:border-b-white duration-300 cursor-pointer"
                  >
                    {cat}
                  </li>
                ))}
              </motion.ul>
            )}
          </div>

          {/* Buscador */}
          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              placeholder="Buscar productos aquí..."
            />
            <FaSearch className="w-5 h-5" />
            {searchQuery && (
              <div className="w-full absolute top-16 left-0 z-50 h-96 bg-white overflow-y-scroll shadow-2xl cursor-pointer">
                {filteredProducts.map((item) => (
                  <div
                    onClick={() =>
                      navigate(`/product/${item.productName.toLowerCase().replace(/\s/g, "")}`, {
                        state: { item },
                      }) & setSearchQuery("")
                    }
                    key={item._id}
                    className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3 px-4"
                  >
                    <img className="w-24" src={item.img} alt="Producto" />
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-lg">{item.productName}</p>
                      <p className="text-xs">{item.des}</p>
                      <p className="text-sm">
                        Precio:{" "}
                        <span className="text-primeColor font-semibold">
                          ${item.price}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Usuario y carrito */}
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            <div onClick={() => setShowUser(!showUser)} className="flex gap-1 items-center">
              <FaUser />
              <FaCaretDown />
            </div>
            {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] p-4 pb-6"
              >
                <Link to="/clientes/login">
                  <li className="text-gray-400 px-4 py-1 border-b border-gray-400 hover:text-white hover:border-b-white duration-300">
                    Iniciar sesión
                  </li>
                </Link>
                <Link to="/clientes/registro" onClick={() => setShowUser(false)}>
                  <li className="text-gray-400 px-4 py-1 border-b border-gray-400 hover:text-white hover:border-b-white duration-300">
                    Registrarse
                  </li>
                </Link>
                <Link to="/clientes/perfil">
                  <li className="text-gray-400 px-4 py-1 border-b border-gray-400 hover:text-white hover:border-b-white duration-300">
                    Perfil
                  </li>
                </Link>
              </motion.ul>
            )}
            <Link to="/carrito">
              <div className="relative">
                <FaShoppingCart />
                <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                  {products.length}
                </span>
              </div>
            </Link>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
