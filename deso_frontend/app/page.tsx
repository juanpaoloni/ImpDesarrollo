"use client";

import { useState } from "react";

export default function Home() {
  const [respuesta, setRespuesta] = useState("");

  const llamarBackend = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/hola");
      const data = await res.text();
      setRespuesta(data);
    } catch (error) {
      setRespuesta("Error al conectar al backend");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Test Next.js → Spring Boot</h1>

      <button
        onClick={llamarBackend}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Llamar al backend
      </button>

      <p className="text-lg mt-4">Respuesta: {respuesta}</p>
    </main>
  );
}
