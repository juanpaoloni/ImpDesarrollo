"use client"  
  
export function parseFechaSinOffsetStr(fechaString) {
  const [y, m, d] = fechaString.split("-").map(Number);
  return new Date(Date.UTC(y, m-1, d+1)); // ← evita el desfase de -3hs
}

export function parseFechaSinOffset(fecha) {
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, "0");
  const day = String(fecha.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}


export function generarFechas(fechaInicio, fechaFin) {

  let inicio = parseFechaSinOffsetStr(fechaInicio);
  const fin = parseFechaSinOffsetStr(fechaFin);

  const fechas = [];

  while (inicio <= fin) {
    fechas.push(new Date(inicio));     // copiar
    inicio = new Date(inicio);         // copiar para evitar mutar referencias
    inicio.setUTCDate(inicio.getUTCDate() + 1); // ← suma 1 día sin tocar timezone local
  }

  return fechas;
}