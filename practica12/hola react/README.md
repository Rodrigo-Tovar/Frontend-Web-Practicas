# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

# Preguntas

**Responder: ¿En qué se convirtió cada etiqueta del JSX?**
Cada etiqueta JSX se convirtió en una llamada a función: <div> → React.createElement("div", ...) o \_jsxs("div", ...); <h1> y <p> igual. El texto y las expresiones {nombre} pasan a ser hijos.

**Responder: Si React es «sólo una biblioteca», ¿quién traduce el JSX?**
El compilador, no React ni el navegador. React sólo aporta createElement o el runtime react/jsx-runtime; la traducción ocurre antes de ejecutar el código.

**Responder: ¿qué hace createRoot y qué hace render?**
CreateRoot se encarga de crear un contenedor raíz (o "root") en un elemento del DOM existente
Render se encarga de dibujar (o proyectar) tus componentes de React dentro de ese contenedor raíz

**Responder: ¿por qué el nombre de un componente empieza con mayúscula?**
Para poder diferenciar sus componentes de las etiquetas HTML nativas
