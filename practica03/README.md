1. ¿Hizo falta una base de datos real para probar la regla de negocio? ¿Qué dice eso sobre para qué sirve el patrón Repository?
   Por lo visto se pueden guardar en la lista que hay en prestamo.repository que al extender de repository puede guardar con el metodo save que es un método con una lista genérica para poder guardar cualquier tipo de objeto.

2. El Service recibe el repositorio como Repository<Prestamo>, no InMemoryPrestamoRepository. ¿Qué se rompía si usaban la clase concreta?
   Hacerlo acoplaría la implementación, por lo que ahora el service dependería del map en memoria en lugar de la abstracción y no se podría cambiar a una base de datos real sin modificar el service.

3. Si cambiaran el Map en memoria por una base de datos real, ¿cuántos archivos tocarían? ¿Por qué tan pocos?
   Solamente el main.ts porque la arquitectura usa interfaces y no una clase concreta y permite que al crear una base de datos solamente tendría que implementar la misma interfaz y el service funcionaría igual sin cambios.
