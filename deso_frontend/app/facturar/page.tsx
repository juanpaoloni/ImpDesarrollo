"use client";

import Navbar from "../components/Navbar.jsx";
import "./formFacturar.css"
import "../globals.css";
import { useState } from "react";

export default function Facturar() {
  const [form, setForm] = useState({
      numeroDeHabitación: "",
      horarioDeSalida: "10:00", 
    });

  const [errors, setErrors] = useState({
    numeroDeHabitación: "",
    horarioDeSalida: "",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
  const { name, value } = e.target;
  
  setErrors(prev => ({ ...prev, [name]: "" })); 

  setForm((prev) => ({ ...prev, [name]: value}));
  }

  const handleRequest = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    let newErrors = {
        numeroDeHabitación: "",
        horarioDeSalida: "",
    };
    let isValid = true;

    if (!form.numeroDeHabitación.trim()) {
        newErrors.numeroDeHabitación = "El número de habitación es obligatorio.";
        isValid = false;
    }
    
    if (!form.horarioDeSalida.trim()) { 
        newErrors.horarioDeSalida = "La hora de salida es obligatoria.";
        isValid = false;
    }

    if (!isValid) {
        setErrors(newErrors);
        return; 
    }
    
    setErrors({ numeroDeHabitación: "", horarioDeSalida: "" });

    try{
      const response = await fetch("http://localhost:8080/facturar/buscar", {
      method: "POST", 
      headers: {
        'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(form)
      }
    );

      if(!response.ok){
        throw new Error("No se encontraron datos de la habitación correspondiente.");
      }

      //ACA FALTA EL MANEJO DE MOVERSE A LA PROXIMA PANTALLA CON LOS DATOS DE FACTURACION
      alert(`Factura encontrada para Habitación ${form.numeroDeHabitación}.`);

    } 
    catch(error){
      console.error(error);
      /*setErrors({ 
        numeroDeHabitación: "La búsqueda falló.", 
        horarioDeSalida: "", 
      });*/
      alert("No se encontraron datos de la habitación correspondiente."); 
    }

  }
  return (
     <main className="fondo">
      <h1 className="titulo">FACTURACIÓN</h1>
      <div className="linea-corta"></div> 
      
      <div className="contenedor_fac">
        <form onSubmit={handleRequest}>

          <h1 className="titulo_fac">Datos del Check Out</h1>
          <h3 className="subtitulo_fac">Ingrese los datos de la habitación a facturar</h3>
          
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
            
            <h3 className="arriba_bot">
                Hora de Salida:
                <span className="obligatorio"> (*)</span> 
            </h3>
            <input 
              type="time"
              name="horarioDeSalida" 
              value={form.horarioDeSalida} 
              onChange={handleChange}
              min="10:00"
              max="18:00"
              className={errors.horarioDeSalida ? 'input-error' : ''} 
            />
            {errors.horarioDeSalida && (
                <p className="mensaje-error-campo">{errors.horarioDeSalida}</p>
            )}
            
            <button type="submit" className="btn">
              Buscar
            </button>

          </div>
        </form>
      </div>
    </main>
  );
}