import React, { useState, useEffect } from "react";

const FiltrosCatalogo = ({ onFilterChange }) => {
  const [filtros, setFiltros] = useState({
    precio: "",
    categoria: [],
    piedra: [],
    material: [],
    tamano: [],
  });

  const [isOpen, setIsOpen] = useState({
    categoria: false,
    material: false,
    piedra: false,
    tamano: false,
    precio: false,
  });

  const handleChange = (key, value, isChecked) => {
    const updatedFilters = { ...filtros };

    // Añadir o quitar la opción seleccionada
    if (isChecked) {
      updatedFilters[key].push(value);
    } else {
      updatedFilters[key] = updatedFilters[key].filter((item) => item !== value);
    }

    setFiltros(updatedFilters);
    onFilterChange(updatedFilters);  // Pasar los filtros actualizados al componente padre
  };

  const toggleDropdown = (filterName) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [filterName]: !prevState[filterName],
    }));
  };

  const opciones = {
    precio: [
      { label: "Mayor a menor", value: "desc" },
      { label: "Menor a mayor", value: "asc" },
    ],
    categoria: ["Anillos", "Aretes", "Cadenas y Dijes", "Pulseras", "Conjuntos"],
    piedra: ["Natural", "Sintética"],
    material: ["Plata", "Plata bañada en oro"],
    tamano: ["5", "6", "7", "8"],
  };

  const renderFiltro = (nombre, opciones) => (
    <div className="border-b pb-3 mb-4">
      <h3
        className="font-semibold text-lg mb-2 capitalize cursor-pointer"
        onClick={() => toggleDropdown(nombre)}
      >
        {nombre}
      </h3>
      {isOpen[nombre] && (
        <div className="pl-4">
          {opciones.map((op) => (
            <div key={op.value || op} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                name={nombre}
                value={op.value || op}
                checked={filtros[nombre]?.includes(op.value || op)}
                onChange={(e) => handleChange(nombre, op.value || op, e.target.checked)}
              />
              <label>{op.label || op}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white p-4 w-full">
      {renderFiltro("precio", opciones.precio)}
      {renderFiltro("categoria", opciones.categoria)}
      {renderFiltro("piedra", opciones.piedra)}
      {renderFiltro("material", opciones.material)}
      {renderFiltro("tamano", opciones.tamano)}
    </div>
  );
};

export default FiltrosCatalogo;
