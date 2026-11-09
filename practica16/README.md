# Practica 16

**¿Por qué se usa un contexto y no props para la sesión?**
- Es mejor crear un canal que se comparte, de manera que los que requieran de la info de sesión puedan accederlo sin tener que pasarse de hijo a hijo por props por todo el arbol de componentes.

**¿Qué pasa si un componente usa la sesión fuera del proveedor?**
- El proveedor no se la entrega. La función devuelve null

**¿Dónde se guarda el token y qué riesgo tiene ese lugar?**
- Está en localStorage. Es vulnerable a XSS y tal vez a que un atacante la extraiga usando javascript.