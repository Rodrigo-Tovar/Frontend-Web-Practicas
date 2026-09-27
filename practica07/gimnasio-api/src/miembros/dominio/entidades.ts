export interface Miembro {
  id: number;
  nombre: string;
  correo: string;
  membresia: string;
  activo: boolean;
}

export type NuevoMiembro = Omit<Miembro, 'id' | 'activo'>;
