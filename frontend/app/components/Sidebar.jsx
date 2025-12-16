"use client";
import { useState } from "react";
import "../globals.css";
import Link from "next/link";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen(!open);

  return (
    <>
      <button className="icon_btn" onClick={toggleSidebar}>
            <img src="/menu.png" alt="menu" width={38} height={38}/>
      </button>

      {open && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
      
      <div className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Menú</h2>
          <button className="close-btn" onClick={toggleSidebar}>×</button>
        </div>

        <ul className="sidebar-list">
          <Link href="/">
            <button className="sidebar-item" onClick={toggleSidebar}>Inicio</button>
          </Link>
          <Link href="/mostrarEstadoHabitaciones">
            <button className="sidebar-item" onClick={toggleSidebar}>Estado de las Habitaciones</button>
          </Link>
          <Link href="/reservarHabitacion">
            <button className="sidebar-item" onClick={toggleSidebar}>Reservar una Habitacion</button>
          </Link>
          <Link href="/cancelarReserva">
            <button className="sidebar-item" onClick={toggleSidebar}>Cancelar una Reserva</button>
          </Link>
          <Link href="/darDeAltaHuesped">
            <button className="sidebar-item" onClick={toggleSidebar}>Dar de Alta un Huesped</button>
          </Link>
          <Link href="/gestionarHuesped">
            <button className="sidebar-item" onClick={toggleSidebar}>Buscar Huéspedes</button>
          </Link>
          <Link href="/facturar">
            <button className="sidebar-item" onClick={toggleSidebar}>Facturar una estadía</button>
          </Link>
        </ul>
      </div>
    </>
  );
}
