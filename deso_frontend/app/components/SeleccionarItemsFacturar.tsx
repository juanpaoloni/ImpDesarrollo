"use client";

import { useState } from "react";
import { ModalError } from "./Modal.jsx"

interface Props {
    responsable: any;
    onClose: () => void;
    costos: any;
    onConfirm: (itemsSeleccionados: any) => void; // ← NUEVO
}

export const SeleccionarItemsFacturar = ({ responsable, onClose, costos, onConfirm }: Props) => {
    const nombre = responsable?.nombre || 'Huésped';

    const [popuperror, setPopuperror] = useState(false);

    const [items, setItems] = useState({
        montoTotal: false,
        estadia: false,
        bar: false,
        sauna: false,
        lavado: false,
    });

    const toggleItem = (key: string) => {
        setItems(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const total =
        (items.estadia ? costos.costoEstadia : 0) +
        (items.bar ? costos.costoBar : 0) +
        (items.sauna ? costos.costoSauna : 0) +
        (items.lavado ? costos.costoLavado : 0);

    const handleAceptar = () => {
        if(
            (!items.estadia && (costos.costoEstadia != 0)) ||
            (!items.bar && (costos.costoBar!= 0)) ||
            (!items.sauna && (costos.costoSauna != 0)) ||
            (!items.lavado && (costos.costoLavado != 0)) ||
            (!items.montoTotal)
        )
        setPopuperror(true);
        else{
            onConfirm(items);
            onClose();
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content-pago-IF"> 
                <h1 className="modal-title">ITEMS DE FACTURACIÓN</h1>
                
                   <h3 className="section-title-pago-SRP" style={{
                    paddingLeft: '20px',
                    margin: '10px 0 20px 0',
                    border: 'none'
                }}>
                    Seleccione los ítems a Facturar por: 
                    <span style={{ fontWeight: 'normal', fontStyle: 'italic', marginLeft: '5px' }}>
                        {nombre}
                    </span>
                </h3>
                
                <div className="modal-body-pago-IF items-selection-grid">
                    
                        <label className="item-label-group">
                            <input type="checkbox"
                                   checked={items.montoTotal}
                                   onChange={() => toggleItem("montoTotal")}
                            /> 
                            Monto Total (Sin IVA) (${total})
                        </label>

                        <label className="item-label-group">
                            <input type="checkbox"
                                   checked={items.estadia}
                                   onChange={() => toggleItem("estadia")}
                            /> 
                            Estadía (${costos.costoEstadia})
                        </label>
                    


                        <label className="item-label-group">
                            <input type="checkbox"
                                   checked={items.bar}
                                   onChange={() => toggleItem("bar")}
                            />
                            Bar (${costos.costoBar})
                        </label>

                        <label className="item-label-group">
                            <input type="checkbox"
                                   checked={items.sauna}
                                   onChange={() => toggleItem("sauna")}
                            />
                            Sauna (${costos.costoSauna})
                        </label>

                        <label className="item-label-group">
                            <input type="checkbox"
                                   checked={items.lavado}
                                   onChange={() => toggleItem("lavado")}
                            />
                            Lavado y Planchado (${costos.costoLavado})
                        </label>
                </div>

                <div className="modal-footer-pago items-footer">
                    <button onClick={onClose} className="btn-modal-pago resized">
                        VOLVER ATRAS
                    </button>
                    
                    <div style={{ flexGrow: 1 }}></div>

                    <button onClick={handleAceptar} className="btn-modal-pago resized">
                        ACEPTAR
                    </button>
                </div>
            </div>
            {popuperror && (
                <ModalError 
                    visible={popuperror}
                    onClose={() => setPopuperror(false)}
                >
                    <h2>¡Error!</h2>
                    <p>Aseguresé de tildar todos los campos que tengan un costo mayor a 0.</p>
                </ModalError>
            )}
        </div>    
    );
};