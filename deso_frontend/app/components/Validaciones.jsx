"use client"

export function validarDocumento(tipo, valor){
    const t = tipo.toUpperCase();


    if(["DNI", "LE", "LC"].includes(t))
        return /^[0-9]{7,10}$/.test(valor);
    else if (t === "PASAPORTE")
        return /^[A-Z]{2}[0-9]{7,10}$/.test(valor);

    return false;
}

export function validarTexto(valor){
    return /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]{2,40}$/.test(valor)
}

export function validarCuit(valor){
    return /^[0-9]{11}$/.test(valor)
}

export function validarEmail(valor){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)
}

export function validarNumerico(valor){
    return /^[0-9]{1, 20}$/.test(valor)
}

export function validarTelefono(valor){
    return /^\+?[0-9]{10,16}$/.test(valor)
}

export function validarFormatoFecha(valor) {
  // MM-DD-YYYY
  return /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/.test(valor);
}

export function validarFechaNoFutura(valor) {
  // convertir MM-DD-YYYY a Date
  const [mes, dia, anio] = valor.split("-").map(Number);
  const fecha = new Date(anio, mes - 1, dia);

  const hoy = new Date();
  hoy.setHours(0,0,0,0);
  fecha.setHours(0,0,0,0);

  return fecha <= hoy;
}

export function validarRangoFechas(fechaInicio, fechaFin) {
  const [anioI, mesI, diaI] = fechaInicio.split("-").map(Number);
  const [anioF, mesF, diaF] = fechaFin.split("-").map(Number);

  const inicio = new Date(anioI, mesI - 1, diaI);
  const fin = new Date(anioF, mesF - 1, diaF);


  inicio.setHours(0,0,0,0);
  fin.setHours(0,0,0,0);

  return inicio <= fin;
}




