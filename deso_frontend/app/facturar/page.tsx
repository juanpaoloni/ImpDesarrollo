"use client";

import { useState } from "react";

export default function prueba() {
  const [a, setRta] = useState("");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Prueba conexion front y back end</h1>

    <button 
      onClick={() => setRta("Hola como andas")}
      className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
        botonTest
      </button>

      <p className="text-lg mt-4">Respuesta: {a}</p>
    </main>
  );
}
