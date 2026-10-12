# Gimnasio API — Solución Práctica 9 (Blindar la API)

Parte de la solución de la Práctica 8 (esquema y migraciones de Prisma) y hace dos cosas: primero
conecta esos modelos a la aplicación — reemplaza los 4 repositorios en memoria por repositorios
de Prisma — y después blinda el ciclo de vida de la petición: validación automática, un
middleware, un interceptor de logging, un filtro de excepciones y CORS.

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

Opcionales en el `.docx` del alumno, resueltos aquí:

| Archivo                                          | Qué es                                                                                                                                         |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/comun/middleware/peticion-id.middleware.ts` | Agrega `X-Request-Id` a toda respuesta                                                                                                         |
| `src/comun/interceptores/logging.interceptor.ts` | Loguea método, ruta y duración de cada petición                                                                                                |
| `src/comun/interceptores/sobre.interceptor.ts`   | Bonus adicional: envuelve toda respuesta en `{ data, meta }` — NO está activo en `main.ts`; activarlo rompe el contrato de todos los endpoints |

# Practica 10

## Parte 1

**Por qué el filtro atrapa la clase base y no cada error por separado?**
Porque de esa manera todos los errores se mandan llamar por nest directamente cuando ocurre algo malo,
todos con el mismo formato para poder ser enviados al front de la misma manera.

**¿Por qué este middleware no podría decidir si un usuario tiene permiso para una ruta?**
Porque este corre antes de que Nest sepa siquiera qué controller va a atender la petición.

**¿Por qué la petición que responde 409 no aparece en ese registro?**
Solo corre si el controlador respondió bien. Si lanzo un error 409, se salta directo al filtro y no pasa nada en consola.

**¿Por qué este cambio rompe a cualquier cliente que ya estuviera usando la API?**
Porque rompe el contrato (res[0] pasa a ser res.data[0]): por eso se decide ahora, antes de que el React empiece a consumirla.

**Si el servidor respondió en los dos casos, ¿quién bloquea y a quién protege?**
Protege a 5173 por el Access-Control-Allow-Origin, 4000 es bloqueado por el navegador pero el servidor responde igual.

## Parte 2

**¿Por qué el campo se llama passwordHash y no password?**
Se llama passwordHash y no password: con ese nombre es imposible guardar la contrasena en claro por descuido.

**¿Por qué los dos errores del inicio de sesión dicen exactamente lo mismo?**
Para que nadie pueda averiguar qué correos existen probando uno por uno

**Si el contenido se puede leer, ¿qué es lo que protege la firma?**
Que tienen un muy corto tiempo de duración para que caduque pronto en caso de ser robado

**¿Por qué es más seguro proteger todo y abrir a mano, que al revés?**
Cabe dentro del principio de zero trust, no se debe confiar en que la operación está siendo realizada por el usuario legítimo con solo una verificación al inicio de su sesión.

**¿cuál es la diferencia entre un 401 y un 403?**
401 unauthorized, faltan credenciales válidas para realizar la operación
403 forbidden, el servidor se niega a autorizar el acceso

**¿Cuántas líneas del AuthService tuvieron que cambiar para pasar de memoria a MySQL? ¿Por qué?**
Cambiar una sola línea en src/auth/auth.module.ts

{ provide: USUARIO_REPOSITORY, useClass: UsuarioPrismaRepository },
