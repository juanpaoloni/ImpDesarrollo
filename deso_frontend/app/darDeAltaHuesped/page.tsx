"use client";

import "../globals.css"
import {validarNumerico, validarTexto, validarDocumento, validarTelefono, validarEmail, validarCuit, validarFechaNoFutura, validarDepartamento } from "../components/Validaciones.jsx"
import "./formHuesped.css"; 
import { useState } from "react";
import { ModalBase, ModalAdvertencia } from "../components/Modal.jsx";
import { useRouter } from "next/navigation";

export default function darDeAlta() {

  const router = useRouter();

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

  const handleDeshacer = () => {
    resetErrores();
    limpiarFormulario();
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

const [popupvisible, setVisible] = useState({
  advertencia:false,
  confirmacion:false,
})

const handleSubmit = async (e: any) => {
  e.preventDefault();

  resetErrores();

  if(verificarYMostrarErrores()){
    return;
  }


  try {
    const hayDuplicadosResponse = await fetch (`http://localhost:8080/huespedes/tieneDuplicados?tipoDocumento=${form.tipoDocumento}&nroDocumento=${form.numeroDocumento}`)
    const hayDuplicados = await hayDuplicadosResponse.text();

    if(hayDuplicados === "true"){
      setVisible((prev) => ({...prev, advertencia:true}));
      return;
    }

    const response = await fetch("http://localhost:8080/huespedes/darDeAlta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error("Error al guardar el huésped");
    }

    setVisible((prev) => ({...prev, confirmacion:true}));

    limpiarFormulario();

  } catch (error) {
    alert("Hubo un problema al guardar.");
  }
};


  return (
    <main className="fondo">
      <h1 className="titulo">Dar de Alta Huesped</h1>
      <div className="linea-corta"></div>
      <h3 className="subtitulo">Ingrese los datos del huesped que quiere cargar</h3>

      <form className="form-DAH" onSubmit={handleSubmit}>

        <div className="contenedor-DAH">
          <div className="subcontenedor-DAH">
            <h2 className="subtitulo-DAH">Datos del Huesped</h2>

            <div className="grid-DAH">
              <div>
                <p className="label-DAH">Nombre</p>
                <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" />
                {errores.nombre && <p className="error-DAH">{errores.nombre}</p>}
              </div>

              <div>
                <p className="label-DAH">Apellido</p>
                <input name="apellido" value={form.apellido} onChange={handleChange} placeholder="Apellido" />
                {errores.apellido && <p className="error-DAH">{errores.apellido}</p>}
              </div>    

             
              <div>
                <p className="label-DAH">Tipo de documento</p>
                <select name="tipoDocumento" value={form.tipoDocumento} onChange={handleChange}>
                  <option value="DNI">DNI</option>
                  <option value="LE">LE</option>
                  <option value="LC">LC</option>
                  <option value="PASAPORTE">PASAPORTE</option>
                  <option value="OTRO">OTRO</option>
                </select>
                {errores.tipoDocumento && <p className="error-DAH">{errores.tipoDocumento}</p>}
              </div>

              <div>
                <p className="label-DAH">Número de documento</p>
                <input name="numeroDocumento" value={form.numeroDocumento} onChange={handleChange} placeholder="Número Documento" />
                {errores.numeroDocumento && <p className="error-DAH">{errores.numeroDocumento}</p>}
              </div>

              <div>
                <p className="label-DAH">CUIT</p>
                <input name="cuit" value={form.cuit} onChange={handleChange} placeholder="CUIT" />
                {errores.cuit && <p className="error-DAH">{errores.cuit}</p>}
              </div>


              <div>
                <p className="label-DAH">Posición frente al IVA</p>
                <select name="posicionIVA" value={form.posicionIVA} onChange={handleChange}>
                  <option value="CONSUMIDOR_FINAL">Consumidor Final</option>
                  <option value="EXENTO">Exento</option>
                  <option value="MONOTRIBUTISTA">Monotributista</option>
                  <option value="RESPONSABLE_INSCRIPTO">Responsable Inscripto</option>
                </select>
              </div>

              <div>
                <p className="label-DAH">Fecha de Nacimiento</p>
                <input type="date" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} />
                {errores.fechaNacimiento && <p className="error-DAH">{errores.fechaNacimiento}</p>}
              </div>

              <div>
                <p className="label-DAH">Nacionalidad</p>
                <input name="nacionalidad" value={form.nacionalidad} onChange={handleChange} placeholder="Nacionalidad" />
                {errores.nacionalidad && <p className="error-DAH">{errores.nacionalidad}</p>}
              </div>

              <div>
                <p className="label-DAH">Correo Electrónico</p>
                <input name="email" value={form.email} onChange={handleChange} placeholder="Email (opcional)" />
                {errores.email && <p className="error-DAH">{errores.email}</p>}
              </div>

              <div>
                <p className="label-DAH">Teléfono</p>
                <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" />
                {errores.telefono && <p className="error-DAH">{errores.telefono}</p>}
              </div>

              <div>
                <p className="label-DAH">Ocupación</p>
                <input name="ocupacion" value={form.ocupacion} onChange={handleChange} placeholder="Ocupación" />
                {errores.ocupacion && <p className="error-DAH">{errores.ocupacion}</p>}
              </div>
            </div>
          </div>

          <div className="linea-vertical"></div>

            <div className="subcontenedor-DAH">
            <h2 className="subtitulo-DAH">Dirección</h2>

            <div className="grid-DAH">
              <div>
                <p className="label-DAH">Calle</p>
                <input name="dir_calle" value={form.direccion.calle} onChange={handleChange} placeholder="Calle" />
                {errores.direccion.calle && <p className="error-DAH">{errores.direccion.calle}</p>}
              </div>

              <div>
                <p className="label-DAH">Número/Altura</p>
                <input name="dir_numero" value={form.direccion.numero} onChange={handleChange} placeholder="Número" />
                {errores.direccion.numero && <p className="error-DAH">{errores.direccion.numero}</p>}
              </div>

              <div>
                <p className="label-DAH">Departamento</p>
                <input name="dir_departamento" value={form.direccion.departamento} onChange={handleChange} placeholder="Departamento (opcional)" />
                {errores.direccion.departamento && <p className="error-DAH">{errores.direccion.departamento}</p>}
              </div>

              <div>
                <p className="label-DAH">Piso</p>
                <input name="dir_piso" value={form.direccion.piso} onChange={handleChange} placeholder="Piso (opcional)" />
                {errores.direccion.piso && <p className="error-DAH">{errores.direccion.piso}</p>}
              </div>

              <div>
                <p className="label-DAH">Código Postal</p>
                <input name="dir_codigoPostal" value={form.direccion.codigoPostal} onChange={handleChange} placeholder="Código Postal" />
                {errores.direccion.codigoPostal && <p className="error-DAH">{errores.direccion.codigoPostal}</p>}
              </div>

              <div>
                <p className="label-DAH">Localidad</p>
                <input name="dir_localidad" value={form.direccion.localidad} onChange={handleChange} placeholder="Localidad" />
                {errores.direccion.localidad && <p className="error-DAH">{errores.direccion.localidad}</p>}
              </div>

              <div>
                <p className="label-DAH">Provincia</p>
                <input name="dir_provincia" value={form.direccion.provincia} onChange={handleChange} placeholder="Provincia" />
                {errores.direccion.provincia && <p className="error-DAH">{errores.direccion.provincia}</p>}
              </div>

              <div>
                <p className="label-DAH">País</p>
                <input name="dir_pais" value={form.direccion.pais} onChange={handleChange} placeholder="País" />
                {errores.direccion.pais && <p className="error-DAH">{errores.direccion.pais}</p>}
              </div>

            </div>
          </div>
        </div>

        <div className="contenedor-botones-DAH">
          <button type="button" className="btn-DAH" onClick={handleDeshacer}>Deshacer</button>
          <button type="submit" className="btn-DAH">Dar de Alta</button>
        </div>
      </form>

      <ModalAdvertencia visible={popupvisible.advertencia} onClose={() => (setVisible((prev) => ({...prev, advertencia:false})))} onAceptar={() => router.push(`/modificarHuesped?tipoDocumento=${form.tipoDocumento}&nroDocumento=${form.numeroDocumento}`)}>
        <h2>¡Advertencia!</h2>
        <p>El tipo y numero de documento que esta intentando ingresar ya existen en el sistema<br/>¿Desea modificar al huésped existente en su lugar?</p>
      </ModalAdvertencia>

      <ModalBase visible={popupvisible.confirmacion} onClose={() => (setVisible((prev) => ({...prev, confirmacion:false})))}>
        <h2>¡Exito!</h2>
        <p>El huesped fue cargado correctamente.</p>
      </ModalBase>

    </main>
  );
}
