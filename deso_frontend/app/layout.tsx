// app/layout.tsx
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Mi App",
  description: "Descripción...",
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
