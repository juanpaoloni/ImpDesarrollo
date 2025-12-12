"use client";

import "../globals.css";
import "./formMostrarHabitaciones.css"; // archivo CSS renombrado
import { generarFechas, parseFechaSinOffsetStr , parseFechaSinOffset} from "../components/utilsMostrarHabitaciones";
import { useState } from "react";
import { validarRangoFechas, validarFormatoFecha } from "../components/Validaciones";
type FormState = {
  fechaInicio: string;
  fechaFin: string;
  tipoHabitacion: string;
};


export default function MostrarEstadoHabitaciones() {

  // STATES

  const [isLoading, setIsLoading] = useState(false);

  const [err, setError] = useState({
    mensaje:"",
  });
  const [form, setForm] = useState<FormState>({
    fechaInicio: "",
    fechaFin: "",
    tipoHabitacion: "",
  });

  const [filas, setFilas] = useState<Date[]>([]);
  const [columnas, setColumnas] = useState<string[]>([]);  // números de habitación
  const [estadoHabitaciones, setEstadoHabitaciones] = useState<any[]>([]);


  // METODOS
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({ mensaje: "" });

    if (!validarFormatoFecha(form.fechaInicio)) {
      setError({ mensaje: "Por favor, completar la fecha de inicio." });
      return;
    }

    if (!validarFormatoFecha(form.fechaFin)) {
      setError({ mensaje: "Por favor, completar la fecha de fin." });
      return;
    }

    if (!validarRangoFechas(form.fechaInicio, form.fechaFin)) {
      setError({ mensaje: "La fecha inicial es posterior a la final." });
      return;
    }

    const fechas = generarFechas(form.fechaInicio, form.fechaFin);
    setFilas(fechas);

    setIsLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8080/habitaciones/estado?tipo=${form.tipoHabitacion}&fechaDesde=${form.fechaInicio}&fechaHasta=${form.fechaFin}`
      );

      const data = await res.json();

      setEstadoHabitaciones(data);

      // columnas = lista de números de habitación
      const nums = data.map((h: any) => String(h.numeroHabitacion));
      setColumnas(nums);

    } catch (err) {
      console.error(err);
      setEstadoHabitaciones([]);
      setColumnas([]);
    }

    setIsLoading(false);

  };


  return (
    <main className="fondo">
      <h2 className="titulo">Mostrar estado de las habitaciones</h2>
      <div className="linea-corta"></div>
      <h1 className="subtitulo">
        Ingrese el rango de fechas y el tipo de habitación para ver el estado de las mismas
      </h1>
      <div className="contenedor-campos-labels-MEH">

        <div className="contenedor-campos-MEH">
          <form onSubmit={handleSubmit}>
            <div>
              <p className="label-MEH">Fecha Desde</p>
              <input
                type="date"
                name="fechaInicio"
                value={form.fechaInicio}
                onChange={handleChange}
              />
            </div>

            <div>
              <p className="label-MEH">Fecha Hasta</p>
              <input
                type="date"
                name="fechaFin"
                value={form.fechaFin}
                onChange={handleChange}
              />
            </div>

            <div>
              <p className="label-MEH">Tipo de habitacion</p>
              <select
                name="tipoHabitacion"
                value={form.tipoHabitacion}
                onChange={handleChange}
              >
                <option value="">Cualquier Tipo</option>
                <option value="INDIVIDUAL_ESTANDAR">Individual Estándar</option>
                <option value="SUITE_DOBLE">Suite Doble</option>
                <option value="DOBLE_ESTANDAR">Doble Estándar</option>
                <option value="DOBLE_SUPERIOR">Doble Superior</option>
                <option value="SUPERIOR_FAMILY_PLAN">Superior Family Plan</option>
              </select>
            </div>

            <button className={`btn-MEH ${isLoading ? "cargando" : ""}`}  type="submit" disabled={isLoading}>
              {isLoading ? "BUSCANDO..." : "BUSCAR"}
            </button>
          </form>
        </div>
        {err.mensaje &&  (
        <p className="error-MEH">{err.mensaje}</p>
        )}
      </div>
      
      <div className="tabla-contenedor-principal-MEH">
      {filas.length > 0 && columnas.length > 0 && (
        <div className="tabla-contenedor-MEH">
          <table className="tabla-MEH">
            <thead>
              <tr>
                <th className="tabla-header-MEH">Fecha</th>
                {columnas.map((numHab, i) => (
                  <th className="tabla-header-MEH" key={i}>Hab {numHab}</th>
                ))}
              </tr>
            </thead>

            <tbody className="tbody-animado-MEH">
              {filas.map((fecha, i) => {
                const fechaStr = parseFechaSinOffset(fecha);

                return (
                  <tr className="tabla-fila-MEH" key={i}>
                    <td>{fecha.toLocaleDateString("es-AR")}</td>

                    {estadoHabitaciones.map((hab, j) => {
                      const estado = hab.estadoPorFecha[fechaStr] || "LIBRE";
                      
                      return (
                        <td key={j} className={`td-${estado}`}>
                          {estado}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </main>
  );
}
