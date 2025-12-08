import React from 'react';
import './formFacturar.css';


interface Occupant {
    apellido: string;
    nombre: string;
    tipoDocumento: string;
    numeroDocumento: string;
}

interface ResponsablePagoProps {
    habitacion: string;
    ocupantes: Occupant[];
    onClose: () => void;
}

const ResponsablePago = ({ habitacion, ocupantes, onClose }: ResponsablePagoProps) => {
    
    const [responsableSeleccionado, setResponsableSeleccionado] = React.useState<Occupant | null>(null);
    const [otroResponsableCuil, setOtroResponsableCuil] = React.useState('');
    const [error, setError] = React.useState('');

    const handleSelectOccupant = (huesped: Occupant) => {
        setResponsableSeleccionado(huesped);
        setOtroResponsableCuil(''); 
        setError('');
    };

    const handleConfirm = () => {
        if (!responsableSeleccionado && !otroResponsableCuil.trim()) {
            setError("Debe seleccionar un ocupante o ingresar un CUIL/CUIT externo.");
            return;
        }

        const responsableFinal = responsableSeleccionado 
            ? `${responsableSeleccionado.apellido}, ${responsableSeleccionado.nombre}` 
            : `CUIL/CUIT: ${otroResponsableCuil.trim()}`;
            
        alert(`Confirmado: Responsable seleccionado - ${responsableFinal}`);
        
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content-pago">
                <h1 className="modal-title">Seleccionar responsable de Pago</h1>
                
                <div className="modal-body-pago">
                    
                    <div className="section-left">
                        <h3 className="section-title-pago">Ocupantes de la Habitación N°{habitacion}</h3>
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
                                            className={responsableSeleccionado?.numeroDocumento === huesped.numeroDocumento ? 'selected-row' : ''}
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

                    <div className="section-right">
                        <h3 className="section-title-pago-right">¿Desea elegir otro responsable de pago?</h3>
                        <p className="input-label-pago">Ingrese su número de CUIL</p>
                        <input 
                            type="text" 
                            placeholder="Ingrese Número de CUIL" 
                            value={otroResponsableCuil}
                            onChange={(e) => {
                                setOtroResponsableCuil(e.target.value);
                                setResponsableSeleccionado(null); 
                                setError('');
                            }}
                            className="cuit-input"
                            maxLength={14} // <<<< APLICAMOS LA RESTRICCIÓN DE LONGITUD AQUÍ
                        />
                        <p className="note-pago">
                            Recuerde que solo puede seleccionar un responsable de pago
                        </p>
                    </div>

                </div>

                <div className="modal-footer-pago">
                    <button onClick={onClose} className="btn-modal-pago cancel">
                        CANCELAR
                    </button>
                    
                    <div className="status-area">
                        <span className="status-label">Responsable Seleccionado</span>
                        <div className="status-box">
                            {responsableSeleccionado 
                                ? `${responsableSeleccionado.apellido}, ${responsableSeleccionado.nombre}`
                                : otroResponsableCuil.trim()
                                ? `CUIL/CUIT: ${otroResponsableCuil}`
                                : "El responsable de pago aún no ha sido seleccionado."}
                        </div>
                         {error && <p className="error-message-modal">{error}</p>}
                    </div>

                    <button onClick={handleConfirm} className="btn-modal-pago confirm">
                        CONFIRMAR
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResponsablePago;