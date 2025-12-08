"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function MostrarListaReserva() {
    const searchParams = useSearchParams();
    const [reservas, setReservas] = useState<string[][]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const dataParam = searchParams.get("data");
                if (!dataParam) return;

                // Parseamos el payload enviado desde la pantalla anterior
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
    }, [searchParams]); // ← ahora funciona, no rompe nada

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
                                <th className="border p-2 text-center">Nro Habitación</th>
                                <th className="border p-2 text-center">Tipo de Habitación</th>
                                <th className="border p-2 text-center">Ingreso</th>
                                <th className="border p-2 text-center">Egreso</th>
                            </tr>
                        </thead>

                        <tbody>
                            {reservas.map((fila, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="border p-2 text-center">{fila[0]}</td>
                                    <td className="border p-2 text-center">{fila[1]}</td>
                                    <td className="border p-2 text-center">{fila[2]}</td>
                                    <td className="border p-2 text-center">{fila[3]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {reservas.length > 0 && (
                <div className="flex gap-6 mt-6">
                    <button className="px-6 py-2 border border-red-500 text-red-500 rounded hover:bg-red-100">
                        Rechazar
                    </button>

                    <button className="px-6 py-2 border border-green-600 text-green-600 rounded hover:bg-green-100">
                        Aceptar
                    </button>
                </div>
            )}
        </div>
    );
}
