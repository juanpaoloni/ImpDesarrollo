"use client"  
  
export function parseFechaSinOffset(fechaString) {
  const [y, m, d] = fechaString.split("-").map(Number);
  return new Date(Date.UTC(y, m-1, d+1)); // ← evita el desfase de -3hs
}

export function generarFechas(fechaInicio, fechaFin) {

  let inicio = parseFechaSinOffset(fechaInicio);
  const fin = parseFechaSinOffset(fechaFin);

  const fechas = [];

  while (inicio <= fin) {
    fechas.push(new Date(inicio));     // copiar
    inicio = new Date(inicio);         // copiar para evitar mutar referencias
    inicio.setUTCDate(inicio.getUTCDate() + 1); // ← suma 1 día sin tocar timezone local
  }

  return fechas;
}