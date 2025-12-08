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
      // Build payload: array de { numeroHabitacion, fechasSeleccionadas }
      const seleccionReserva = Object.fromEntries(
        Object.entries(seleccion).map(([numHab, fechasSet]) => [
          Number(numHab),
          Array.from(fechasSet).sort(),
        ])
      );

      const payload = { seleccionReserva };

      console.log("Enviando payload:", payload);

      // Enviar al endpoint acordado
      const res = await fetch("http://localhost:8080/habitaciones/confirmarSeleccion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // intenta leer mensaje de error del backend
        const text = await res.text().catch(() => "");
        console.error("Backend error:", res.status, text);
        throw new Error("Error del backend");
      }

      const data = await res.json();

      // Guardamos los datos recibidos para la siguiente pantalla
      sessionStorage.setItem("confirmarReserva", JSON.stringify(data));

      // Navegamos a la pantalla donde se muestra la tabla final (con slash)
      router.push("/confirmarReserva");
    } catch (err) {
      console.error(err);
      alert("Hubo un error al enviar la selección. Revisa la consola para más detalles.");
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
      <h2 className="titulo">Seleccionar habitaciones</h2>
      <div className="linea-corta"></div>
      <h1 className="subtitulo">
        Ingrese el rango de fechas y el tipo de habitación para ver el estado de las mismas
      </h1>
      <div className="contenedor-campos-labels-MEH">
        <div className="contenedor-campos-MEH">
          <form onSubmit={handleSubmit}>
            <div>
              <p className="label-MEH">Fecha Desde</p>
              <input type="date" name="fechaInicio" value={form.fechaInicio} onChange={handleChange} />
            </div>

            <div>
              <p className="label-MEH">Fecha Hasta</p>
              <input type="date" name="fechaFin" value={form.fechaFin} onChange={handleChange} />
            </div>

            <div>
              <p className="label-MEH">Tipo de habitacion</p>
              <select name="tipoHabitacion" value={form.tipoHabitacion} onChange={handleChange}>
                <option value="">Cualquier Tipo</option>
                <option value="INDIVIDUAL_ESTANDAR">Individual Estándar</option>
                <option value="SUITE_DOBLE">Suite Doble</option>
                <option value="DOBLE_ESTANDAR">Doble Estándar</option>
                <option value="DOBLE_SUPERIOR">Doble Superior</option>
                <option value="SUPERIOR_FAMILY_PLAN">Superior Family Plan</option>
              </select>
            </div>

            <button className="btn-MEH" type="submit">
              BUSCAR
            </button>
          </form>
        </div>
        {err.mensaje && <p className="error-MEH">{err.mensaje}</p>}
      </div>

      <div className="tabla-contenedor-principal-MEH">
        {filas.length > 0 && columnas.length > 0 && (
          <div className="tabla-contenedor-MEH">
            <table className="tabla-MEH">
              <thead>
                <tr>
                  <th className="tabla-header-MEH">Fecha</th>
                  {columnas.map((numHab, i) => (
                    <th className="tabla-header-MEH" key={i}>
                      Hab {numHab}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="tbody-animado-MEH">
                {filas.map((fecha, i) => {
                  // Asegurate que parseFechaSinOffset devuelva exactamente la key usada en estadoPorFecha
                  const fechaStr = parseFechaSinOffset(fecha);

                  return (
                    <tr className="tabla-fila-MEH" key={i}>
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
                            className={`td-${estado} ${seleccionada ? "td-seleccionada" : ""} ${!esSeleccionable ? "td-no-seleccionable" : ""}`}
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

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button onClick={handleAceptar} className="btn-MEH" style={{ marginTop: "20px" }}>
          ACEPTAR
        </button>
      </div>
    </main>
  );
}
