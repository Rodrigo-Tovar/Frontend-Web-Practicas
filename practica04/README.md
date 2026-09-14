1. Express manda los rechazos de un handler async directo al middleware de errores, sin try/catch en cada ruta. ¿Qué tendrían que agregar en cada ruta si esto no fuera así?
   En cada ruta habría que poner un try/catch y hacer next(err) para que el error llegue al manejador de errores.

2. ¿Por qué el servicio no lanza directamente un 409 en vez de EjemplarPrestadoError?
   Porque es una capa de dominio, no de HTTP.

3. Si mañana agregaran una app móvil que también consume esta API, ¿qué archivos de esta práctica tendrían que tocar?
   Se tendría que reutilizar la capa de contrato y la API pública en servidor.ts, los contratos de en prestamo.dto.ts, los DTOs de creación y respuesta en crear-prestamo.dto.ts y prestamo-response.dto.ts, y la validación HTTP en validar.ts.
