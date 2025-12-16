"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "./mostrarLista.css";
import { validarTexto, validarTelefono } from "../components/Validaciones.jsx"
import { ModalBase, ModalAdvertencia } from "../components/Modal.jsx"
import {useRouter} from "next/navigation";

export default function MostrarListaReserva() {
    const searchParams = useSearchParams();
    const [reservas, setReservas] = useState<string[][]>([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    // Datos del huésped
    const [apellido, setApellido] = useState("");
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");

    const [errores, setErrores] = useState({
        apellido:"",
        nombre:"",
        telefono:"",
    })
    
    const[popUpVisible, setVisible] = useState({
        confirmacion:false,
        advertencia: false,
    })
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

    const handleErrores = () => {

        setErrores({
            apellido:"",
            nombre:"",
            telefono:"",
        });

        let hayErrores = false;
        if(!validarTexto(apellido)){
            setErrores((prev) => ({...prev, apellido:"El apellido solo puede contener letras\nsin espacios ni números."}))
            hayErrores = true;
        }
        if(!validarTexto(nombre)){
            setErrores((prev) => ({...prev, nombre:"El nombre solo puede contener letras\nsin espacios ni números."}))
            hayErrores = true;
        }
        if(!validarTelefono(telefono)){
            setErrores((prev) => ({...prev, telefono:"Telefono invalido."}))
            hayErrores = true;
        }

        return hayErrores;
    }

    const enviarReservas = async () => {
        if (handleErrores()){
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
                setVisible((prev) => ({...prev, confirmacion:true}));
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

    const handleVolver = () => {
        router.push("/");
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
                            <label className="texto-mlr">Apellido</label>
                            <label className="obligatorio-ML"> (*)</label>
                            <input
                                type="text"
                                className={`texto-mlr ${errores.apellido ? "input-error" : ""}`}
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                placeholder="Apellido"
                            />
                            {errores.apellido && <p className="error-ML">{errores.apellido}</p>}
                        </div>

                        <div>
                            <label className="texto-mlr">Nombre</label>
                            <label className="obligatorio-ML"> (*)</label>
                            <input
                                type="text"
                                className={`texto-mlr ${errores.nombre ? "input-error" : ""}`}
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Nombre"
                            />
                            {errores.nombre && <p className="error-ML">{errores.nombre}</p>}
                        </div>

                        <div>
                            <label className="texto-mlr">Teléfono</label>
                            <label className="obligatorio-ML"> (*)</label>
                            <input
                                type="text"
                                className={`texto-mlr ${errores.telefono ? "input-error" : ""}`}
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                placeholder="Número de telefono"
                            />
                            {errores.telefono && <p className="error-ML">{errores.telefono}</p>}
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
                            className="boton-ML"
                            onClick={() => {
                                setVisible((prev) => ({...prev, advertencia:true}))
                            }}
                        >
                            RECHAZAR
                        </button>

                        <button
                            className="boton-ML"
                            onClick={enviarReservas}
                        >
                            ACEPTAR
                        </button>
                    </div>
                )}


                <ModalAdvertencia visible={popUpVisible.advertencia}
                            onClose={() => setVisible((prev) => ({...prev, advertencia:false}))}
                            onAceptar={handleVolver}>
                                <h2>¡Advertencia!</h2>
                                <p>¿Esta seguro de que quiere deshacer las acciones realizadas?</p>
                </ModalAdvertencia>

                <ModalBase visible={popUpVisible.confirmacion}
                    onClose={handleVolver}>
                        <h2>Exito!</h2>
                        <p>Se han cargado todas las reservas a nombre de {nombre} {apellido}</p>
                </ModalBase>
            
    </main>
    );
}
