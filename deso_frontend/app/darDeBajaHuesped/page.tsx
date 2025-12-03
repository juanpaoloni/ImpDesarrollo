"use client";

import "../globals.css"
import "./formDarDeBaja.css"
import Navbar from "../components/Navbar.jsx"

import { useState } from "react";

export default function darDeBaja() {
  const [form, setForm] = useState({
      tipoDocumento: "DNI",
      numeroDocumento: "",
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value}));
  }

  const handleRequest = async (e) => {
    e.preventDefault();

    try{
      const response = await fetch(  
        `http://localhost:8080/huespedes/darDeBaja/${form.tipoDocumento}/${form.numeroDocumento}`,
        {
          method: "DELETE",
        }
      );

      if(!response.ok){
        throw new Error("No se pudo dar de baja el huesped.");
      }

      alert("Huesped eliminado con exito.");

      setForm({
        numeroDocumento:"",
        tipoDocumento:"DNI",
      })

    } catch(error){
      console.error(error);
      alert("No se pudo dar de baja el huesped."); 
  }

  }

  return (
    <main className="fondo">
      <h1 className="titulo">Dar de baja Huesped</h1>
      <h3 className="subtitulo">Ingrese el documento del huésped a dar de baja</h3>
      <form onSubmit={handleRequest}>
        <div className="contenedor-campos">
          <select name="tipoDocumento" value={form.tipoDocumento} onChange={handleChange}>
                <option value="DNI">DNI</option>
                <option value="LE">LE</option>
                <option value="LC">LC</option>
                <option value="PASAPORTE">PASAPORTE</option>
                <option value="OTRO">OTRO</option>
          </select>
          <input name="numeroDocumento" value={form.numeroDocumento} onChange={handleChange} placeholder="Numero de documento" />

          <button type="submit" className="btn">
            Dar de Baja
          </button>
        </div>
      </form>
    </main>
  );
}
