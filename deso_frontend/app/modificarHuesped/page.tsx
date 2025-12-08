"use client";

import "../globals.css"
import {validarNumerico, validarTexto, validarDocumento, validarTelefono, validarEmail, validarCuit, validarFechaNoFutura, validarDepartamento } from "../components/Validaciones.jsx"
import "./formHuesped.css"; 
import { useState, useEffect} from "react";
import { useSearchParams } from "next/navigation";
import { ModalBase } from "../components/Modal.jsx"
import { useRouter } from "next/navigation";

type Direccion = {
  idDireccion: number;
  calle: string;
  numero: number;
  departamento: string;
  piso: number;
  codigoPostal: string;
  localidad: string;
  provincia: string;
  pais: string;
};

type Huesped = {
  tipoDocumento: string;
  numeroDocumento: string;
  nombre: string;
  apellido: string;
  CUIT: string;
  posicionIVA: string;
  fechaNacimiento: string; 
  nacionalidad: string;
  email: string;
  telefono: string;
  ocupacion: string;
  direccion: Direccion;
};
export default function modificarHuesped() {
    const router = useRouter();
  const searchParams = useSearchParams();
  const tipoDoc = searchParams.get("tipoDocumento");
  const nroDoc = searchParams.get("nroDocumento");
  const [huesped, setHuesped] = useState<Huesped | null>(null);
  useEffect(() => {
  if (!tipoDoc || !nroDoc) return;

  async function buscar() {
    try {
        const res = await fetch(
          `http://localhost:8080/huespedes/buscarPorId?tipoDocumento=${tipoDoc}&nroDocumento=${nroDoc}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          setHuesped(null);
          return;
        }

        const data: Huesped = await res.json();

        const normalizado: Huesped = {
          ...data,
          cuit: data.CUIT,                 
          direccion: {
            ...data.direccion
          }
        };

        setHuesped(normalizado);
        setForm(normalizado);


      } catch (err) {
        console.error(err);
        alert(err);
      }
    }


    buscar();
  }, [tipoDoc, nroDoc]); 


  const [verPopUp, setVerPopUp] = useState(false);

  const [errores, setErrores] = useState({
    nombre: "",
    apellido: "",
    cuit: "",
    tipoDocumento: "",
    numeroDocumento: "",
    posicionIVA: "",
    fechaNacimiento: "",
    nacionalidad: "",
    email: "",
    telefono: "",
    ocupacion: "",
    direccion: {
      calle: "",
      numero: "",
      departamento: "",
      piso: "",
      codigoPostal: "",
      localidad: "",
      provincia: "",
      pais: "",
    }
  });

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    cuit: "",
    tipoDocumento: "DNI",
    numeroDocumento: "",
    posicionIVA: "CONSUMIDOR_FINAL",
    fechaNacimiento: "",
    nacionalidad: "",
    email: "",
    telefono: "",
    ocupacion: "",
    direccion: {
      calle: "",
      numero: "",
      departamento: "",
      piso: "",
      codigoPostal: "",
      localidad: "",
      provincia: "",
      pais: "",
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("dir_")) {
      const key = name.replace("dir_", "");
      setForm((prev) => ({
        ...prev,
        direccion: { ...prev.direccion, [key]: value }
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetErrores = () =>{
    setErrores({
      nombre: "",
      apellido: "",
      cuit: "",
      tipoDocumento: "",
      numeroDocumento: "",
      posicionIVA: "",
      fechaNacimiento: "",
      nacionalidad: "",
      email: "",
      telefono: "",
      ocupacion: "",
      direccion: {
        calle: "",
        numero: "",
        departamento: "",
        piso: "",
        codigoPostal: "",
        localidad: "",
        provincia: "",
        pais: "",
      }
    });
  }

  const limpiarFormulario = () => {
      setForm({
      nombre: "",
      apellido: "",
      cuit: "",
      tipoDocumento: "DNI",
      numeroDocumento: "",
      posicionIVA: "CONSUMIDOR_FINAL",
      fechaNacimiento: "",
      nacionalidad: "",
      email: "",
      telefono: "",
      ocupacion: "",
      direccion: {
        calle: "",
        numero: "",
        departamento: "",
        piso: "",
        codigoPostal: "",
        localidad: "",
        provincia: "",
        pais: "",
      }
    });
  }

const verificarYMostrarErrores = () => {
  let hayErrores = false;

  if (!validarTexto(form.nombre)){
    setErrores((prev) => ({...prev, nombre: "Nombre inválido (solo letras y espacios)."}));
    hayErrores = true;
  }
  if (!validarTexto(form.apellido)){
    setErrores((prev) => ({...prev, apellido: "Apellido inválido (solo letras y espacios)."}));
    hayErrores = true;
  }

  if (!validarCuit(form.cuit, form.posicionIVA) && !(form.cuit.length)){
    setErrores((prev) => ({...prev, cuit: "Solo puede estar vacio si es exento"}));
    hayErrores = true;
  }

  if (!validarCuit(form.cuit, form.posicionIVA) && (form.cuit.length)){
    setErrores((prev) => ({...prev, cuit: "El cuit debe tener 11 numeros"}));
    hayErrores = true;
  }

  if(!validarDocumento(form.tipoDocumento, form.numeroDocumento) && (form.numeroDocumento)){
    setErrores((prev) => ({...prev, tipoDocumento: "El formato del numero de documentono\ncoincide con su tipo."}));
    hayErrores = true;
  }

  if(!(form.numeroDocumento)){
    setErrores((prev) => ({...prev, numeroDocumento: "El numero de documento esta\nincompleto."}));
    hayErrores = true;
  }

  if(!(form.fechaNacimiento)){
    setErrores((prev) => ({...prev, fechaNacimiento: "La fecha de nacimiento esta incompleta."}));
    hayErrores = true;
  }

  if((form.fechaNacimiento) && !validarFechaNoFutura(form.fechaNacimiento)){
    setErrores((prev) => ({...prev, fechaNacimiento: "La fecha de nacimiento no puede ser\nfutura."}));
    hayErrores = true;
  }

  if(!validarTexto(form.nacionalidad)){
    setErrores((prev) => ({...prev, nacionalidad: "La nacionalidad debe estar compuesta\npor letras."}));
    hayErrores = true;
  }

  if(form.email && !validarEmail(form.email)){
    setErrores((prev) => ({...prev, email: "Email invalido."}));
    hayErrores = true;
  }

  if(!validarTelefono(form.telefono)){
    setErrores((prev) => ({...prev, telefono: "Telefono invalido."}));
    hayErrores = true;
  }

  if(!validarTexto(form.ocupacion)){
    setErrores((prev) => ({...prev, ocupacion: "La ocupacion debe estar compuesta por\nletras."}));
    hayErrores = true;
  }

  if(!validarTexto(form.direccion.calle)){
    setErrores((prev) => ({
        ...prev,
        direccion: { ...prev.direccion, calle: "La calle debe estar compuesta\npor letras." }
      }));
    hayErrores = true;
  }

  if(!validarNumerico(form.direccion.numero)){
    setErrores((prev) => ({
        ...prev,
        direccion: { ...prev.direccion, numero: "El numero no puede tener letras o\n caracteres especiales." }
      }));
    hayErrores = true;
  }

  if(!validarNumerico(form.direccion.codigoPostal)){
    setErrores((prev) => ({
        ...prev,
        direccion: { ...prev.direccion, codigoPostal: "El codigo postal no puede tener\nletras o caracteres especiales." }
      }));
    hayErrores = true;
  }

  if(!validarTexto(form.direccion.localidad)){
    setErrores((prev) => ({
        ...prev,
        direccion: { ...prev.direccion, localidad: "Localidad Invalida." }
      }));
    hayErrores = true;
  }

  if(!validarTexto(form.direccion.localidad)){
    setErrores((prev) => ({
        ...prev,
        direccion: { ...prev.direccion, localidad: "Localidad Invalida." }
      }));
    hayErrores = true;
  }

  if(!validarTexto(form.direccion.provincia)){
    setErrores((prev) => ({
        ...prev,
        direccion: { ...prev.direccion, provincia: "Provincia Invalida." }
      }));
    hayErrores = true;
  }
  
  
  if(!validarTexto(form.direccion.pais)){
    setErrores((prev) => ({
        ...prev,
        direccion: { ...prev.direccion, pais: "Pais Invalido." }
      }));
    hayErrores = true;
  }

  if(form.direccion.departamento && !form.direccion.piso){
    setErrores((prev) => ({
        ...prev,
        direccion: { ...prev.direccion, piso: "Si completa el departamento debe\ncompletar el piso" }
      }));
    hayErrores = true;
  }

  if(!form.direccion.departamento && form.direccion.piso){
    setErrores((prev) => ({
        ...prev,
        direccion: { ...prev.direccion, departamento: "Si completa el piso debe completar\nel departamento" }
      }));
    hayErrores = true;
  }

  if(form.direccion.piso && !validarNumerico(form.direccion.piso)){
    setErrores((prev) => ({
        ...prev,
        direccion: { ...prev.direccion, piso: "Piso invalido." }
      }));
    hayErrores = true;
  }

  if(form.direccion.departamento && !validarDepartamento(form.direccion.departamento)){
    setErrores((prev) => ({
        ...prev,
        direccion: { ...prev.direccion, departamento: "Departamento invalido, debe tener\nuna letra seguida de numeros o -" }
      }));
    hayErrores = true;
  }

  return hayErrores;
}

const handleClosePopUp = () => {
  setVerPopUp(false);


  router.push("/");
}

const handleSubmit = async (e) => {
  e.preventDefault();

  resetErrores();

  if(verificarYMostrarErrores()){
    return;
  }


  try {
    const response = await fetch("http://localhost:8080/huespedes/modificar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error("Error al guardar el huésped");
    }

    setVerPopUp(true);

    // Limpiar formulario
    limpiarFormulario();

  } catch (error) {
    alert("Hubo un problema al guardar.");
  }
};


  return (
    <main className="fondo">
      <h1 className="titulo">Modificar Huesped</h1>
      <div className="linea-corta"></div>
      <h3 className="subtitulo">Ingrese los datos del huesped {huesped?.nombre} {huesped?.apellido}</h3>

      <form className="form-MH" onSubmit={handleSubmit}>

        <div className="contenedor-MH">
          <div className="subcontenedor-MH">
            <h2 className="subtitulo-MH">Datos del Huesped</h2>

            <div className="grid-MH">
              <div>
                <p className="label-MH">Nombre</p>
                <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" />
                {errores.nombre && <p className="error-MH">{errores.nombre}</p>}
              </div>

              <div>
                <p className="label-MH">Apellido</p>
                <input name="apellido" value={form.apellido} onChange={handleChange} placeholder="Apellido" />
                {errores.apellido && <p className="error-MH">{errores.apellido}</p>}
              </div>    

             
              <div>
                <p className="label-MH">Tipo de documento</p>
                <select name="tipoDocumento" value={form.tipoDocumento} onChange={handleChange} disabled>
                  <option value="DNI">DNI</option>
                  <option value="LE">LE</option>
                  <option value="LC">LC</option>
                  <option value="PASAPORTE">PASAPORTE</option>
                  <option value="OTRO">OTRO</option>
                </select>
                {errores.tipoDocumento && <p className="error-MH">{errores.tipoDocumento}</p>}
              </div>

              <div>
                <p className="label-MH">Número de documento</p>
                <input name="numeroDocumento" value={form.numeroDocumento} onChange={handleChange} placeholder="Número Documento" readOnly/>
                {errores.numeroDocumento && <p className="error-MH">{errores.numeroDocumento}</p>}
              </div>

              <div>
                <p className="label-MH">CUIT</p>
                <input name="cuit" value={form.cuit ?? ""} onChange={handleChange} placeholder="CUIT" />
                {errores.cuit && <p className="error-MH">{errores.cuit}</p>}
              </div>


              <div>
                <p className="label-MH">Posición frente al IVA</p>
                <select name="posicionIVA" value={form.posicionIVA} onChange={handleChange}>
                  <option value="CONSUMIDOR_FINAL">Consumidor Final</option>
                  <option value="EXENTO">Exento</option>
                  <option value="MONOTRIBUTISTA">Monotributista</option>
                  <option value="RESPONSABLE_INSCRIPTO">Responsable Inscripto</option>
                </select>
              </div>

              <div>
                <p className="label-MH">Fecha de Nacimiento</p>
                <input type="date" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} />
                {errores.fechaNacimiento && <p className="error-MH">{errores.fechaNacimiento}</p>}
              </div>

              <div>
                <p className="label-MH">Nacionalidad</p>
                <input name="nacionalidad" value={form.nacionalidad} onChange={handleChange} placeholder="Nacionalidad" />
                {errores.nacionalidad && <p className="error-MH">{errores.nacionalidad}</p>}
              </div>

              <div>
                <p className="label-MH">Correo Electrónico</p>
                <input name="email" value={form.email} onChange={handleChange} placeholder="Email (opcional)" />
                {errores.email && <p className="error-MH">{errores.email}</p>}
              </div>

              <div>
                <p className="label-MH">Teléfono</p>
                <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" />
                {errores.telefono && <p className="error-MH">{errores.telefono}</p>}
              </div>

              <div>
                <p className="label-MH">Ocupación</p>
                <input name="ocupacion" value={form.ocupacion} onChange={handleChange} placeholder="Ocupación" />
                {errores.ocupacion && <p className="error-MH">{errores.ocupacion}</p>}
              </div>
            </div>
          </div>

            <div className="subcontenedor-MH">
            <h2 className="subtitulo-MH">Dirección</h2>

            <div className="grid-MH">
              <div>
                <p className="label-MH">Calle</p>
                <input name="dir_calle" value={form.direccion.calle} onChange={handleChange} placeholder="Calle" />
                {errores.direccion.calle && <p className="error-MH">{errores.direccion.calle}</p>}
              </div>

              <div>
                <p className="label-MH">Número/Altura</p>
                <input name="dir_numero" value={form.direccion.numero} onChange={handleChange} placeholder="Número" />
                {errores.direccion.numero && <p className="error-MH">{errores.direccion.numero}</p>}
              </div>

              <div>
                <p className="label-MH">Departamento</p>
                <input name="dir_departamento" value={form.direccion.departamento} onChange={handleChange} placeholder="Departamento (opcional)" />
                {errores.direccion.departamento && <p className="error-MH">{errores.direccion.departamento}</p>}
              </div>

              <div>
                <p className="label-MH">Piso</p>
                <input name="dir_piso" value={form.direccion.piso} onChange={handleChange} placeholder="Piso (opcional)" />
                {errores.direccion.piso && <p className="error-MH">{errores.direccion.piso}</p>}
              </div>

              <div>
                <p className="label-MH">Código Postal</p>
                <input name="dir_codigoPostal" value={form.direccion.codigoPostal} onChange={handleChange} placeholder="Código Postal" />
                {errores.direccion.codigoPostal && <p className="error-MH">{errores.direccion.codigoPostal}</p>}
              </div>

              <div>
                <p className="label-MH">Localidad</p>
                <input name="dir_localidad" value={form.direccion.localidad} onChange={handleChange} placeholder="Localidad" />
                {errores.direccion.localidad && <p className="error-MH">{errores.direccion.localidad}</p>}
              </div>

              <div>
                <p className="label-MH">Provincia</p>
                <input name="dir_provincia" value={form.direccion.provincia} onChange={handleChange} placeholder="Provincia" />
                {errores.direccion.provincia && <p className="error-MH">{errores.direccion.provincia}</p>}
              </div>

              <div>
                <p className="label-MH">País</p>
                <input name="dir_pais" value={form.direccion.pais} onChange={handleChange} placeholder="País" />
                {errores.direccion.pais && <p className="error-MH">{errores.direccion.pais}</p>}
              </div>

            </div>
          </div>
        </div>

        <div className="contenedor-botones-MH">
          <button type="submit" className="btn-MH">Modificar</button>
        </div>
      </form>

      <ModalBase visible={verPopUp} onClose={handleClosePopUp}>
        <h2>¡Exito!</h2>
        <p>El huesped ha sido modificado correctamente</p>
        </ModalBase>

    </main>
  );
}
