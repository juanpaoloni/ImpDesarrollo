"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "./mostrarLista.css";

export default function MostrarListaReserva() {
    const searchParams = useSearchParams();
    const [reservas, setReservas] = useState<string[][]>([]);
    const [loading, setLoading] = useState(true);

    // Datos del huésped
    const [apellido, setApellido] = useState("");
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const dataParam = searchParams.get("data");
                if (!dataParam) return;

                const payload = JSON.parse(decodeURIComponent(dataParam));

                const res = await fetch("http://localhost:8080/habitaciones/confirmarSeleccion", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                const data = await res.json();
                setReservas(data);
            } catch (err) {
                console.error("Error al obtener reservas:", err);
            }

            setLoading(false);
        };

        cargarDatos();
    }, [searchParams]);

    // --------- ENVIAR RESERVAS COMPLETAS ----------
    const enviarReservas = async () => {
        if (!apellido || !nombre || !telefono) {
            alert("Complete todos los campos obligatorios");
            return;
        }

        // Transformamos reservas[][] → reservas[] PLANAS compatibles con backend
        const payload = reservas.map((fila) => ({
            numeroHabitacion: parseInt(fila[0]),
            fechaInicio: fila[2],
            fechaFin: fila[3],
            nombre,
            apellido,
            telefono,
        }));

        try {
            const res = await fetch("http://localhost:8080/reservas/crearMultiples", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                alert("Reserva creada con éxito");
                window.location.href = "/";
            } else {
                alert("Error al crear la reserva");
            }
        } catch (err) {
            console.error(err);
            alert("Error de conexión");
        }
    };


    return (
        <div className="w-full flex flex-col items-center p-6">
            <h2 className="text-2xl font-bold mb-4">Listado de Reservas Seleccionadas</h2>

            {loading && <p>Cargando...</p>}

            {!loading && reservas.length === 0 && (
                <p className="text-gray-600 mt-4">No se encontraron resultados.</p>
            )}

            {reservas.length > 0 && (
                <div className="w-full max-w-3xl border rounded shadow overflow-y-auto max-h-[400px] mt-4">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="texto-mlr">Nro Habitación</th>
                                <th className="texto-mlr">Tipo de Habitación</th>
                                <th className="texto-mlr">Ingreso</th>
                                <th className="texto-mlr">Egreso</th>
                            </tr>
                        </thead>

                        <tbody>
                            {reservas.map((fila, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="texto-mlr">{fila[0]}</td>
                                    <td className="texto-mlr">{fila[1]}</td>
                                    <td className="texto-mlr">{fila[2]}</td>
                                    <td className="texto-mlr">{fila[3]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ----------- DATOS DEL HUESPED ------------ */}
            {reservas.length > 0 && (
                <div className="mt-8 w-full max-w-xl border p-4 rounded shadow">
                    <h3 className="text-xl texto-mlr mb-4">Reserva a Nombre de:</h3>

                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="texto-mlr">Apellido (*)</label>
                            <input
                                type="text"
                                className="texto-mlr"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="texto-mlr">Nombre (*)</label>
                            <input
                                type="text"
                                className="texto-mlr"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="texto-mlr">Teléfono (*)</label>
                            <input
                                type="text"
                                className="texto-mlr"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ----------- BOTONES ------------ */}
            {reservas.length > 0 && (
                <div className="flex gap-6 mt-6">
                    <button
                        className="px-6 py-2 border border-red-500 text-red-500 rounded hover:bg-red-100"
                        onClick={() => {
                            if (confirm("¿Seguro que desea cancelar la reserva?")) {
                                window.location.href = "/";
                            }
                        }}
                    >
                        Rechazar
                    </button>

                    <button
                        className="px-6 py-2 border border-green-600 text-green-600 rounded hover:bg-green-100"
                        onClick={enviarReservas}
                    >
                        Aceptar
                    </button>
                </div>
            )}
        </div>
    );
}
