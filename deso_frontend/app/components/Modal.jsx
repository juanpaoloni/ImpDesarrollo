import "./modal.css"

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

