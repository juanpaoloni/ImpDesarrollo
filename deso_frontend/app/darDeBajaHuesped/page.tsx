"use client";

import "../globals.css";
import "./formDarDeBaja.css";
import Navbar from "../components/Navbar.jsx";
import { useState } from "react";

type Huesped = {
  nombre: string;
  apellido: string;
  tipoDocumento: string;
  numeroDocumento: string;
};

export default function darDeBaja() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    tipoDocumento: "DNI",
    numeroDocumento: "",
  });


  const [error, setError] = useState();
  const [filasEliminadas, setFilasEliminadas] = useState<string[]>([]);
  const [huespedes, setHuespedes] = useState<Huesped[]>([]);
  const [huespedSeleccionado, setHuespedSeleccionado] = useState<{
    tipoDocumento: string;
    numeroDocumento: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBuscar = async (e: React.FormEvent) => {
    e.preventDefault();
    setHuespedSeleccionado(null);

    // Marcar todas las filas actuales para animación de desaparición
    const ids = huespedes.map(h => `${h.tipoDocumento}-${h.numeroDocumento}`);
    setFilasEliminadas(ids);

    // Esperar que termine la animación antes de reemplazar los datos
    setTimeout(async () => {
      const params = new URLSearchParams();
      if (form.nombre) params.append("nombre", form.nombre);
      if (form.apellido) params.append("apellido", form.apellido);
      if (form.tipoDocumento) params.append("tipoDocumento", form.tipoDocumento);
      if (form.numeroDocumento) params.append("nroDocumento", form.numeroDocumento);

      try {
        const res = await fetch(`http://localhost:8080/huespedes/buscarHuespedes?${params.toString()}`);
        const data = await res.json();
        setHuespedes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error al buscar huéspedes:", err);
        setHuespedes([]);
      }

      // limpiar las filas eliminadas
      setFilasEliminadas([]);
    }, 300); // duración de la animación
  };


  const handleDarDeBaja = async () => {
    try{
      if (!huespedSeleccionado?.tipoDocumento || !huespedSeleccionado?.numeroDocumento) {
        console.error("No hay huésped seleccionado");
        throw new Error("No hay un huesped seleccionado.");
      }

      const result = await fetch(`http://localhost:8080/huespedes/darDeBaja/${huespedSeleccionado.tipoDocumento}/${huespedSeleccionado.numeroDocumento}`,
        {
          method: "DELETE"
        }
      );

      if(!result.ok) throw new Error("No se pudo dar de baja al huesped.");

      const mensaje = await result.text();
      alert(mensaje);

      setHuespedes([]);
      setHuespedSeleccionado(null);

    }catch(error){
      alert(error);
    }
  }

  // A partir de aca empieza el return
  //
  //
  return (
    <main className="fondo">
      <h1 className="titulo">Dar de baja Huesped</h1>
      <h3 className="subtitulo">Ingrese los datos del huesped a dar de baja y seleccionelo para continuar</h3>


      <div className="contenedor-principal">
        <div>
          <form onSubmit={handleBuscar}>
            <div className="contenedor-campos">
              <select name="tipoDocumento" value={form.tipoDocumento} onChange={handleChange}>
                <option value=""></option>
                <option value="DNI">DNI</option>
                <option value="LE">LE</option>
                <option value="LC">LC</option>
                <option value="PASAPORTE">PASAPORTE</option>
                <option value="OTRO">OTRO</option>
              </select>
              <input
                name="numeroDocumento"
                value={form.numeroDocumento}
                onChange={handleChange}
                placeholder="Número de documento"
              />

              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre"
              />

              <input
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                placeholder="Apellido"
              />

              <button type="submit" className="btn">
                BUSCAR
              </button>
            </div>
          </form>
        </div>


        <div className="tabla-contenedor">

          <table className="tabla">
            <thead>
              <tr>
                <th className="tabla-header-izquierdo">Nombre</th>
                <th className="tabla-header">Apellido</th>
                <th className="tabla-header">Tipo Documento</th>
                <th className="tabla-header-derecho">Número Documento</th>
              </tr>
            </thead>
            <tbody>
              {huespedes.length > 0 ? (
                huespedes.map((h, index) => (
                  <tr
                    key={index}
                    data-numero={h.numeroDocumento}
                    data-tipo={h.tipoDocumento}
                    onClick={() =>
                      setHuespedSeleccionado({
                        tipoDocumento: h.tipoDocumento,
                        numeroDocumento: h.numeroDocumento,
                      })
                    }
                    className={`
                      ${huespedSeleccionado?.numeroDocumento === h.numeroDocumento &&
                      huespedSeleccionado?.tipoDocumento === h.tipoDocumento
                        ? "tabla-seleccionado"
                        : "tabla-fila"}
                      fila-animada
                      ${filasEliminadas.includes(`${h.tipoDocumento}-${h.numeroDocumento}`) ? "ocultar" : ""}
                    `}
                  >

                    <td className="tabla-columna">{h.nombre}</td>
                    <td className="tabla-columna">{h.apellido}</td>
                    <td className="tabla-columna">{h.tipoDocumento}</td>
                    <td className="tabla-columna">{h.numeroDocumento}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="tabla-noEncontrado">
                    No se encontraron huéspedes
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        </div>


      </div>

      <div className="contenedor-boton">
        <button className="btn" onClick={handleDarDeBaja} disabled={!huespedSeleccionado}>
          DAR DE BAJA
        </button>
      </div>
    </main>
  );
}
