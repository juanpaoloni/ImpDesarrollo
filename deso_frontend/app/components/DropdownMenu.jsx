"use client"

import { useState, useRef, useEffect } from "react";
import "../globals.css"; 

export default function DropdownMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar menú al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown-container" ref={menuRef}>
      {/* Botón del engranaje */}
      <button
        onClick={() => setOpen(!open)}
        className="icon_btn"
      >
        <img src="/settings.png" alt="settings" width={38} height={38}/>
      </button>

      {/* Contenido */}
      {open && (
        <div className="dropdown-menu">
          <div className="dropdown-item">Perfil</div>
          <div className="dropdown-item">Configuración</div>
          <div className="dropdown-item">Cerrar sesión</div>
        </div>
      )}
    </div>
  );
}
