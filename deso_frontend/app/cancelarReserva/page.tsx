"use client";

import "../globals.css";
import "../gestionarHuesped/formDarDeBaja.css";
import { ModalBase, ModalAdvertencia, ModalError } from "../components/Modal.jsx";
import { useState } from "react";
import { useRouter } from "next/navigation"


type Reserva = {
  idReserva: number;
  fechaInicio: string;
  fechaFin: string;
  nombre: string;
  apellido: string;
  habitacion: {
    numeroHabitacion: number;
    tipo: string;
  }
};

export default function cancelarReserva() {

  const router = useRouter();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    tipoDocumento: "DNI",
    numeroDocumento: "",
  });

  const[mostrarPopUp, setMostrarPopUp] = useState({
    advertencia:false,
    confirmacion:false,
    fallo:false,
  });
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [reservaSeleccionada, setReservaSeleccionada] = useState<{
    idReserva:number;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBuscar = async (e: React.FormEvent) => {
    e.preventDefault();
    setReservaSeleccionada(null);

    setTimeout(async () => {
      const params = new URLSearchParams();
      if (form.nombre) params.append("nombre", form.nombre);
      if (form.apellido) params.append("apellido", form.apellido);

      try {
        const res = await fetch(`http://localhost:8080/reservas/obtenerReservasPorPersona?${params.toString()}`);
        const data = await res.json();
        setReservas(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error al buscar huéspedes:", err);
        setReservas([]);
      }

      // limpiar las filas eliminadas
    }, 300); // duración de la animación
  };


  const handleCancelarReserva = async () => {
    try{

      setMostrarPopUp((prev) => ({...prev, advertencia:true}));

    }catch(error){
      alert(error);
    }
  }

  const handleAceptar = async () => {
    setMostrarPopUp(prev => ({ ...prev, advertencia: false }));
    
    
    try{
      if (!reservaSeleccionada?.idReserva) {
        console.error("No hay reserva seleccionada");
        throw new Error("No hay un reserva seleccionada.");
      }

      const result = await fetch(``,
        {
          method: "POST"
        }
      );

      if(!result.ok) throw new Error("No se pudo cancelar la reserva.");

      

      setReservas([]);

    }catch(err){
      alert("Hubo un error.");
    }

    // Cuando este popup se cierra se seta en null la seleccion
    setMostrarPopUp((prev) => ({...prev, confirmacion:true}));
  }

  const handleCerrarPopUp = async () => {
    setMostrarPopUp(prev => ({ ...prev, confirmacion: false }));
    setReservaSeleccionada(null);
  }

  // A partir de aca empieza el return
  //
  //
  return (
    <main className="fondo">
      <h1 className="titulo">Cancelar Reserva</h1>
      <div className="linea-corta"></div>
      <h3 className="subtitulo">Elija la/s reserva/s a cancelar</h3>


      <div className="contenedor-principal">
        <div>
          <form onSubmit={handleBuscar}>
            <div className="contenedor-campos">
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
                <th className="tabla-header-izquierdo">Apellido</th>
                <th className="tabla-header">Nombre</th>
                <th className="tabla-header">Número Habitación</th>
                <th className="tabla-header">Tipo Habitación</th>
                <th className="tabla-header">Fecha Inicial</th>
                <th className="tabla-header-derecho">Fecha Final</th>
              </tr>
            </thead>
            <tbody>
              {reservas.length > 0 ? (
                reservas.map((res) => (
                  <tr
                    key={`${res.idReserva}`}
                    onClick={() =>
                      setReservaSeleccionada({
                        idReserva: res.idReserva
                      })
                    }
                    className={`
                      ${reservaSeleccionada?.idReserva === res.idReserva
                        ? "tabla-seleccionado"
                        : "tabla-fila"}
                    `}
                  >

                    <td className="tabla-columna">{res.apellido}</td>
                    <td className="tabla-columna">{res.nombre}</td>
                    <td className="tabla-columna">{res.habitacion.numeroHabitacion}</td>
                    <td className="tabla-columna">{res.habitacion.tipo}</td>
                    <td className="tabla-columna">{res.fechaInicio}</td>
                    <td className="tabla-columna">{res.fechaFin}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="tabla-noEncontrado">
                    No se encontraron huéspedes
                  </td>
                </tr>
              )}
            </tbody>
          </table>
              
        </div>

        {/*ACA EMPIEZAN LOS POPUPS*/}
        <ModalBase
          visible={mostrarPopUp.confirmacion}
          onClose={
            handleCerrarPopUp
          }
        >
          
          <h2>¡Exito!</h2>
          <p>El huesped  ha sido dado de baja exitosamente.</p>
        </ModalBase>
        
        <ModalError
          visible={mostrarPopUp.fallo}
          onClose={() => setMostrarPopUp(prev => ({ ...prev, fallo: false }))}
          
        >
          <h2>¡Error!</h2>
          <p>El huesped no puede <br/> ser eliminado pues se ha alojado<br/> en el Hotel en alguna oportunidad</p>
        </ModalError>


        <ModalAdvertencia
          visible={mostrarPopUp.advertencia}
          onClose={() =>
            setMostrarPopUp(prev => ({ ...prev, advertencia: false }))
          }
          onAceptar={handleAceptar}
        >
          <h2>¡Advertencia!</h2>
          <p>¿Esta seguro que quiere eliminar al huesped<br/>?</p>
        </ModalAdvertencia>


      </div>

      <div className="contenedor-boton">
        <button className="btn" onClick={handleCancelarReserva} disabled={!reservaSeleccionada}>
          CANCELAR
        </button>
      </div>
    </main>
  );
}
