document.addEventListener("DOMContentLoaded", () => {
    const modalPago = document.getElementById("modal-pago");
    const modalOverlay = document.getElementById("modal-overlay");
    const btnContinuarPago = document.querySelector(".boton-pago");
    const closeModal = document.querySelector(".close");
    
    const modalRecibo = document.getElementById("recibo-compra");
    const modalOverlayRecibo = document.getElementById("modal-overlay-recibo");
    const btnCerrarRecibo = document.getElementById("cerrar-recibo");
    const closeRecibo = document.getElementById("close-recibo");
    const btnDescargarFactura = document.getElementById("descargar-factura");

    // Abrir el modal de pago al hacer clic en "Continuar pago"
    btnContinuarPago.addEventListener("click", (event) => {
        event.preventDefault();
        const total = obtenerTotalCarrito();
        if (total > 0) {
            modalPago.style.display = "block";
            modalOverlay.style.display = "block";
        } else {
            alert("El carrito está vacío. Agrega productos antes de continuar con el pago.");
        }
    });

    // Cerrar modal de pago
    closeModal.addEventListener("click", () => {
        modalPago.style.display = "none";
        modalOverlay.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modalOverlay) {
            modalPago.style.display = "none";
            modalOverlay.style.display = "none";
        }
    });

    // Evento al enviar el formulario de pago
    document.getElementById("form-pago").addEventListener("submit", (event) => {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const tarjeta = document.getElementById("tarjeta").value;
        const exp = document.getElementById("exp").value;
        const cvv = document.getElementById("cvv").value;

        // Validación del formulario
        if (nombre && tarjeta && exp && cvv) {
            // Genera el recibo de compra y muestra el modal
            generarRecibo(nombre);

            // Cierra el modal de pago después de la compra
            modalPago.style.display = "none";
            modalOverlay.style.display = "none";

            // Limpia el carrito después de la compra
            guardarCarrito([]);
            actualizarContadorCarrito();
        } else {
            alert("Por favor, complete todos los campos.");
        }
    });

    // Función para generar el recibo y mostrarlo en el modal
    function generarRecibo(nombreCliente) {
        const carrito = obtenerCarrito();
        const detalleRecibo = document.getElementById("detalle-recibo");

        // Generar el contenido del recibo
        const nombreEmpresa = "NexGenTech"; 
        const numeroTicket = Math.floor(Math.random() * 1000000); 

        detalleRecibo.innerHTML = `
            <p><strong>Empresa:</strong> ${nombreEmpresa}</p>
            <p><strong>Número de Ticket:</strong> ${numeroTicket}</p>
            <p><strong>Nombre del Cliente:</strong> ${nombreCliente}</p>
            <p><strong>Detalle de la Compra:</strong></p>
        `;

        let total = 0;
        carrito.forEach(producto => {
            detalleRecibo.innerHTML += `
                <p>${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio}</p>
            `;
            total += producto.precio * producto.cantidad;
        });

        const totalConIva = total * 1.16;  
        detalleRecibo.innerHTML += `
            <p><strong>Total:</strong> $${total.toFixed(2)}</p>
            <p><strong>IVA (16%):</strong> $${(total * 0.16).toFixed(2)}</p>
            <p><strong>Total con IVA:</strong> $${totalConIva.toFixed(2)}</p>
            <p><strong>¡Gracias por tu compra!</strong></p>
        `;

        // Mostrar el modal con el recibo
        modalRecibo.style.display = "block";
        modalOverlayRecibo.style.display = "block";

        // Guardar la información para el PDF en un atributo del detalleRecibo
        const fecha = new Date();
        const fechaFormateada = fecha.toLocaleDateString();
        const horaFormateada = fecha.toLocaleTimeString();
        const contenidoSoloPDF = `
            <h3 style="text-align: center; font-weight: bold; font-size: 24px;">FACTURA DE VENTA</h3>
            <p><strong>Fecha:</strong> ${fechaFormateada}, ${horaFormateada}</p>
        `;
        document.getElementById("detalle-recibo").setAttribute("data-pdf-content", contenidoSoloPDF);
    }

    // Cerrar modal de recibo de compra
    btnCerrarRecibo.addEventListener("click", () => {
        modalRecibo.style.display = "none";
        modalOverlayRecibo.style.display = "none";
    });

    closeRecibo.addEventListener("click", () => {
        modalRecibo.style.display = "none";
        modalOverlayRecibo.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modalOverlayRecibo) {
            modalRecibo.style.display = "none";
            modalOverlayRecibo.style.display = "none";
        }
    });

    // Descargar el recibo como factura en PDF
    btnDescargarFactura.addEventListener("click", () => {
        const detalleRecibo = document.getElementById("detalle-recibo");
    
        // Obtener el contenido adicional para el PDF
        const contenidoSoloPDF = detalleRecibo.getAttribute("data-pdf-content");
    
        // Crear un div temporal con el contenido para el PDF
        const contenidoParaPDF = document.createElement("div");
        
        // Aplicar estilos específicos para el PDF
        contenidoParaPDF.innerHTML = `
            <style>
                /* Título de la factura */
                h3 {
                    text-align: center;
                    font-weight: bold;
                    font-size: 24px;
                    margin-bottom: 10px;
                    color: #333;
                }
                /* Fecha y datos del cliente */
                p {
                    font-size: 14px;
                    line-height: 1.5;
                    color: #555;
                    margin: 5px 0;
                }
                /* Resaltar el total y el IVA */
                p strong {
                    color: #000;
                }
                /* Estilo para el detalle de los productos */
                .producto-detalle {
                    font-size: 13px;
                    color: #333;
                    margin-left: 10px;
                }
            </style>
            ${contenidoSoloPDF}
            ${detalleRecibo.innerHTML}
        `
    
        // Generar el PDF con el contenido adicional
        html2pdf()
            .set({
                margin: 1,
                filename: 'Factura_de_Compra.pdf',
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            })
            .from(contenidoParaPDF)
            .save();
    });
});