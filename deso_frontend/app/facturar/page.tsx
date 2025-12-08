"use client";

import Navbar from "../components/Navbar.jsx";
import "./formFacturar.css"
import "../globals.css";
import { useState } from "react";
import ResponsablePago from './SeleccionarResponsable.jsx';
import { errorMonitor } from "events";

const OccupationsTable = ({ data }: { data: any[] }) => {
    return (
        <div className="contenedor_fac">
            <h2 className="titulo_fac">Ocupaciones Encontradas</h2>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 5px 8px rgba(0,0,0,0.15)' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#b69f7f', color: 'white' }}>
                            <th style={{ padding: '10px', border: '1px solid #ccc' }}>ID Ocupación</th>
                            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Inicio</th>
                            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Fin Estimado</th>
                            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Estado</th>
                            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Huéspedes (Ej.)</th>
                            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.idOcupacion} style={{ borderBottom: '1px solid #eee', backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                                <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center' }}>{item.idOcupacion}</td>
                                <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center' }}>{item.fechaInicio}</td>
                                <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center' }}>{item.fechaFin}</td>
                                <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center', fontWeight: 'bold', color: item.estado === 'EN_PROCESO' ? '#4CAF50' : '#888' }}>{item.estado}</td>
                                <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                                    {item.huespedes && item.huespedes.length > 0
                                        ? `${item.huespedes[0].nombre} ${item.huespedes[0].apellido}${item.huespedes.length > 1 ? ` (+${item.huespedes.length - 1} más)` : ''}`
                                        : 'N/A'
                                    }
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center' }}>
                                    <button 
                                        onClick={() => alert(`Facturar Ocupación ID: ${item.idOcupacion}`)} 
                                        style={{ padding: '8px 12px', backgroundColor: '#3d352c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                                    >
                                        Facturar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default function Facturar() {
  const [form, setForm] = useState({
      numeroDeHabitación: "",
    });

  const [errors, setErrors] = useState({
    numeroDeHabitación: "",
  });

  const [occupantsData, setOccupantsData] = useState<any[] | null>(null);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
  const { name, value } = e.target;
  
  setErrors(prev => ({ ...prev, [name]: "" })); 

  setForm((prev) => ({ ...prev, [name]: value}));
  }

  const handleRequest = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    let newErrors = {
        numeroDeHabitación: "",
    };
    let isValid = true;

    if (!form.numeroDeHabitación.trim()) {
        newErrors.numeroDeHabitación = "El número de habitación es obligatorio.";
        isValid = false;
    }

    if (!isValid) {
        setErrors(newErrors);
        return; 
    }
    
    setErrors({ numeroDeHabitación: "" });

    try{
      const roomNumber = parseInt(form.numeroDeHabitación, 10);

      if (isNaN(roomNumber)) {
          throw new Error("El número de habitación debe ser un valor numérico.");
      }

      const response = await fetch("http://localhost:8080/facturar/buscar", {
      method: "POST", 
      headers: {
        'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({ numeroDeHabitación: roomNumber })
      }
    );

      if(!response.ok){
        const errorMessage = await response.text(); 
    throw new Error(errorMessage || "Error desconocido al buscar la habitación.");
  }

  const data = await response.json(); 
  
  setOccupantsData(data); 

  setErrors({ numeroDeHabitación: "" });
    } 
    catch(error){
      console.error(error);
      alert("No se encontraron ocupaciones para la habitación correspondiente."); 
      setOccupantsData(null);
    }

  }
  return (
     <main className="fondo">
      <h1 className="titulo">FACTURACIÓN</h1>
      <div className="linea-corta"></div> 

      <div className="contenedor_fac">
        <form onSubmit={handleRequest}>

          <h1 className="titulo_fac">Datos del Check Out</h1>
          <h3 className="subtitulo_fac">Ingrese el número de la habitación a facturar</h3>
          
          <div className="contenedor-campos">
            
            <h3 className="arriba_bot">
                Número de Habitación: 
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
            
            <button type="submit" className="btn">
              Buscar Ocupaciones
            </button>

          </div>
        </form>
      </div>
      
      {occupantsData && occupantsData.length > 0 && (
          <OccupationsTable data={occupantsData} />
      )}
      {occupantsData && occupantsData.length === 0 && (
          <div className="contenedor_fac">
              <p className="mensaje-error-campo">No se encontraron ocupaciones para la habitación seleccionada.</p>
          </div>
      )}
    </main>
  );
}