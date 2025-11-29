"use client";

import "../globals.css"
import Navbar from "../components/Navbar.jsx"

import { useState } from "react";

export default function prueba() {
  const [a, setRta] = useState("");

  return (
    <main className="fondo">
      <Navbar />
      <h2 className="titulo">Mostrar estado de las habitaciones</h2>


    </main>
  );
}
