import { Injectable } from '@nestjs/common';
import { Miembro, NuevoMiembro } from '../dominio/entidades';
import { MiembroRepository } from '../dominio/miembro.repository';

@Injectable()
export class MiembroMemoriaRepository implements MiembroRepository {
  private miembros: Miembro[] = [
    {
      id: 1,
      nombre: 'Ana García',
      correo: 'ana@example.com',
      membresia: 'mensual',
      activo: true,
    },
    {
      id: 2,
      nombre: 'Carlos Ruiz',
      correo: 'carlos@example.com',
      membresia: 'anual',
      activo: true,
    },
    {
      id: 3,
      nombre: 'Elena Díaz',
      correo: 'elena@example.com',
      membresia: 'quincenal',
      activo: false,
    },
  ];
  private siguienteId = 4;

  listar(): Promise<Miembro[]> {
    return Promise.resolve(this.miembros);
  }

  buscarPorId(id: number): Promise<Miembro | null> {
    const miembro = this.miembros.find((m) => m.id === id) || null;
    return Promise.resolve(miembro);
  }

  crear(datos: NuevoMiembro): Promise<Miembro> {
    const nuevoMiembro: Miembro = {
      id: this.siguienteId++,
      nombre: datos.nombre,
      correo: datos.correo,
      membresia: datos.membresia,
      activo: true,
    };
    this.miembros.push(nuevoMiembro);
    return Promise.resolve(nuevoMiembro);
  }

  actualizar(id: number, datos: Partial<Miembro>): Promise<Miembro | null> {
    const miembro = this.miembros.find((m) => m.id === id);
    if (!miembro) {
      return Promise.resolve(null);
    }
    Object.assign(miembro, datos);
    return Promise.resolve(miembro);
  }

  eliminar(id: number): Promise<Miembro | null> {
    const miembro = this.miembros.find((m) => m.id === id);
    if (!miembro) {
      return Promise.resolve(null);
    }
    this.miembros = this.miembros.filter((m) => m.id !== id);
    return Promise.resolve(miembro);
  }
}
