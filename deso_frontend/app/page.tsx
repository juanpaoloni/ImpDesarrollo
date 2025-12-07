"use client";

import "./globals.css";
import Link from "next/link";

export default function MenuPrincipal() {
  return (
    <main className="fondo">

      <h1 className="titulo">MENU PRINCIPAL</h1>
      <div className="linea-corta"></div> 
      <h3 className="subtitulo">¿Que desea hacer?</h3>

      <div className="contenedor">

        <Link href="/mostrarEstadoHabitaciones">
          <button className="boton">
            <img src="/estadoHab.png" className="iconos_boton" />
             <h3 className="letra_btn">Ver Habitaciones</h3>
          </button>
        </Link>

        <Link href="/darDeBajaHuesped">
          <button className="boton">
            <img src="/darbaja.png" className="iconos_boton"/>
             <h3 className="letra_btn">Dar de Baja un Huesped</h3>
          </button>
        </Link>

        <Link href="/darDeAltaHuesped">
          <button className="boton">
            <img src="/daralta.png" className="iconos_boton"/>
             <h3 className="letra_btn">Dar de Alta un Huesped</h3>
          </button>
        </Link>

        <Link href="/reservarHabitacion">
          <button className="boton">
            <img src="/calendario.png" className="iconos_boton" />
             <h3 className="letra_btn">Reservar una Habitacion</h3>
          </button>
        </Link>

        <Link href="/cancelarReserva">
          <button className="boton">
            <img src="/cancelar.png" className="iconos_boton" />
             <h3 className="letra_btn">Cancelar Reserva</h3>
          </button>
        </Link>

        <Link href="/facturar">
          <button className="boton">
            <img src="factura.png" className="iconos_boton" />
             <h3 className="letra_btn">Facturar</h3>
          </button>
        </Link>

      </div>
    </main>
  );
}
