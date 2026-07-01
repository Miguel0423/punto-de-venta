# NexGenTech Electronics — Punto de Venta

## ¿Qué es?

Frontend estático de e-commerce para "NexGenTech Electronics". Catálogo de productos tecnológicos con carrito de compras y simulación de pago. Todo corre 100% en el navegador, sin backend.

## Stack

- HTML5 semántico + CSS3 vanilla (variables, flexbox, grid)
- JavaScript vanilla (manipulación del DOM, `localStorage`)
- Ionicons / Font Awesome para íconos

## Estructura

| Ruta | Propósito |
|------|-----------|
| `index.html` | Landing con promociones y ofertas |
| `carrito.html` | Carrito de compras + modal de pago + recibo |
| `contacto.html` | Formulario de contacto |
| `impresora.html`, `teclado.html`, `pantalla.html`, `lap.html`, `cel.html`, `watch.html`, `dron.html` | Páginas de detalle de cada producto |
| `css/` | Estilos por página (`promociones.css`, `carrito.css`, `formulario.css`, `ticket.css`, etc.) |
| `js/carro.js` | Lógica del carrito (agregar/quitar productos, persistencia en localStorage) |
| `js/pago.js` | Lógica del modal de pago y generación del recibo/factura (PDF con html2pdf.js) |
| `js/darkmode.js` | Toggle de modo oscuro |
| `imagenes/` | Assets de productos |

## Flujo principal

1. `index.html` — el usuario ve productos en oferta y hace clic para ver detalle
2. Página de producto — el usuario agrega al carrito (usando `carro.js`)
3. `carrito.html` — el usuario revisa, modifica cantidades, elimina items
4. Modal de pago — el usuario ingresa datos de tarjeta (simulación)
5. Recibo — se genera un comprobante visual con opción a descargar PDF

## Convenciones

- **Commits**: convencionales (`feat:`, `fix:`, `style:`, etc.) en español o inglés
- **CSS**: clases con kebab-case, variables globales en `:root`
- **JS**: camelCase para funciones/variables, funciones en global scope
- **Sin framework, sin build step, sin npm**: todo es HTML/CSS/JS plano
- **Precios**: en MXN, con formato `$X,XXX MXN`
- **Idioma del código**: mantener el idioma existente del archivo que se modifica

## Modo oscuro

Sistema de toggle manual con `localStorage` y `prefers-color-scheme`. Se activa con clase `.dark` en `<body>`. Variables de color definidas en `css/` con `[data-theme="dark"]`.
