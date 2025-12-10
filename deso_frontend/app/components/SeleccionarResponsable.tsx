import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../facturar/formFacturar.css';

interface ResponsableIdentificado {
    idResponsable: string;
    nombreCompleto: string;
    CUIT: string;
}

interface Occupant {
    apellido: string;
    nombre: string;
    tipoDocumento: string;
    numeroDocumento: string;
}

interface ResponsableFinal {
    idResponsable: string;
    nombre: string;
    documento: string;
}

interface ResponsablePagoProps {
    habitacion: string;
    ocupantes: Occupant[];
    onClose: () => void;
    onConfirmAndAdvance: (responsable: ResponsableFinal) => void;
}

const ResponsablePago = ({ habitacion, ocupantes, onClose, onConfirmAndAdvance }: ResponsablePagoProps) => {
    
    const [responsableSeleccionadoInterno, setResponsableSeleccionadoInterno] = useState<Occupant | null>(null);
    const [otroResponsableCuil, setOtroResponsableCuil] = useState('');
    const [huespedExternoInfo, setHuespedExternoInfo] = useState<ResponsableIdentificado | null>(null);
    const [error, setError] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);


    const searchCUIT = useCallback(async (cuitValue: string) => {
        
        setIsSearching(true);
        setHuespedExternoInfo(null);
        setError('');

        try {
            const response = await fetch(`http://localhost:8080/responsables/buscarPorCUIT?cuit=${cuitValue}`);
            
            if (response.ok && response.status !== 204 && response.status !== 404) {
                const data: ResponsableIdentificado = await response.json();
                setHuespedExternoInfo(data); 
            } else {
                setHuespedExternoInfo(null);
            }
        } catch (err) {
            console.error('Error fetching CUIT info:', err);
        } finally {
            setIsSearching(false);
        }
    }, []); 

    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (otroResponsableCuil.length === 13) { 
            searchTimeoutRef.current = setTimeout(() => {
                searchCUIT(otroResponsableCuil); 
            }, 0); 
        } else {
            setHuespedExternoInfo(null);
            setIsSearching(false); 
        }

        return () => {
             if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [otroResponsableCuil, searchCUIT]);

    const handleSelectOccupant = (huesped: Occupant) => {
        setResponsableSeleccionadoInterno(huesped);
        setOtroResponsableCuil(''); 
        setHuespedExternoInfo(null); 
        setError('');
    };

    const handleCUILChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replaceAll(/[^0-9]/g, ''); 

        if (value.length > 11) {
            value = value.substring(0, 11); 
        }

        let formattedValue = value;
        if (value.length > 2) {
            formattedValue = value.slice(0, 2) + '-' + value.slice(2);
        }
        if (value.length > 10) { 
            formattedValue = formattedValue.slice(0, 11) + '-' + formattedValue.slice(11);
        }

        setOtroResponsableCuil(formattedValue);
        setResponsableSeleccionadoInterno(null); 
        setError('');
    };

    const handleConfirm = () => {
        let responsableFinal: ResponsableFinal | null = null;

        if (responsableSeleccionadoInterno) {
            responsableFinal = {
                idResponsable:"",
                nombre: `${responsableSeleccionadoInterno.apellido}, ${responsableSeleccionadoInterno.nombre}`,
                documento: `${responsableSeleccionadoInterno.tipoDocumento} ${responsableSeleccionadoInterno.numeroDocumento}`,
            };
        } 
        else if (huespedExternoInfo) {
            responsableFinal = {
                idResponsable:huespedExternoInfo.idResponsable,
                nombre: huespedExternoInfo.nombreCompleto,
                documento: `CUIT ${huespedExternoInfo.CUIT}`,
            };
        }

        if (responsableFinal) {
            onConfirmAndAdvance(responsableFinal);
        } else {
            setError("Debe seleccionar un huésped de la tabla o ingresar un CUIT registrado.");
        }
    };


    const displayResponsable = 
    responsableSeleccionadoInterno 
        ? `${responsableSeleccionadoInterno.apellido}, ${responsableSeleccionadoInterno.nombre}`
        : huespedExternoInfo
        ? `${huespedExternoInfo.nombreCompleto}`
        : "El responsable de pago aún no ha sido seleccionado.";

    return (
        <div className="modal-overlay">
            <div className="modal-content-pago">
                <h1 className="modal-title">SELECCIONAR RESPONSABLE DE PAGO</h1>
                
                <div className="modal-body-pago">
                    
                    <div className="section-left">
                        <h3 className="section-title-pago">Ocupantes de la Habitación N°{habitacion}</h3>
                        <div className="tabla-wrapper-SRP">
                            <table className="occupants-table">
                                <thead>
                                    <tr>
                                        <th>Apellido</th>
                                        <th>Nombre</th>
                                        <th>Tipo de Documento</th>
                                        <th>Número de Documento</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ocupantes.length > 0 ? (
                                        ocupantes.map((huesped, index) => (
                                            <tr 
                                                key={huesped.numeroDocumento} 
                                                onClick={() => handleSelectOccupant(huesped)}
                                                className={responsableSeleccionadoInterno?.numeroDocumento === huesped.numeroDocumento ? 'selected-row' : ''}
                                            >
                                                <td>{huesped.apellido}</td>
                                                <td>{huesped.nombre}</td>
                                                <td>{huesped.tipoDocumento}</td>
                                                <td>{huesped.numeroDocumento}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} style={{ textAlign: 'center', padding: '15px' }}>
                                                No se encontraron huéspedes para esta ocupación.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="section-right">
                        <h3 className="section-title-pago-right">¿Desea elegir otro responsable de pago?</h3>
                        <p className="input-label-pago">Ingrese su número de CUIT</p>
                        <input 
                            type="text" 
                            placeholder="XX-XXXXXXXX-X" 
                            value={otroResponsableCuil}
                            onChange={handleCUILChange} 
                            className="cuit-input"
                            maxLength={13} 
                        />
                        
                        <div style={{ minHeight: '0px', marginTop: '0px' }}>
                            {isSearching && otroResponsableCuil.length === 13 && (
                                <p style={{ color: '#b69f7f', fontStyle: 'italic', margin: 0 }}>Buscando responsable...</p>
                            )}
                            {!isSearching && huespedExternoInfo && (
                                <div className="confirmacion-cuit-SRP">
                                    <p style={{ margin: 0, fontWeight: 'bold', color: '#302922' }}>
                                        {huespedExternoInfo.tipoResponsable === 'JURIDICA' ? 'Razón Social:' : 'Nombre/Apellido:'}
                                    </p>
                                    <p style={{ margin: '3px 0 0 0', color: '#302922' }}>{huespedExternoInfo.nombreCompleto}</p>
                                </div>
                            )}
                            {!isSearching && otroResponsableCuil.length === 13 && !huespedExternoInfo && (
                                <p className="error-cuit-SRP">CUIT no encontrado/registrado.</p>
                            )}
                        </div>
                        
                    </div>

                </div>

                <div className="modal-footer-pago">
                    <button onClick={onClose} className="btn-modal-pago">
                        CANCELAR
                    </button>
                    
                    <div className="status-area">
                        <span className="status-label">Responsable Seleccionado</span>
                        <div className="status-box">
                            {displayResponsable}
                        </div>
                         {error && <p className="error-message-modal">{error}</p>}
                    </div>

                    <button onClick={handleConfirm} className="btn-modal-pago">
                        CONFIRMAR
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResponsablePago;