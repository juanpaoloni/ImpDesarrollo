"use client";

import { useState } from "react";

interface Props {
    responsable: any;
    onClose: () => void;
    costos: any;
}

export const SeleccionarItemsFacturar = ({ responsable, onClose, costos }: Props) => {
    const nombre = responsable?.nombre || 'Huésped';

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
                            Monto Total (${total})
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

                    <button onClick={() => alert('Facturando items...')} className="btn-modal-pago resized">
                        ACEPTAR
                    </button>
                </div>
            </div>
        </div>
    );
};
