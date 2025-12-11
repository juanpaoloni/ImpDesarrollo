"use client";

import "../globals.css";
import "../gestionarHuesped/formDarDeBaja.css";
import "./cancelacionReserva.css";
import { ModalBase, ModalAdvertencia, ModalMotivo } from "../components/Modal.jsx";
import { useState } from "react";
import { useRouter } from "next/navigation"


type Reserva = {
  idReserva: number;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
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
  });

  const[mostrarPopUp, setMostrarPopUp] = useState({
    advertencia:false,
    confirmacion:false,
    fallo:false,
  });
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [reservaSeleccionada, setReservaSeleccionada] = useState<{
    nombre: string;
    apellido: string;
    idReserva:number;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const [errorApellido, setErrorApellido]= useState(false);

  const handleBuscar = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!form.apellido){
      setErrorApellido(true);
      return;
    }
    else{
      setErrorApellido(false);
    }

    

    setReservaSeleccionada(null);

    setTimeout(async () => {
      const params = new URLSearchParams();
      params.append("nombre", form.nombre);
      if (form.apellido) params.append("apellido", form.apellido);

      try {
        const res = await fetch(`http://localhost:8080/reservas/obtenerReservasPorPersona?${params.toString()}`);
        const data = await res.json();
        const filtradas = Array.isArray(data)
          ? data.filter(r => r.estado !== "CANCELADA")
          : [];

        setReservas(filtradas);

        if(res.ok) setBusco(true);
      } catch (err) {
        console.error("Error al buscar reservas:", err);
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

  const handleAceptar = async (motivo:string) => {
    setMostrarPopUp(prev => ({ ...prev, advertencia: false }));
    
    
    try{
      if (!reservaSeleccionada?.idReserva) {
        console.error("No hay reserva seleccionada");
        throw new Error("No hay un reserva seleccionada.");
      }

      const respuesta = await fetch(`http://localhost:8080/reservas/confirmarCancelacion?idReserva=${reservaSeleccionada?.idReserva}&motivo=${motivo}`,
        {method: "PUT"}
      );

      const rta = await respuesta.text();
      if(!respuesta.ok) alert (rta);

      setReservas([]);

    }catch(err){
      alert("Hubo un error.");
    }

    // Cuando este popup se cierra se seta en null la seleccion
    setMostrarPopUp((prev) => ({...prev, confirmacion:true}));

    setForm({
      nombre:"",
      apellido:"",
    })

  }

  const handleCerrarPopUp = async () => {
    setMostrarPopUp(prev => ({ ...prev, confirmacion: false }));
    setBusco(false);
    setReservaSeleccionada(null);
  }

  const [busco, setBusco] = useState(false);

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
            <div className="contenedor-campos-CR">
              <h3 className="texto-campos-CR">Datos del Reservante</h3>
              <div className="linea-corta-CR"></div>

              <div>
              <input
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                placeholder="Apellido"
                className={errorApellido? "input-error-CR" : ""}
              />
              {errorApellido && <p className="mensaje-error-campo-CR">El apellido no puede estar vacio</p>}
              </div>


              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre"
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
                reservas
                ?.filter(res => res.estado !== "CANCELADA")
                .map((res) => (
                  <tr
                    key={`${res.idReserva}`}
                    onClick={() =>
                      setReservaSeleccionada({
                        idReserva: res.idReserva,
                        nombre: res.nombre,
                        apellido: res.apellido,
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
                  {(busco &&
                  <td colSpan={6} className="tabla-noEncontrado">
                    No existen reservas para los criterios de búsqueda ingresados o ya estan canceladas
                  </td>
                  )}

                  {(!busco &&
                  <td colSpan={6} className="tabla-noEncontrado">
                    Ingrese el apellido y, opcionalmente, el nombre del reservante
                  </td>
                  )}
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
          <p>La reserva fue cancelada correctamente.</p>
        </ModalBase>
        
        {/*<ModalError
          visible={mostrarPopUp.fallo}
          onClose={() => setMostrarPopUp(prev => ({ ...prev, fallo: false }))}
          
        >
          <h2>¡Error!</h2>
          <p>El huesped no puede <br/> ser eliminado pues se ha alojado<br/> en el Hotel en alguna oportunidad</p>
        </ModalError>*/}


        {/*<ModalAdvertencia
          visible={mostrarPopUp.advertencia}
          onClose={() =>
            setMostrarPopUp(prev => ({ ...prev, advertencia: false }))
          }
          onAceptar={handleAceptar}
        >
          <h2>¡Advertencia!</h2>
          <p>¿Esta seguro que quiere cancelar la reserva de<br/>{reservaSeleccionada?.nombre} {reservaSeleccionada?.apellido}?</p>
        </ModalAdvertencia>*/}

        <ModalMotivo
          visible={mostrarPopUp.advertencia}
          onClose={() =>
            setMostrarPopUp(prev => ({ ...prev, advertencia: false }))
          }
          onAceptar={(motivo:string) => handleAceptar(motivo)}
        />


      </div>

      <div className="contenedor-boton">
        <button className="btn" onClick={handleCancelarReserva} disabled={!reservaSeleccionada}>
          CANCELAR RESERVA
        </button>
      </div>
    </main>
  );
}
