"use client";

import "./formFacturar.css"
import "../globals.css";
import { useState } from "react";
import ResponsablePago from '../components/SeleccionarResponsable';
import { parseFechaSinOffsetStr } from "../components/utilsMostrarHabitaciones.jsx";
import { SeleccionarItemsFacturar } from "../components/SeleccionarItemsFacturar"


const TablaOcupaciones = ({
    data,
    hasSearched,
    onFacturarClick
}: {
    data: any[] | null,
    hasSearched: boolean,
    onFacturarClick: (occupation: any) => void
}) => {

    if (!data && !hasSearched) {
        return (
            <div className="ocupaciones-wrapper-FAC">
                <div className="ocupaciones-container-FAC">
                    <table className="ocupaciones-table-FAC">
                        <thead>
                            <tr className="ocupaciones-header-row-FAC">
                                <th className="ocupaciones-th-FAC">ID Ocupación</th>
                                <th className="ocupaciones-th-FAC">Fecha Inicio</th>
                                <th className="ocupaciones-th-FAC">Fecha Fin</th>
                                <th className="ocupaciones-th-FAC">Estado</th>
                                <th className="ocupaciones-th-FAC">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key="no-search-yet" className="ocupaciones-row-odd-FAC">
                                <td colSpan={5} className="ocupaciones-msg-FAC">
                                    Ingrese un número de habitación y presione "Buscar Ocupaciones"
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    const sortedData = data
        ? [...data].sort((a, b) => {
              const isAInProcess = a.estado === "EN_PROCESO";
              const isBInProcess = b.estado === "EN_PROCESO";
              if (isAInProcess && !isBInProcess) return -1;
              if (!isAInProcess && isBInProcess) return 1;
              return b.fechaInicio.localeCompare(a.fechaInicio);
          })
        : [];

    return (
        <div className="ocupaciones-wrapper-FAC">
            <div className="ocupaciones-container-FAC">
                <table className="ocupaciones-table-FAC">
                    <thead>
                        <tr className="ocupaciones-header-row-FAC">
                            <th className="ocupaciones-th-FAC">ID Ocupación</th>
                            <th className="ocupaciones-th-FAC">Fecha Inicio</th>
                            <th className="ocupaciones-th-FAC">Fecha Fin</th>
                            <th className="ocupaciones-th-FAC">Estado</th>
                            <th className="ocupaciones-th-FAC">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.length > 0 ? (
                            sortedData.map((item, index) => (
                                <tr
                                    key={item.idOcupacion}
                                    className={
                                        index % 2 === 0
                                            ? "ocupaciones-row-even-FAC"
                                            : "ocupaciones-row-odd-FAC"
                                    }
                                >
                                    <td className="ocupaciones-td-FAC">{item.idOcupacion}</td>
                                    <td className="ocupaciones-td-FAC">{item.fechaInicio}</td>
                                    <td className="ocupaciones-td-FAC">{item.fechaFin}</td>
                                    <td
                                        className={
                                            item.estado === "EN_PROCESO"
                                                ? "ocupaciones-td-FAC estado-proceso-FAC"
                                                : "ocupaciones-td-FAC estado-finalizada-FAC"
                                        }
                                    >
                                        {item.estado}
                                    </td>
                                    <td className="ocupaciones-td-FAC">
                                        {item.estado === "EN_PROCESO" && (
                                            <button
                                                onClick={() =>
                                                    onFacturarClick(item)
                                                }
                                                className="btn-facturar-FAC"
                                            >
                                                Facturar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="ocupaciones-row-odd-FAC">
                                <td colSpan={5} className="ocupaciones-msg-FAC">
                                    {hasSearched
                                        ? "Búsqueda completada. Revise el campo de habitación o intente otra búsqueda."
                                        : "Cargando..."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default function Facturar() {
    const [form, setForm] = useState({
        numeroDeHabitación: "",
        horaSalida:"",
    });

    const [errors, setErrors] = useState({
        numeroDeHabitación: "",
        horaSalida:"",
    });

    const [datosOcupantes, setDatosOcupantes] = useState<any[] | null>(null);
    const [hasSearched, setHasSearched] = useState(false); 

    const [showModal, setShowModal] = useState(false);
    const [ocupacionSeleccionada, setOcupacionSeleccionada] = useState<any | null>(null);

    const [etapaFacturacion, setEtapaFacturacion] = useState('SELECCION_RESPONSABLE'); 
    const [responsableFacturacion, setResponsableFacturacion] = useState(null); 


    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        
        setErrors(prev => ({ ...prev, [name]: "" })); 

        setForm((prev) => ({ ...prev, [name]: value}));
    }

    const handleRequest = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const roomNumberValue = form.numeroDeHabitación.trim();
        setHasSearched(true); 

        let newErrors = {
            numeroDeHabitación: "",
            horaSalida:"",
        };
        let isValid = true;

        if (!roomNumberValue) {
            newErrors.numeroDeHabitación = "El número de habitación es obligatorio.";
            isValid = false;
        }
        
        const integerRegex = /^\d+$/; 
        if (roomNumberValue && !integerRegex.test(roomNumberValue)) {
            newErrors.numeroDeHabitación = "Solo se permiten números enteros\n(sin letras ni espacios).";
            isValid = false;
        }


        if (!isValid) {
            setErrors(newErrors);
            setDatosOcupantes(null);
            return; 
        }
        
        const roomNumber = parseInt(form.numeroDeHabitación, 10);
        
        if (isNaN(roomNumber) || roomNumber <= 0) {
            newErrors.numeroDeHabitación = "Ingrese un número de habitación válido\n(> 0).";
            setErrors(newErrors);
            setDatosOcupantes(null); 
            return;
        }


        setErrors({ numeroDeHabitación: "", horaSalida:"", });
        setDatosOcupantes(null); 

        try{
            const response = await fetch(`http://localhost:8080/ocupaciones/obtenerPorHabitacion?numeroHabitacion=${roomNumber}`);

            if(!response.ok){
                const errorMessage = await response.text(); 
                throw new Error(errorMessage || "Error desconocido al buscar la habitación.");
            }

            const data = await response.json(); 
        
            if (data.length === 0) {
                newErrors.numeroDeHabitación = "No se encontraron ocupaciones para la habitación correspondiente.";
                setErrors(newErrors);
                setDatosOcupantes([]);
                return;
            }

            setDatosOcupantes(data); 
            setErrors({ numeroDeHabitación: "", horaSalida:"", });
        } 
        catch(error){
            console.error(error);
            const errorMessageText = "Error al conectar con el servicio o habitación no encontrada.";
            newErrors.numeroDeHabitación = errorMessageText;
            setErrors(newErrors);
            setDatosOcupantes([]); 
        }

    }

    const [costos, setCostos] = useState({
        costoBar:0,
        costoSauna:0,
        costoLavado:0,
        costoEstadia:0,
    })
    
    const handleFacturarClick = (occupation: any) => {
        setOcupacionSeleccionada(occupation);

        const costoB = occupation.servicios.find(s => s.tipo === "BAR")?.costoTotal ?? 0;
        const costoS = occupation.servicios.find(s => s.tipo === "SAUNA")?.costoTotal ?? 0;
        const costoL = occupation.servicios.find(s => s.tipo === "LAVADO_Y_PLANCHADO")?.costoTotal ?? 0;

        setCostos({
            costoBar: costoB,
            costoSauna: costoS,
            costoLavado: costoL,
            costoEstadia: definirCostoEstadia(occupation.habitacion.tipo, occupation.fechaInicio, occupation.fechaFin),
        })

        setEtapaFacturacion('SELECCION_RESPONSABLE'); 
        setShowModal(true);
    };

    const definirCostoEstadia = (tipoHabitacion, fechaInicioStr, fechaFinStr) => {
        const tarifaPorTipo = {
            INDIVIDUAL_ESTANDAR: 50800,
            DOBLE_ESTANDAR: 70230,
            DOBLE_SUPERIOR: 90560,
            SUITE_DOBLE: 110500,
            SUPERIOR_FAMILY_PLAN: 128600,
        };

        const MS_PER_DAY = 1000 * 60 * 60 * 24;

        const costoPorNoche = tarifaPorTipo[tipoHabitacion];
        if (!costoPorNoche) return 0;

        // Convertir string YYYY-MM-DD → Date UTC sin offset
        const start = parseFechaSinOffsetStr(fechaInicioStr);
        const end = parseFechaSinOffsetStr(fechaFinStr);

        // diferencia en ms
        const diffMs = end.getTime() - start.getTime();
        if (diffMs <= 0) return 0;

        // noches
        const cantidadDias = Math.ceil(diffMs / MS_PER_DAY);

        return cantidadDias * costoPorNoche;
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setOcupacionSeleccionada(null);
        setResponsableFacturacion(null); 
        setEtapaFacturacion('SELECCION_RESPONSABLE'); 
    };

    const handleConfirmResponsible = (responsable: any) => {
        setResponsableFacturacion(responsable);
        setEtapaFacturacion('SELECCION_ITEMS');
    };
    
    const handleGoBackToResponsible = () => {
        setEtapaFacturacion('SELECCION_RESPONSABLE');
    }

    
    return (
        <main className="fondo">
            <h1 className="titulo">FACTURACIÓN</h1>
            <div className="linea-corta"></div> 

            <h1 className="titulo_fac">Datos del Check Out</h1>
            <h3 className="subtitulo_fac">Ingrese el número de la habitación a facturar</h3>

            <div className="layout-horizontal">
                
                <div className="contenedor_fac"> 
                    <form onSubmit={handleRequest}>
                        <div className="contenedor-campos-FAC">
                            <h2 className="texto-campos">Datos de la ocupacion</h2>
                            <div> 
                                <h3 className="arriba_bot">
                                    Número de Habitación 
                                    <span className="obligatorio"> (*)</span>
                                </h3>
                                <input 
                                    name="numeroDeHabitación" 
                                    value={form.numeroDeHabitación} 
                                    onChange={handleChange} 
                                    placeholder="Numero de Habitación"
                                
                                    className={errors.numeroDeHabitación ? 'input-error' : ''} 

                                />
                                {errors.numeroDeHabitación && (
                                    <p className="mensaje-error-campo">{errors.numeroDeHabitación}</p>
                                )}
                            </div>
                            <div>
                                <h3 className="arriba_bot">
                                    Hora de Salida
                                    <span className="obligatorio"> (*)</span>
                                </h3>
                                <input 
                                    name="numeroDeHabitación" 
                                    value={form.horaSalida} 
                                    onChange={handleChange} 
                                    placeholder="Numero de Habitación"
                                
                                    className={errors.horaSalida ? 'input-error' : ''} 
                                />
                                {errors.horaSalida && (
                                
                                    <p className="mensaje-error-campo">{errors.horaSalida}</p>
                                )}
                              </div>
                              <button type="submit" className="btn-FAC">
                                  Buscar Ocupaciones
                              </button>

                          </div>
                      </form>
                  </div>
                
                <TablaOcupaciones 
                    data={datosOcupantes} 
                    hasSearched={hasSearched} 
                    onFacturarClick={handleFacturarClick} 
                />
            </div>
        
            {showModal && ocupacionSeleccionada && etapaFacturacion === 'SELECCION_RESPONSABLE' && (
                <ResponsablePago 
                    habitacion={form.numeroDeHabitación}
                    ocupantes={ocupacionSeleccionada.huespedes || []} 
                    onClose={handleCloseModal}
                    onConfirmAndAdvance={handleConfirmResponsible} 
                />
            )}

            {showModal && etapaFacturacion === 'SELECCION_ITEMS' && responsableFacturacion && (
                <SeleccionarItemsFacturar 
                    responsable={responsableFacturacion}
                    onClose={handleGoBackToResponsible} 
                    costos={costos}
                />
            )}
        </main>
    );
}