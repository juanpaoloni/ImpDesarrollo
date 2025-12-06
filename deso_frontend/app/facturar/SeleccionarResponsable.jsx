import React, { useState } from 'react';
// Asumo que tienes un DTO de HuespedResponse en el frontend
// import { HuespedResponse } from 'ruta/a/HuespedResponse.js'; 

const ResponsablePago = ({ ocupantesResponse, onConfirmar, onCancelar }) => {
    
    const [responsableSeleccionado, setResponsableSeleccionado] = useState(null); // Objeto HuespedResponse
    const [cuitTercero, setCuitTercero] = useState('');

    const handleSeleccionarOcupante = (huesped) => {
        setResponsableSeleccionado(huesped);
        setCuitTercero(''); // Limpiar CUIT si se selecciona un ocupante
    };

    const handleCuitChange = (e) => {
        setCuitTercero(e.target.value);
        setResponsableSeleccionado(null); // Limpiar selección si ingresa CUIT
    };

    const handleConfirmar = () => {
        if (responsableSeleccionado) {
            // Pasar los datos del huésped seleccionado
            onConfirmar({ 
                tipo: 'HUESPED', 
                data: responsableSeleccionado 
            });
        } else if (cuitTercero.trim()) {
            // Pasar solo el CUIT del tercero
            onConfirmar({ 
                tipo: 'TERCERO', 
                cuit: cuitTercero.trim() 
            });
        } else {
            alert('Debe seleccionar un responsable de pago de la lista o ingresar un CUIT de tercero.');
        }
    };

    const nombreHabitacion = ocupantesResponse.numeroHabitacion;

    return (
        <div className="modal-responsable">
            <h2>Seleccionar Responsable de Pago</h2>
            <div className="contenido-pago">
                
                {/* 👈 Lado Izquierdo: Lista de Ocupantes */}
                <div className="lista-ocupantes">
                    <p className="titulo-tabla">Ocupantes de la Habitación N°{nombreHabitacion}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Apellido</th>
                                <th>Nombres</th>
                                <th>Tipo Documento</th>
                                <th>Número Documento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ocupantesResponse.ocupantes.map((huesped, index) => (
                                <tr 
                                    key={index}
                                    onClick={() => handleSeleccionarOcupante(huesped)}
                                    className={responsableSeleccionado?.numeroDocumento === huesped.numeroDocumento ? 'seleccionado' : ''}
                                >
                                    <td>{huesped.apellido}</td>
                                    <td>{huesped.nombre}</td>
                                    <td>{huesped.tipoDocumento}</td>
                                    <td>{huesped.numeroDocumento}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 👈 Lado Derecho: Opción de Tercero */}
                <div className="tercero-cuit">
                    <p>¿Desea elegir otro responsable de pago?</p>
                    <p>Ingrese su número de CUIT</p>
                    <input 
                        type="text" 
                        value={cuitTercero} 
                        onChange={handleCuitChange} 
                        placeholder="Ingrese Número de CUIT"
                        className="input-cuit-tercero"
                    />
                    <small>Recuerde que solo puede seleccionar un responsable de pago</small>
                </div>
            </div>

            {/* 👈 Sección de Botones y Estado */}
            <div className="footer-pago">
                <button className="btn-cancelar" onClick={onCancelar}>CANCELAR</button>
                
                <div className="estado-seleccion">
                    <span className="label-estado">Responsable Seleccionado</span>
                    <span className="valor-estado">
                        {responsableSeleccionado 
                            ? `${responsableSeleccionado.apellido}, ${responsableSeleccionado.nombre}`
                            : (cuitTercero.trim() ? `Tercero (CUIT: ${cuitTercero.trim()})` : "El responsable de pago aún no ha sido seleccionado.")
                        }
                    </span>
                    <button className="btn-limpiar" onClick={() => { setResponsableSeleccionado(null); setCuitTercero(''); }}>X</button>
                </div>

                <button className="btn-confirmar" onClick={handleConfirmar} disabled={!responsableSeleccionado && !cuitTercero.trim()}>
                    CONFIRMAR
                </button>
            </div>
        </div>
    );
};

export default ResponsablePago;