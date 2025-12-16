import "./modal.css"

import { useState } from "react";

export function ModalBase({ visible, onClose, children }) {
  if (!visible) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-contenido"
        onClick={(e) => e.stopPropagation()} // evita que el click cierre el modal
      >
        {children}

        <button className="modal-btn cerrar" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export function ModalAdvertencia({ visible, onClose, onAceptar, children }) {
  if (!visible) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-contenido advertencia"
        onClick={(e) => e.stopPropagation()} // evita que el click cierre el modal
      >
        {children}
        <div className="modal-boton-contenedor">
          <button className="modal-btn cancelar" onClick={onClose}>
            Cancelar
          </button>

          <button className="modal-btn aceptar" onClick={onAceptar}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

export function ModalError({ visible, onClose, children }) {
  if (!visible) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-contenido error"
        onClick={(e) => e.stopPropagation()} // evita que el click cierre el modal
      >
        {children}

        <button className="modal-btn cerrar-error" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}


export function ModalMotivo({ visible, onClose, onAceptar }) {
  const [motivo, setMotivo] = useState("");
  
  const [error, mostrarError] = useState(false);

  if (!visible) return null;

  const handleAceptar = () => {
    mostrarError(false);
    if (motivo.trim().length === 0) {
      mostrarError(true);
      return;
    }
    onAceptar(motivo); // manda el motivo al padre
    setMotivo("");     // limpia campo
  };

  const handleClose = () =>{
    mostrarError(false);
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="modal-contenido texto"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Motivo de cancelación</h3>

        <textarea
          className="modal-textarea"
          placeholder="Ingrese el motivo..."
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        />

        {error && <h3 className="mensaje-error-campo-M">Debe ingresar un motivo</h3>} 

        

        <div className="modal-boton-contenedor">
          <button className="modal-btn cancelar" onClick={handleClose}>
            Cancelar
          </button>

          <button className="modal-btn aceptar" onClick={handleAceptar}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

