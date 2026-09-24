import { Horario, Miembro } from '../inscripciones/dominio/entidades';

export const HORARIOS: Horario[] = [
  {
    id: 1,
    claseId: 1,
    dia: 'Lunes',
    horaInicio: '09:00',
    cupoMaximo: 15,
    entrenador: 'Laura',
  },
  {
    id: 2,
    claseId: 2,
    dia: 'Martes',
    horaInicio: '18:00',
    cupoMaximo: 10,
    entrenador: 'Miguel',
  },
  {
    id: 3,
    claseId: 3,
    dia: 'Miércoles',
    horaInicio: '20:00',
    cupoMaximo: 12,
    entrenador: 'Sofía',
  },
];

export const MIEMBROS: Miembro[] = [
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
