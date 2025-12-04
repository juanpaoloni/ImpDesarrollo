"use client";

import "../globals.css";
import "./formMostrarHabitaciones.css"; // archivo CSS renombrado
import { generarFechas, parseFechaSinOffset } from "./utilsMostrarHabitaciones";
import { useState } from "react";

type Habitacion = {
  numeroHabitacion: number;
};

type FormState = {
  fechaInicio: string;
  fechaFin: string;
  tipoHabitacion: string;
};

type ReservaResponse = {
  numeroHabitacion: number;
  fechaInicio: string;
  fechaFin: string;
};

type OcupacionResponse = {
  numeroHabitacion: number;
  fechaInicio: string;
  fechaFin: string;
};

type FueraDeServicioResponse = {
  numeroHabitacion: number;
  fechaInicio: string;
  fechaFin: string;
};

export default function MostrarEstadoHabitaciones() {

  // STATES
  const [form, setForm] = useState<FormState>({
    fechaInicio: "",
    fechaFin: "",
    tipoHabitacion: "",
  });

  const [ocupaciones, setOcupaciones] = useState<OcupacionResponse[]>([]);
  const [fueraDeServicio, setFueraDeServicio] = useState<FueraDeServicioResponse[]>([]);
  const [reservas, setReservas] = useState<ReservaResponse[]>([]);
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [filas, setFilas] = useState<Date[]>([]);
  const [columnas, setColumnas] = useState<string[]>([]);

  // METODOS
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  
  const obtenerEstado = (fecha: Date, numeroHabitacion: string) => {
    const estaReservada = reservas.some(r => {
      const inicio = parseFechaSinOffset(r.fechaInicio);
      const fin = parseFechaSinOffset(r.fechaFin);
      return r.numeroHabitacion === Number(numeroHabitacion) && fecha >= inicio && fecha <= fin;
    });

    const estaOcupada = ocupaciones.some(o => {
      const inicio = parseFechaSinOffset(o.fechaInicio);
      const fin = parseFechaSinOffset(o.fechaFin);
      return o.numeroHabitacion === Number(numeroHabitacion) && fecha >= inicio && fecha <= fin;
    });

    const estaFueraDeServicio = fueraDeServicio.some(fds => {
      const inicio = parseFechaSinOffset(fds.fechaInicio);
      const fin = parseFechaSinOffset(fds.fechaFin);
      return fds.numeroHabitacion === Number(numeroHabitacion) && fecha >= inicio && fecha <= fin;
    });

    if(estaFueraDeServicio) return "FDS";
    if (estaOcupada) return "OCUPADA";
    if (estaReservada) return "RESERVADA";
    
    return "LIBRE";
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fechas = generarFechas(form.fechaInicio, form.fechaFin);
    setFilas(fechas);

    try {
      const habitacionesRes = await fetch(
        `http://localhost:8080/habitaciones/obtenerPorTipo?tipo=${form.tipoHabitacion}`
      );
      const habs: Habitacion[] = await habitacionesRes.json();
      const listaHabitaciones = Array.isArray(habs) ? habs : [];
      setHabitaciones(listaHabitaciones);
      setColumnas(listaHabitaciones.map(h => `${h.numeroHabitacion}`));

      const reservasPorHabitaciones = await Promise.all(
        listaHabitaciones.map(async (h) => {
          const res = await fetch(
            `http://localhost:8080/reservas/obtenerPorHabitacion?numeroHabitacion=${h.numeroHabitacion}`
          );
          const data: ReservaResponse[] = await res.json();
          return data;
        })
      );

      const ocupacionesPorHabitaciones = await Promise.all(
        listaHabitaciones.map(async (h) => {
          const res = await fetch(
            `http://localhost:8080/ocupaciones/obtenerPorHabitacion?numeroHabitacion=${h.numeroHabitacion}`
          );
          return await res.json();
        })
      );

      const fueraDeServicioPorHabitaciones = await Promise.all(
        listaHabitaciones.map(async (h) => {
          const res = await fetch(
            `http://localhost:8080/fueraDeServicio/obtenerPorHabitacion?numeroHabitacion=${h.numeroHabitacion}`
          );
          return await res.json();
        })
      );

      setFueraDeServicio(fueraDeServicioPorHabitaciones.flat());
      setOcupaciones(ocupacionesPorHabitaciones.flat());
      const reservasPlanas = reservasPorHabitaciones.flat();
      setReservas(reservasPlanas);

    } catch (error) {
      console.error("Error:", error);
      setHabitaciones([]);
      setColumnas([]);
      setReservas([]);
      setOcupaciones([]);
    }
  };

  return (
    <main className="fondo">
      <h2 className="titulo">Mostrar estado de las habitaciones</h2>
      <h1 className="subtitulo">
        Ingrese el rango de fechas y el tipo de habitación para ver el estado de las mismas
      </h1>

      <div className="contenedor-campos-MEH">
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            name="fechaInicio"
            value={form.fechaInicio}
            onChange={handleChange}
          />
          <input
            type="date"
            name="fechaFin"
            value={form.fechaFin}
            onChange={handleChange}
          />

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

          <button className="btn-MEH" type="submit">
            BUSCAR
          </button>
        </form>
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
              {filas.map((fecha, i) => (
                <tr className="tabla-fila-MEH" key={i}>
                  <td>{fecha.toLocaleDateString("es-AR")}</td>
                  {columnas.map((numHab, j) => (
                    <td
                      key={j}
                      className={`td-${obtenerEstado(fecha, numHab).replace(" / ", "_")}`}
                    >
                      {/* Opcional: mantener texto para tooltip */}
                      {obtenerEstado(fecha, numHab)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </main>
  );
}
