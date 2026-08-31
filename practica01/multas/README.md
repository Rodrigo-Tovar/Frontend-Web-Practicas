Paso 2.
¿Hubo algún error, alguna advertencia o algo en la consola que avisara?
No marca ningún error aunque claramente está mal el tipado ya que es un archivo de javascript y no nos va a resaltar esos errores.

Paso 3.
¿Por qué node lo ejecuta? Porque pasa de ser ts a js cuando se ejecuta el código
¿Cuál comando revisa y cuál ejecuta? TSC es para compilar, TSX es para ejecutar el código

Paso 4.
De las dos líneas que usan const, ¿por qué sólo una falla?
cargoFijo marca error al intentar cambiar su valor, la otra no porque es la inicialización, lo cual es correcto hacer.

Al asignarle un texto a la variable con let, nadie escribió que fuera un número. ¿De dónde salió ese tipo?
variable2 marca error porque ts es tipado y se asumió que la variable era tipo number.

Paso 5.
Sí se distinguen mayúsculas de minúsculas. Marcó error al escribir "VENCIDO" en lugar de "vencido"

Paso 6.
Cambiar de “activo” a “ACTIVO” marca error porque lo espera en minúsculas. Error TS2820

Error al escribir un númeor en el campo de folio, esperando un string. Error TS2322

Error al quitar un campo obligatorio de la creación de un objeto préstamo. Error TS2741
