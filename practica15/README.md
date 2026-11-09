# Práctica 15

**¿Por qué el 404 sí tiene encabezado y pie?**
- Por el componente que devuelve una página de error 404 personalizada con todas las urls que no existen aún o no encontradas.

**¿Qué cambia en la pestaña Red si usas "a href" en lugar de Link? Muéstralo con capturas**
- Si se usa Link, no cambia nada al hacer click. Con "a", se recarga la página entera aparte mostrando una nueva petición.

**¿En qué tipo de dato llega el id de la URL y qué pasa si no lo conviertes?**
- Como string. Si no entonces se toma como number y marca error.

**¿Qué pasa al ir de /clases/1 a /clases/2 si el id no está en las dependencias del efecto?**
- Muestra los datos de cada clase.