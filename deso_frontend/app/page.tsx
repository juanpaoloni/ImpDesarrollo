"use client";

import "./globals.css";
import Link from "next/link";
import Navbar from "./components/Navbar";

import { useState } from "react";

export default function MenuPrincipal() {

  return (
    <main className="fondo">
      

      <h1 className="titulo">MENU PRINCIPAL</h1>
      <h3 className="subtitulo">Elija una de las siguientes opciones</h3>
      <div className="contenedor">
        <Link href="/mostrarEstadoHabitaciones">
        <button className="boton">
          Mostar estado Habitaciones
        </button>
        </Link>
        <Link href="/darDeBajaHuesped">
        <button className="boton">
          Dar de Baja Huesped
        </button>
        </Link>
        <Link href="/reservarHabitacion">
        <button className="boton">
          Reservar Habitacion
        </button>
        </Link>
        <Link href="/cancelarReserva">
        <button className="boton">
          Cancelar Reserva
        </button>
        </Link>
        <Link href="/facturar">
        <button className="boton">
          Facturar
        </button>
        </Link>
      </div>


    </main>
  );
}
