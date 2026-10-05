# Gimnasio API — Solución Práctica 9 (Blindar la API)

Parte de la solución de la Práctica 8 (esquema y migraciones de Prisma) y hace dos cosas: primero
conecta esos modelos a la aplicación — reemplaza los 4 repositorios en memoria por repositorios
de Prisma — y después blinda el ciclo de vida de la petición: validación automática, un
middleware, un interceptor de logging, un filtro de excepciones y CORS. Esta solución trae todo
completo; el `.docx` del alumno marca el middleware y el interceptor como opcionales ("si el
tiempo alcanza") para que la práctica en vivo quepa en 90 minutos — aquí están resueltos por si
se cubren. El interceptor de respuesta (`Sobre`) es el único que de verdad queda fuera del
recorrido: está en el código pero NO activado en `main.ts`.

## Cómo correrlo

```bash
npm install
cp .env.ejemplo .env        # y pon tu contraseña de root de MySQL
npm run prisma:migrate      # ya viene del schema de la Práctica 8
npm run prisma:seed
npm run start:dev
```

## Qué se agregó respecto a la Práctica 8

| Archivo                               | Qué es                                                                         |
| ------------------------------------- | ------------------------------------------------------------------------------ |
| `src/prisma/`                         | `PrismaService` (driver adapter) y `PrismaModule` (`@Global()`)                |
| `src/*/infra/*-prisma.repository.ts`  | Reemplazan a los `*-memoria.repository.ts`                                     |
| `src/*/dto/*.ts`                      | Pasaron de `interface` a `class` con decoradores de `class-validator`          |
| `src/comun/filtros/dominio.filter.ts` | Traduce `ErrorDeDominio` (y sus hijas) a 404/409, en un solo lugar             |
| `main.ts`                             | `ValidationPipe`, `DominioExceptionFilter` y CORS, registrados globalmente     |
| `inscripciones.controller.ts`         | Perdió el `try/catch` y el chequeo manual — ahora los hace el Pipe y el Filter |

Opcionales en el `.docx` del alumno ("si el tiempo alcanza"), resueltos aquí:

| Archivo                                          | Qué es                                                                                                                                         |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/comun/middleware/peticion-id.middleware.ts` | Agrega `X-Request-Id` a toda respuesta                                                                                                         |
| `src/comun/interceptores/logging.interceptor.ts` | Loguea método, ruta y duración de cada petición                                                                                                |
| `src/comun/interceptores/sobre.interceptor.ts`   | Bonus adicional: envuelve toda respuesta en `{ data, meta }` — NO está activo en `main.ts`; activarlo rompe el contrato de todos los endpoints |

# Preguntas

**¿Qué línea del Service o del Controller tuvo que cambiar para que Clases hablara con MySQL?**
UseClass debió pasar a usar los archivos de prisma ubicados en el infra de cada módulo.

**¿Por qué InscripcionesService no tuvo que cambiar ni una línea de las reglas de cupo y duplicados?**
Porque las reglas viven en el Service, que depende de la interfaz InscripcionRepository, no de la implementación. Solo cambió el repo detrás.

**¿Por qué una interfaz no puede validar nada en tiempo de ejecución?**
Porque una interfaz es un tipo que TypeScript borra al compilar: no existe en runtime. Para validar en runtime hacen falta clases con decoradores.

**¿Qué código de estado responde y qué trae en el cuerpo?**
El DominioExceptionFilter responde 404 o 409 con un JSON { statusCode, error, message, path, timestamp }.

**¿Cuántas líneas quedó más corto el controlador?**
22 líneas menos

**Si la respuesta llega en los dos casos, ¿quién bloquea realmente y a quién protege?**
Bloquea el navegador, no el servidor. Protege al usuario, no a la API.
