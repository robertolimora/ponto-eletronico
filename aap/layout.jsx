import React from "react";
import Sidebar from "../components/Sidebar";

export const metadata = { title: "Ponto Eletrônico" };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
