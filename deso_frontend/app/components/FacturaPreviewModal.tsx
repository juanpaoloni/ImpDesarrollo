"use client";

import React from "react";
import "./FacturaPreviewModal.css";

type ItemsSeleccionados = {
    montoTotal: boolean;
    estadia: boolean;
    bar: boolean;
    sauna: boolean;
    lavado: boolean;
};

type Costos = {
    costoEstadia: number;
    costoBar: number;
    costoSauna: number;
    costoLavado: number;
};

type ResponsablePago = {
    nombre?: string;
    documento?: string;
};

type Props = {
    responsable: ResponsablePago;
    itemsSeleccionados: ItemsSeleccionados;
    costos: Costos;
    posicionIVA: string;
    onClose: () => void;
    onConfirm: () => void;   // <-- agregar
};

const FacturaPreviewModal: React.FC<Props> = ({
    responsable,
    itemsSeleccionados,
    costos,
    posicionIVA,
    onClose,
    onConfirm,
}) => {
    const nombreMostrado =
        `${responsable.nombre ?? ""} - ${responsable.documento ?? ""}`.trim() ||
        "Responsable";

    const calcularTotal = () => {
        let total = 0;

        if (itemsSeleccionados.estadia) total += costos.costoEstadia;
        if (itemsSeleccionados.bar) total += costos.costoBar;
        if (itemsSeleccionados.sauna) total += costos.costoSauna;
        if (itemsSeleccionados.lavado) total += costos.costoLavado;

        return total;
    };

    const totalFinal = calcularTotal();

    return (
        <div className="factura-overlay">
            <div className="factura-modal">
                <h1 className="factura-title">FACTURA - VISTA PREVIA</h1>
                <div className="linea-corta-FPM"></div>
                <h3 className="factura-subtitle">
                    Tipo de factura: {posicionIVA === "RESPONSABLE_INSCRIPTO" ? "A" : "B"}
                </h3>
                <h3 className="factura-subtitle">
                    Responsable:{" "}
                    <span className="factura-responsable">{nombreMostrado}</span>
                </h3>

                <div className="factura-items-box">
                    {itemsSeleccionados.estadia && (
                        <p className="factura-item">
                            Estadía: ${costos.costoEstadia}
                        </p>
                    )}
                    {itemsSeleccionados.bar && (
                        <p className="factura-item">Bar: ${costos.costoBar}</p>
                    )}
                    {itemsSeleccionados.sauna && (
                        <p className="factura-item">
                            Sauna: ${costos.costoSauna}
                        </p>
                    )}
                    {itemsSeleccionados.lavado && (
                        <p className="factura-item">
                            Lavado y Planchado: ${costos.costoLavado}
                        </p>
                    )}
                    <div className="linea-corta-FPM"></div>
                    <p className="factura-item">Subtotal: ${totalFinal}</p>

                    {posicionIVA === "RESPONSABLE_INSCRIPTO" && ( 
                        <p>IVA: ${(totalFinal*0.21).toFixed(2)}</p>
                    )}
                </div>

                <div className="factura-total-box">
                    Total a facturar:{" "}
                    <span className="factura-total">${(totalFinal*1.21).toFixed(2)}</span>
                </div>

                <div className="factura-footer">
                    <button className="factura-btn-cancel" onClick={onClose}>
                        CERRAR
                    </button>
                    <button
                        className="factura-btn-confirm"
                        onClick={onConfirm}
                    >
                        CONFIRMAR
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FacturaPreviewModal;
