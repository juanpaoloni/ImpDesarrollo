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

    const enviarReservas = async () => {
        if (!apellido || !nombre || !telefono) {
            alert("Complete todos los campos obligatorios");
            return;
        }

        // Transformamos reservas[][] → reservas[] PLANAS compatibles con backend
        const payload = reservas.map((fila) => ({
            fechaInicio: fila[2],
            fechaFin: fila[3],
            nombre,
            apellido,
            telefono,
            habitacion: {
                numeroHabitacion: parseInt(fila[0])
            }
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

    const parseTipo = (tipo) => {
        if(tipo === "INDIVIDUAL_ESTANDAR")
            return "Individual Estándar";
        else if(tipo === "DOBLE_ESTANDAR")
            return "Doble Estándar";
        else if(tipo === "DOBLE_SUPERIOR")
            return "Doble Superior";
        else if(tipo === "SUITE_DOBLE")
            return "Suite Doble";
        else if(tipo === "SUPERIOR_FAMILY_PLAN")
            return "Superior Family Plan";
        else return "?";
    }


return (
    <main className="fondo">
        <h1 className="titulo">Reservar Habitación</h1>
        <div className="linea-corta"></div>
        <h3 className="subtitulo">Verifique que las habitaciones seleccionadas sean las deseadas e ingrese los datos solicitados</h3>
        
        <div className="contenedor-principal-ML">

            {loading && <p>Cargando...</p>}

            {!loading && reservas.length === 0 && (
                <p className="text-gray-600 mt-4">No se encontraron resultados.</p>
            )}


            {reservas.length > 0 && (
                <div className="contenedor-campos-ML">
                    <h3>RESERVA A NOMBRE DE...</h3>
                    <div className="linea-corta-ML"></div>
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
            
            {reservas.length > 0 && (
                <div className="contenedor-tabla-ML">
                    <table className="tabla">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="tabla-header-ML izquierdo">Número</th>
                                <th className="tabla-header-ML">Tipo de Habitación</th>
                                <th className="tabla-header-ML">Ingreso</th>
                                <th className="tabla-header-ML derecho">Egreso</th>
                            </tr>
                        </thead>

                        <tbody>
                            {reservas.map((fila, index) => (
                                <tr key={index}>
                                    <td className="tabla-fila-ML">{fila[0]}</td>
                                    <td className="tabla-fila-ML tipo">{parseTipo(fila[1])}</td>
                                    <td className="tabla-fila-ML">{fila[2]}</td>
                                    <td className="tabla-fila-ML">{fila[3]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}


            </div>


           
                {reservas.length > 0 && (
                     <div className="contenedor-botones-ML">
                        <button
                            className="boton-ML rechazar"
                            onClick={() => {
                                if (confirm("¿Seguro que desea cancelar la reserva?")) {
                                    window.location.href = "/";
                                }
                            }}
                        >
                            RECHAZAR
                        </button>

                        <button
                            className="boton-ML aceptar"
                            onClick={enviarReservas}
                        >
                            ACEPTAR
                        </button>
                    </div>
                )}
            
    </main>
    );
}
