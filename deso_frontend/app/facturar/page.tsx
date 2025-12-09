"use client";

import Navbar from "../components/Navbar.jsx";
import "./formFacturar.css"
import "../globals.css";
import { useState } from "react";
import ResponsablePago from './SeleccionarResponsable';


const OccupationsTable = ({
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

// COMPONENTE: Modal para la Selección de Items a Facturar (Con Estilos Actualizados)
const SelectItemsModal = ({ responsable, onClose }: { responsable: any, onClose: () => void }) => {
    const nombre = responsable?.nombre || 'Huésped';
    
    return (
        <div className="modal-overlay">
            <div className="modal-content-pago"> 
                <h1 className="modal-title">Selección de Items</h1>
                
                <h3 className="section-title-pago" style={{ paddingLeft: '20px', margin: '10px 0 20px 0', border: 'none' }}>
                    Seleccione los ítems a Facturar por: 
                    <span style={{ fontWeight: 'normal', fontStyle: 'italic', marginLeft: '5px' }}>
                        {nombre}
                    </span>
                </h3>
                
                <div className="modal-body-pago items-selection-grid">
                    
                    <div className="item-column item-column-large">
                        <label className="item-label-group">
                            <input type="checkbox" defaultChecked /> Monto Total ($4840)
                        </label>
                        <label className="item-label-group">
                            <input type="checkbox" defaultChecked /> Estadía ($2500)
                        </label>
                    </div>
                    
                    <div className="item-column consumption-column" style={{ borderTop: '2px solid #b69f7f', paddingTop: '15px' }}>
                        <h4 className="consumption-title">Consumo</h4>
                        <label className="item-label-group">
                            <input type="checkbox" defaultChecked /> Bar ($700)
                        </label>
                        <label className="item-label-group">
                            <input type="checkbox" defaultChecked /> Sauna ($500)
                        </label>
                        <label className="item-label-group">
                            <input type="checkbox" defaultChecked /> Lavado y Planchado ($300)
                        </label>
                    </div>
                </div>

                <div className="modal-footer-pago items-footer">
                    <button onClick={onClose} className="btn-modal-pago cancel large-btn-gray">
                        VOLVER ATRAS
                    </button>
                    
                    <div style={{ flexGrow: 1 }}></div>

                    <button onClick={() => alert('Facturando items...')} className="btn-modal-pago confirm large-btn-confirm">
                        ACEPTAR
                    </button>
                </div>
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

    const [occupantsData, setOccupantsData] = useState<any[] | null>(null);
    const [hasSearched, setHasSearched] = useState(false); 

    const [showModal, setShowModal] = useState(false);
    const [selectedOccupation, setSelectedOccupation] = useState<any | null>(null);

    const [facturacionStage, setFacturacionStage] = useState('SELECCION_RESPONSABLE'); 
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
            setOccupantsData(null);
            return; 
        }
        
        const roomNumber = parseInt(form.numeroDeHabitación, 10);
        
        if (isNaN(roomNumber) || roomNumber <= 0) {
            newErrors.numeroDeHabitación = "Ingrese un número de habitación válido\n(> 0).";
            setErrors(newErrors);
            setOccupantsData(null); 
            return;
        }


        setErrors({ numeroDeHabitación: "", horaSalida:"", });
        setOccupantsData(null); 

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
                setOccupantsData([]);
                return;
            }

            setOccupantsData(data); 
            setErrors({ numeroDeHabitación: "", horaSalida:"", });
        } 
        catch(error){
            console.error(error);
            const errorMessageText = "Error al conectar con el servicio o habitación no encontrada.";
            newErrors.numeroDeHabitación = errorMessageText;
            setErrors(newErrors);
            setOccupantsData([]); 
        }

    }
    
    const handleFacturarClick = (occupation: any) => {
        setSelectedOccupation(occupation);
        setFacturacionStage('SELECCION_RESPONSABLE'); 
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOccupation(null);
        setResponsableFacturacion(null); 
        setFacturacionStage('SELECCION_RESPONSABLE'); 
    };

    const handleConfirmResponsible = (responsable: any) => {
        setResponsableFacturacion(responsable);
        setFacturacionStage('SELECCION_ITEMS');
    };
    
    const handleGoBackToResponsible = () => {
        setFacturacionStage('SELECCION_RESPONSABLE');
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
                
                <OccupationsTable 
                    data={occupantsData} 
                    hasSearched={hasSearched} 
                    onFacturarClick={handleFacturarClick} 
                />
            </div>
        
            {showModal && selectedOccupation && facturacionStage === 'SELECCION_RESPONSABLE' && (
                <ResponsablePago 
                    habitacion={form.numeroDeHabitación}
                    ocupantes={selectedOccupation.huespedes || []} 
                    onClose={handleCloseModal}
                    onConfirmAndAdvance={handleConfirmResponsible} 
                />
            )}

            {showModal && facturacionStage === 'SELECCION_ITEMS' && responsableFacturacion && (
                <SelectItemsModal 
                    responsable={responsableFacturacion}
                    onClose={handleGoBackToResponsible} 
                />
            )}
        </main>
    );
}