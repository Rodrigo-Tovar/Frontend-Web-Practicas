# Gimnasio API — Código base (Semana 5)

API REST en NestJS para el gimnasio: `Clases`, `Horarios`, `Miembros` e `Inscripciones`, cada
módulo con dominio, DTOs e infraestructura separados (patrón repositorio + inyección por token).
Los datos viven en memoria — ningún repositorio se conecta todavía a una base de datos real.

Este proyecto es el punto de partida de la Práctica 8 (Prisma) y la Práctica 9 (Blindar la API).

## Cómo correrlo

```bash
npm install
npm run start:dev
```

El servidor levanta en `http://localhost:3000`. En `peticiones.http` está la batería completa de
pruebas (requiere la extensión "REST Client" de VS Code).

## Estructura

```
src/
  clases/        CRUD de clases del gimnasio
  horarios/      CRUD de horarios (día, hora, cupo, entrenador)
  miembros/      CRUD de miembros del gimnasio
  inscripciones/ inscribir a un miembro a un horario, con reglas de cupo y duplicados
  datos/         datos de arranque (seed) que usan Horarios y Miembros
```

Cada módulo sigue la misma forma: `dominio/` (entidades + interfaz del repositorio), `dto/`,
`infra/` (repositorio en memoria) y el token de inyección en `<módulo>.tokens.ts`.

# PREGUNTAS P08

**¿por qué el paquete del adaptador se llama adapter-mariadb si usamos MySQL?**
Porque es el que usa mysql para establecer el puente de conexión que estamos usando con prisma.

**¿editar schema.prisma cambió algo en la base de datos antes de migrar?**
No, solo la migración manda los cambios a la base de datos

**¿la carpeta de migraciones es una foto del esquema o un historial?**
Es un historial, viene con marcas de tiempo y las querys que se ejecutaron para actualizar la base de datos

**¿por qué Horario.clase sí crea columna y Clase.horarios no?**
Porque la columna de la relación le pertenece a los horarios (en relación 1-n n se queda con la llave)

**¿de dónde sale la relación de muchos a muchos entre Miembro y Horario, si nunca se declaró?**
Cómo tal muchos un miembro se puede inscribir a muchos horarios y estos no se bloquean así que muchos miembros pueden tener el mismo horario, da una relación n:m y la tabla intermedia con los datos extras es la de Inscripciones.
