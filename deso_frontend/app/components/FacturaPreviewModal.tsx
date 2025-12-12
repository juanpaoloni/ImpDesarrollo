"use client";

import React from "react";
import "./FacturaPreviewModal.css";
import { useState } from "react";

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
                        <div className="factura-item">
                            <span className="nombre-item">Estadía:</span> 
                            <span className="precio-fac">${costos.costoEstadia}</span>
                        </div>
                    )}
                    {itemsSeleccionados.bar && (
                        <div className="factura-item">
                            <span className="nombre-item">Bar:</span> 
                            <span className="precio-fac">${costos.costoBar}</span>
                        </div>
                    )}
                    {itemsSeleccionados.sauna && (
                        <div className="factura-item">
                            <span className="nombre-item">Sauna:</span> 
                            <span className="precio-fac">${costos.costoSauna}</span>
                        </div>
                    )}
                    {itemsSeleccionados.lavado && (
                        <div className="factura-item">
                            <span className="nombre-item">Lavado y Planchado:</span> 
                            <span className="precio-fac">${costos.costoLavado}</span>
                        </div>
                    )}
                    <div className="linea-corta-FPM"></div>
                        <div className="factura-item">
                            <span className="nombre-item">Sub-total:</span> 
                            <span className="precio-fac">${totalFinal}</span>
                        </div>

                    {posicionIVA === "RESPONSABLE_INSCRIPTO" && ( 
                        <div className="factura-item">
                            <span className="nombre-item">Impuesto al valor agregado:</span> 
                            <span className="precio-fac">${(totalFinal*0.21).toFixed(2)}</span>
                        </div>
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
