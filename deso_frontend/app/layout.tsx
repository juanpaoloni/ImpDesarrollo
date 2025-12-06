// app/layout.tsx
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Sistema Hotelero",
  description: "Implementación de los casos de uso del Sistema Hotelero, grupo: Grimalt, Paoloni, Real, Shmith",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>

        <Navbar />
        {children}
      </body>
    </html>
  );
}
