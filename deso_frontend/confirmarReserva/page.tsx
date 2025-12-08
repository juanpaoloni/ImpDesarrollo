"use client";

import { useEffect, useState } from "react";

export default function ResumenSeleccion() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const stored = sessionStorage.getItem("reservaSeleccion");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  return (
    <main className="fondo">
      <h1 className="titulo">Reserva de Habitaciones</h1>
      <div className="linea-corta"></div>

      <div className="tabla-contenedor">
        <table className="tabla">
          <thead>
            <tr>
              <th>Nro Habitación</th>
              <th>Tipo de Habitación</th>
              <th>Ingreso</th>
              <th>Egreso</th>
            </tr>
          </thead>

          <tbody>
            {data.map((h, i) => (
              <tr key={i}>
                <td>{h.numeroHabitacion}</td>
                <td>{h.tipoHabitacion}</td>
                <td>{h.ingreso}</td>
                <td>{h.egreso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", gap: "50px", marginTop: "30px", justifyContent: "center" }}>
        <button className="btn-MEH">RECHAZAR</button>
        <button className="btn-MEH">ACEPTAR</button>
      </div>
    </main>
  );
}
