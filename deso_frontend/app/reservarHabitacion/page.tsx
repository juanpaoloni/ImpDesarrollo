"use client";

import "../globals.css";
import "./formReservarHabitacion.css"; // archivo CSS renombrado
import { generarFechas, parseFechaSinOffsetStr , parseFechaSinOffset} from "./utilsReservarHabitaciones";
import { useState, useEffect } from "react";
import { validarRangoFechas, validarFormatoFecha } from "../components/Validaciones";
import { useRouter } from "next/navigation";

type FormState = {
  fechaInicio: string;
  fechaFin: string;
  tipoHabitacion: string;
};

export default function SeleccionarHabitaciones() {
  // STATES
  const [err, setError] = useState({ mensaje: "" });
  const [form, setForm] = useState<FormState>({
    fechaInicio: "",
    fechaFin: "",
    tipoHabitacion: "",
  });

  const [filas, setFilas] = useState<Date[]>([]);
  const [columnas, setColumnas] = useState<string[]>([]); // números de habitación
  const [estadoHabitaciones, setEstadoHabitaciones] = useState<any[]>([]);
  const [seleccion, setSeleccion] = useState<{ [numHab: string]: Set<string> }>({});

  const router = useRouter();

  // Limpia selección cuando cambian filas/columnas (nueva búsqueda)
  useEffect(() => {
    setSeleccion({});
  }, [filas.length, columnas.length]);

  // Optional: ver cambios en seleccion para debug
  useEffect(() => {
    // console.log("seleccion changed", seleccion);
  }, [seleccion]);

  const handleAceptar = async () => {
    try {
      const seleccionReserva = Object.fromEntries(
        Object.entries(seleccion).map(([numHab, fechasSet]) => [
          Number(numHab),
          Array.from(fechasSet).sort(),
        ])
      );

      const payload = { seleccionReserva };

      // Convertimos a JSON para mandarlo en la URL
      const payloadString = encodeURIComponent(JSON.stringify(payload));

      router.push(
        `/mostrarListaReserva?data=${payloadString}`
      );

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSeleccion = (numHab: string, fechaStr: string) => {
    setSeleccion((prev) => {
      const copia: { [k: string]: Set<string> } = { ...prev };
      const setActual = copia[numHab] ? new Set(copia[numHab]) : new Set<string>();

      if (setActual.has(fechaStr)) {
        setActual.delete(fechaStr);
      } else {
        setActual.add(fechaStr);
      }

      copia[numHab] = setActual; // asigno la nueva Set (nueva referencia)
      return copia;
    });
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

    try {
      const res = await fetch(
        `http://localhost:8080/habitaciones/estado?tipo=${form.tipoHabitacion}&fechaDesde=${form.fechaInicio}&fechaHasta=${form.fechaFin}`
      );

      const data = await res.json();

      setEstadoHabitaciones(data);

      // columnas = lista de números de habitación
      const nums = data.map((h: any) => String(h.numeroHabitacion));
      setColumnas(nums);

      // Limpiamos selección previa (ya cubierto por useEffect, pero por si acaso)
      setSeleccion({});
    } catch (err) {
      console.error(err);
      setEstadoHabitaciones([]);
      setColumnas([]);
    }
  };

  return (
    <main className="fondo">
      <h2 className="titulo">Reservar Habitación</h2>
      <div className="linea-corta"></div>
      <h1 className="subtitulo">
        Ingrese el rango de fechas y el tipo de habitación, luego seleccione las habitaciones que desea reservar
      </h1>
      <div className="contenedor-campos-labels-RH">
        <div className="contenedor-campos-RH">
          <form onSubmit={handleSubmit}>
            <div>
              <p className="label-RH">Fecha Desde</p>
              <input type="date" name="fechaInicio" value={form.fechaInicio} onChange={handleChange} />
            </div>

            <div>
              <p className="label-RH">Fecha Hasta</p>
              <input type="date" name="fechaFin" value={form.fechaFin} onChange={handleChange} />
            </div>

            <div>
              <p className="label-RH">Tipo de habitacion</p>
              <select name="tipoHabitacion" value={form.tipoHabitacion} onChange={handleChange}>
                <option value="">Cualquier Tipo</option>
                <option value="INDIVIDUAL_ESTANDAR">Individual Estándar</option>
                <option value="SUITE_DOBLE">Suite Doble</option>
                <option value="DOBLE_ESTANDAR">Doble Estándar</option>
                <option value="DOBLE_SUPERIOR">Doble Superior</option>
                <option value="SUPERIOR_FAMILY_PLAN">Superior Family Plan</option>
              </select>
            </div>

            <button className="btn-RH" type="submit">
              BUSCAR
            </button>
          </form>
        </div>
        {err.mensaje && <p className="error-RH">{err.mensaje}</p>}
      </div>

      <div className="tabla-contenedor-principal-RH">
        {filas.length > 0 && columnas.length > 0 && (
          <div className="tabla-contenedor-RH">
            <table className="tabla-RH">
              <thead>
                <tr>
                  <th className="tabla-header-RH">Fecha</th>
                  {columnas.map((numHab, i) => (
                    <th className="tabla-header-RH" key={i}>
                      Hab {numHab}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="tbody-animado-RH">
                {filas.map((fecha, i) => {
                  // Asegurate que parseFechaSinOffset devuelva exactamente la key usada en estadoPorFecha
                  const fechaStr = parseFechaSinOffset(fecha);

                  return (
                    <tr className="tabla-fila-RH" key={i}>
                      <td>{fecha.toLocaleDateString("es-AR")}</td>

                      {estadoHabitaciones.map((hab, j) => {
                        // estadoPorFecha debe contener keys como fechaStr
                        const estado = hab.estadoPorFecha?.[fechaStr] ?? "LIBRE";
                        const numHab = String(hab.numeroHabitacion);
                        const seleccionada = seleccion[numHab]?.has(fechaStr);

                        // SOLO permitir toggle si la celda está LIBRE (disponible)
                        const esSeleccionable = estado === "LIBRE" || estado === "DISPONIBLE";

                        return (
                          <td
                            key={`${i}-${j}-${numHab}`}
                            className={`td-${estado}-RH ${seleccionada ? "td-seleccionada" : ""} ${!esSeleccionable ? "td-no-seleccionable" : ""}`}
                            onClick={() => {
                              if (esSeleccionable) toggleSeleccion(numHab, fechaStr);
                            }}
                          >
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

      <div style={{ textAlign: "center", marginTop: 0 }}>
        <button onClick={handleAceptar} className="btn2-RH" style={{ marginTop: "20px" }}>
          ACEPTAR
        </button>
      </div>
    </main>
  );
}
