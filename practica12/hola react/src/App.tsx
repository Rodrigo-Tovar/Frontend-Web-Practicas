import { Saludo } from "./Saludo.tsx";
import { TarjetaPerfil } from "./TarjetaPerfil.tsx";

export default function App() {
  return (
    <main className="App">
      <Saludo nombre="ISW" />

      <section className="equipo">
        <TarjetaPerfil
          nombre="Juan Perez"
          carrera="Ingeniería en Sistemas"
          semestre={5}
        />
        <TarjetaPerfil
          nombre="Juan Carlos"
          carrera="Ingeniería en Computación"
          semestre={4}
        />
        <TarjetaPerfil
          nombre="María García"
          carrera="Ingeniería en Electrónica"
          semestre={4}
        />
      </section>
    </main>
  );
}
