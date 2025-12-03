"use client";

import "../globals.css"
import {validarNumerico, validarTexto, validarDocumento, validarTelefono, validarEmail, validarCuit } from "../components/Validaciones.jsx"
import "./formHuesped.css"; 
import { useState } from "react";

export default function darDeAlta() {

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    cuit: "",
    tipoDocumento: "DNI",
    numeroDocumento: "",
    posicionIVA: "CONSUMIDOR_FINAL",
    fechaNacimiento: "",
    nacionalidad: "",
    email: "",
    telefono: "",
    ocupacion: "",
    direccion: {
      calle: "",
      numero: "",
      departamento: "",
      piso: "",
      codigoPostal: "",
      localidad: "",
      provincia: "",
      pais: "",
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("dir_")) {
      const key = name.replace("dir_", "");
      setForm((prev) => ({
        ...prev,
        direccion: { ...prev.direccion, [key]: value }
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validarDocumento(form.tipoDocumento, form.numeroDocumento)) {
    throw new Error("Número de documento inválido para el tipo seleccionado.");
  }

  if (!validarEmail(form.email)) {
    throw new Error("Email inválido.");
  }

  if (!validarTexto(form.nombre)) {
    throw new Error("Nombre inválido. Solo se permiten letras y espacios.");
  }

  if (!validarTexto(form.apellido)) {
    throw new Error("Apellido inválido. Solo se permiten letras y espacios.");
  }

  if (!validarCuit(form.cuit)) {
    throw new Error("CUIT inválido. Debe tener formato 00-00000000-0.");
  }

  if (!validarTexto(form.nacionalidad)) {
    throw new Error("Nacionalidad inválida. Solo se permiten letras y espacios.");
  }

  if (!validarTelefono(form.telefono)) {
    throw new Error("Teléfono inválido. Debe tener formato internacional, opcional '+'.");
  }

  if (!validarTexto(form.ocupacion)) {
    throw new Error("Ocupación inválida. Solo se permiten letras y espacios.");
  }


  try {
    const response = await fetch("http://localhost:8080/huespedes/darDeAlta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error("Error al guardar el huésped");
    }

    const data = await response.json();
    console.log("Guardado correctamente:", data);

    alert("Huésped guardado con éxito");

    // Limpiar formulario
    setForm({
      nombre: "",
      apellido: "",
      cuit: "",
      tipoDocumento: "DNI",
      numeroDocumento: "",
      posicionIVA: "CONSUMIDOR_FINAL",
      fechaNacimiento: "",
      nacionalidad: "",
      email: "",
      telefono: "",
      ocupacion: "",
      direccion: {
        calle: "",
        numero: "",
        departamento: "",
        piso: "",
        codigoPostal: "",
        localidad: "",
        provincia: "",
        pais: "",
      }
    });

  } catch (error) {
    console.error("Error en el guardado:", error);
    alert("Hubo un problema al guardar.");
  }
};


  return (
    <main className="form-container">
      <h1 className="titulo">Dar de Alta Huesped</h1>

      <form className="form" onSubmit={handleSubmit}>
        <h2 className="subtitulo">Datos del Huesped</h2>

        <div className="grid">
          <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" />
          <input name="apellido" value={form.apellido} onChange={handleChange} placeholder="Apellido" />
          <input name="cuit" value={form.cuit} onChange={handleChange} placeholder="CUIT" />

          {/* SELECT TIPO DOCUMENTO */}
          <select name="tipoDocumento" value={form.tipoDocumento} onChange={handleChange}>
            <option value="DNI">DNI</option>
            <option value="LE">LE</option>
            <option value="LC">LC</option>
            <option value="PASAPORTE">PASAPORTE</option>
            <option value="OTRO">OTRO</option>
          </select>

          <input name="numeroDocumento" value={form.numeroDocumento} onChange={handleChange} placeholder="Número Documento" />

          {/* SELECT POSICION IVA */}
          <select name="posicionIVA" value={form.posicionIVA} onChange={handleChange}>
            <option value="CONSUMIDOR_FINAL">Consumidor Final</option>
            <option value="EXENTO">Exento</option>
            <option value="MONOTRIBUTISTA">Monotributista</option>
            <option value="RESPONSABLE_INSCRIPTO">Responsable Inscripto</option>
          </select>

          <input type="date" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} />
          <input name="nacionalidad" value={form.nacionalidad} onChange={handleChange} placeholder="Nacionalidad" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
          <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" />
          <input name="ocupacion" value={form.ocupacion} onChange={handleChange} placeholder="Ocupación" />
        </div>

        <h2 className="subtitulo">Dirección</h2>

        <div className="grid">
          <input name="dir_calle" value={form.direccion.calle} onChange={handleChange} placeholder="Calle" />
          <input name="dir_numero" value={form.direccion.numero} onChange={handleChange} placeholder="Número" />
          <input name="dir_departamento" value={form.direccion.departamento} onChange={handleChange} placeholder="Departamento" />
          <input name="dir_piso" value={form.direccion.piso} onChange={handleChange} placeholder="Piso" />
          <input name="dir_codigoPostal" value={form.direccion.codigoPostal} onChange={handleChange} placeholder="Código Postal" />
          <input name="dir_localidad" value={form.direccion.localidad} onChange={handleChange} placeholder="Localidad" />
          <input name="dir_provincia" value={form.direccion.provincia} onChange={handleChange} placeholder="Provincia" />
          <input name="dir_pais" value={form.direccion.pais} onChange={handleChange} placeholder="País" />
        </div>

        <button type="submit" className="btn">Guardar Huesped</button>
      </form>
    </main>
  );
}
