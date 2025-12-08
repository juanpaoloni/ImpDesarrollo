  "use client";

  import Navbar from "../components/Navbar.jsx";
  import "./formFacturar.css"
  import "../globals.css";
  import { useState } from "react";
  import ResponsablePago from './SeleccionarResponsable';


  const OccupationsTable = ({ data, hasSearched, onFacturarClick }: { data: any[] | null, hasSearched: boolean, onFacturarClick: (occupation: any) => void }) => {
      
      if (!data && !hasSearched) {
          return (
              <div style={{ flexGrow: 1, minWidth: '400px' }}>
                  <div style={{ maxWidth: '650px', margin: '0', padding: '0', borderRadius: '10px'}}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                              <tr style={{ backgroundColor: '#b69f7f', color: 'white' }}>
                                  <th style={{ padding: '10px', border: '1px solid #ccc' }}>ID Ocupación</th>
                                  <th style={{ padding: '10px', border: '1px solid #ccc' }}>Fecha Inicio</th>
                                  <th style={{ padding: '10px', border: '1px solid #ccc' }}>Fecha Fin</th>
                                  <th style={{ padding: '10px', border: '1px solid #ccc' }}>Estado</th>
                                  <th style={{ padding: '10px', border: '1px solid #ccc' }}>Acción</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr key="no-search-yet" style={{ borderBottom: '1px solid #eee', backgroundColor: 'white' }}>
                                  <td colSpan={5} style={{ padding: '20px', border: '1px solid #ccc', textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                                      Ingrese un número de habitación y presione "Buscar Ocupaciones"
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
          );
      }

      const sortedData = data ? [...data].sort((a, b) => {
          const isAInProcess = a.estado === 'EN_PROCESO';
          const isBInProcess = b.estado === 'EN_PROCESO';
          if (isAInProcess && !isBInProcess) return -1; 
          if (!isAInProcess && isBInProcess) return 1;  
          return b.fechaInicio.localeCompare(a.fechaInicio); 
      }) : [];
      
      return (
          <div style={{ flexGrow: 1, minWidth: '400px' }}>
              <div style={{ maxWidth: '650px', margin: '0', padding: '0', borderRadius: '10px'}}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                          <tr style={{ backgroundColor: '#b69f7f', color: 'white' }}>
                              <th style={{ padding: '10px', border: '1px solid #ccc' }}>ID Ocupación</th>
                              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Fecha Inicio</th>
                              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Fecha Fin</th>
                              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Estado</th>
                              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Acción</th>
                          </tr>
                      </thead>
                      <tbody>
                          {sortedData.length > 0 ? (
                              sortedData.map((item, index) => (
                                  <tr key={item.idOcupacion} style={{ borderBottom: '1px solid #eee', backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                                      <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center' }}>{item.idOcupacion}</td>
                                      <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center' }}>{item.fechaInicio}</td>
                                      <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center' }}>{item.fechaFin}</td>
                                      <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center', fontWeight: 'bold', color: item.estado === 'EN_PROCESO' ? '#4CAF50' : '#888' }}>{item.estado}</td>
                                      <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center' }}>
                                          {item.estado === 'EN_PROCESO' && (
                                            <button 
                                                onClick={() => onFacturarClick(item)} 
                                                style={{ padding: '8px 12px', backgroundColor: '#3d352c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                                            >
                                                Facturar
                                            </button>)}
                                      </td>
                                  </tr>
                              ))
                          ) : (
                              <tr key="no-results" style={{ borderBottom: '1px solid #eee', backgroundColor: 'white' }}>
                                  <td colSpan={5} style={{ padding: '20px', border: '1px solid #ccc', textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                                      {hasSearched ? "Búsqueda completada. Revise el campo de habitación o intente otra búsqueda." : "Cargando..."}
                                  </td>
                              </tr>
                          )}
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
      const [hasSearched, setHasSearched] = useState(false); 

      const [showModal, setShowModal] = useState(false);
      const [selectedOccupation, setSelectedOccupation] = useState<any | null>(null);


      const handleChange = (e: { target: { name: any; value: any; }; }) => {
          const { name, value } = e.target;
          
          setErrors(prev => ({ ...prev, [name]: "" })); 

          setForm((prev) => ({ ...prev, [name]: value}));
      }

      const handleRequest = async (e: { preventDefault: () => void; }) => {
          e.preventDefault();
          const roomNumberValue = form.numeroDeHabitación.trim();
          setHasSearched(true); 

          let newErrors = {
              numeroDeHabitación: "",
          };
          let isValid = true;

          if (!roomNumberValue) {
              newErrors.numeroDeHabitación = "El número de habitación es obligatorio.";
              isValid = false;
          }
          
          const integerRegex = /^\d+$/; 
          if (roomNumberValue && !integerRegex.test(roomNumberValue)) {
              newErrors.numeroDeHabitación = "Solo se permiten números enteros (sin letras ni espacios).";
              isValid = false;
          }


          if (!isValid) {
              setErrors(newErrors);
              setOccupantsData(null);
              return; 
          }
          
          const roomNumber = parseInt(form.numeroDeHabitación, 10);
          
          if (isNaN(roomNumber) || roomNumber <= 0) {
              newErrors.numeroDeHabitación = "Ingrese un número de habitación válido (> 0).";
              setErrors(newErrors);
              setOccupantsData(null); 
              return;
          }


          setErrors({ numeroDeHabitación: "" });
          setOccupantsData(null); 

          try{
              const response = await fetch(`http://localhost:8080/ocupaciones/obtenerPorHabitacion?numeroHabitacion=${roomNumber}`);

              if(!response.ok){
                  const errorMessage = await response.text(); 
                  throw new Error(errorMessage || "Error desconocido al buscar la habitación.");
              }

              const data = await response.json(); 
          
              if (data.length === 0) {
                  newErrors.numeroDeHabitación = "No se encontraron ocupaciones para la habitación correspondiente.";
                  setErrors(newErrors);
                  setOccupantsData([]);
                  return;
              }

              setOccupantsData(data); 
              setErrors({ numeroDeHabitación: "" });
          } 
          catch(error){
              console.error(error);
              const errorMessageText = "Error al conectar con el servicio o habitación no encontrada.";
              newErrors.numeroDeHabitación = errorMessageText;
              setErrors(newErrors);
              setOccupantsData([]); 
          }

      }
      
      const handleFacturarClick = (occupation: any) => {
          setSelectedOccupation(occupation);
          setShowModal(true);
      };

      const handleCloseModal = () => {
          setShowModal(false);
          setSelectedOccupation(null);
      };
      
      
      return (
          <main className="fondo">
              <h1 className="titulo">FACTURACIÓN</h1>
              <div className="linea-corta"></div> 

              <h1 className="titulo_fac">Datos del Check Out</h1>
              <h3 className="subtitulo_fac">Ingrese el número de la habitación a facturar</h3>

              <div className="layout-horizontal">
                  
                  <div className="contenedor_fac" style={{ margin: '0', marginTop: '40px' }}> 
                      <form onSubmit={handleRequest}>
                          <div className="contenedor-campos" style={{marginTop: '0'}}>
                              
                              <h3 className="arriba_bot">
                                  Número de Habitación 
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
                  
                  <OccupationsTable 
                      data={occupantsData} 
                      hasSearched={hasSearched} 
                      onFacturarClick={handleFacturarClick} 
                  />
              </div>
              
              {showModal && selectedOccupation && (
                  <ResponsablePago 
                      habitacion={form.numeroDeHabitación}
                      
                      ocupantes={selectedOccupation.huespedes || []} 
                      onClose={handleCloseModal}
                  />
              )}
          </main>
      );
  }