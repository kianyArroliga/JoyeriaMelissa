import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { logo } from "@/assets/images";
import Image from "@/components/ui/designLayouts/Image";
import Flex from "@/components/ui/designLayouts/Flex";
import { navBarList } from "@/constants";

const Header = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [category, setCategory] = useState(false);
  const location = useLocation();

  // Lógica para mostrar el menú responsivo
  useEffect(() => {
    const ResponsiveMenu = () => {
      setShowMenu(window.innerWidth >= 768); // Ajustar la visibilidad según el tamaño de la pantalla
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
    return () => window.removeEventListener("resize", ResponsiveMenu);
  }, []);

  return (
    <div className="w-full h-20 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200">
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <Flex className="flex items-center justify-between h-full">
          <Link to="/">
            <Image className="w-20 object-cover" imgSrc={logo} />
          </Link>

          <div className="flex items-center justify-between w-full">
            {showMenu && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="hidden md:flex items-center gap-2 md:gap-4"
              >
                {navBarList.map(({ _id, title, link }) => (
                  <NavLink
                    key={_id}
                    to={link}
                    state={{ data: location.pathname.split("/")[1] }}
                    className="font-normal hover:font-bold text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 px-6 py-2 last:border-r-0"
                  >
                    <li>{title}</li>
                  </NavLink>
                ))}
              </motion.ul>
            )}

            {/* Botón hamburguesa */}
            <HiMenuAlt2
              onClick={() => setSidenav(!sidenav)}
              className="inline-block md:hidden cursor-pointer w-8 h-6 absolute top-6 right-4"
            />

            {/* Menú lateral (hamburguesa) */}
            {sidenav && (
              <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-[80%] h-full relative"
                >
                  <div className="w-full h-full bg-primeColor p-6">
                    <img className="w-28 mb-6" src={logo} alt="logo" />
                    <ul className="text-gray-200 flex flex-col gap-2 mb-4">
                      {navBarList.map((item) => (
                        <li
                          key={item._id}
                          className="text-lg hover:underline underline-offset-[4px] hover:text-white"
                        >
                          <NavLink
                            to={item.link}
                            state={{ data: location.pathname.split("/")[1] }}
                            onClick={() => setSidenav(false)}
                          >
                            {item.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>

                    <div>
                      <h1
                        onClick={() => setCategory(!category)}
                        className="flex justify-between text-base cursor-pointer items-center font-titleFont mb-2"
                      >
                        Navegar por categoría
                        <span className="text-lg">{category ? "-" : "+"}</span>
                      </h1>
                      {category && (
                        <motion.ul
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          className="text-sm flex flex-col gap-1"
                        >
                          <li className="headerSedenavLi">Aretes</li>
                          <li className="headerSedenavLi">Anillos</li>
                          <li className="headerSedenavLi">Dijes y Cadenas</li>
                          <li className="headerSedenavLi">Pulseras</li>
                        </motion.ul>
                      )}
                    </div>
                  </div>

                  <span
                    onClick={() => setSidenav(false)}
                    className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                  >
                    <MdClose />
                  </span>
                </motion.div>
              </div>
            )}
          </div>
        </Flex>
      </nav>
    </div>
  );
};

export default Header;
