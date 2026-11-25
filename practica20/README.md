# Practica 20

**¿Qué diferencia hay entre un signal y un computed, y cuál se parece a useState y cuál a useMemo?**
- Un signal es un valor que avisa cuando cambia, se parece a useState porque actualizan la página cuando cambian. computed es un valor derivado de cambios de otros, se parece a useMemo porque también calcula un valor cuando otros cambian.

**¿Qué pasa si el filtro hace new Catalogo() en lugar de inject(Catalogo)?**
- Cambiarlo en cualquiera de los dos archivos en los que se usa (app.ts, filtro-categoria.ts) hace que deje de funcionar el filtro. 