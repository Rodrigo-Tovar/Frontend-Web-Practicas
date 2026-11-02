import { Route, Routes, Navigate } from "react-router";
import { Layout } from "./componentes/Layout";
import { NoEncontrado } from "./componentes/NoEncontrado";
import PaginaClases from "./paginas/PaginaClases";
import PaginaClase from "./paginas/PaginaClase";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/clases" replace />} />
        
        <Route path="/clases">
          <Route index element={<PaginaClases />} />
        </Route>
        <Route path="/clases/:id" element={<PaginaClase />} />

        <Route path="*" element={<NoEncontrado />} />
        
      </Route>
    </Routes>
  )
}