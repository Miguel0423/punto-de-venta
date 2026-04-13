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

    if (btnContinuarPago) {
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
    }

    if (closeModal) {
        closeModal.addEventListener("click", () => {
            modalPago.style.display = "none";
            modalOverlay.style.display = "none";
        });
    }

    window.addEventListener("click", (event) => {
        if (event.target === modalOverlay) {
            modalPago.style.display = "none";
            modalOverlay.style.display = "none";
        }
    });

    const formPago = document.getElementById("form-pago");
    if (formPago) {
        formPago.addEventListener("submit", (event) => {
            event.preventDefault();

            const nombre = document.getElementById("nombre").value;
            const tarjeta = document.getElementById("tarjeta").value;
            const exp = document.getElementById("exp").value;
            const cvv = document.getElementById("cvv").value;

            if (nombre && tarjeta && exp && cvv) {
                generarRecibo(nombre);

                modalPago.style.display = "none";
                modalOverlay.style.display = "none";

                guardarCarrito([]);
                actualizarContadorCarrito();
                mostrarCarrito();
            } else {
                alert("Por favor, complete todos los campos.");
            }
        });
    }

    function generarRecibo(nombreCliente) {
        const carrito = obtenerCarrito();
        const detalleRecibo = document.getElementById("detalle-recibo");

        const nombreEmpresa = "NexGenTech Electronics"; 
        const numeroTicket = Math.floor(Math.random() * 1000000); 

        detalleRecibo.innerHTML = `
            <p><strong>Empresa:</strong> ${nombreEmpresa}</p>
            <p><strong>Número de Ticket:</strong> #${numeroTicket}</p>
            <p><strong>Cliente:</strong> ${nombreCliente}</p>
            <hr style="border: 1px solid #ddd; margin: 15px 0;">
            <p><strong>Productos:</strong></p>
        `;

        let total = 0;
        carrito.forEach(producto => {
            detalleRecibo.innerHTML += `
                <p style="padding-left: 10px;">• ${producto.nombre} - Cant: ${producto.cantidad} - $${producto.precio}</p>
            `;
            total += producto.precio * producto.cantidad;
        });

        const totalConIva = total * 1.16;  
        detalleRecibo.innerHTML += `
            <hr style="border: 1px solid #ddd; margin: 15px 0;">
            <p><strong>Subtotal:</strong> $${total.toFixed(2)} MXN</p>
            <p><strong>IVA (16%):</strong> $${(total * 0.16).toFixed(2)} MXN</p>
            <p style="font-size: 1.2rem; color: #764ba2;"><strong>Total:</strong> $${totalConIva.toFixed(2)} MXN</p>
            <p style="text-align: center; margin-top: 20px; color: #764ba2;">¡Gracias por tu compra!</p>
        `;

        modalRecibo.style.display = "block";
        modalOverlayRecibo.style.display = "block";

        const fecha = new Date();
        const fechaFormateada = fecha.toLocaleDateString();
        const horaFormateada = fecha.toLocaleTimeString();
        const contenidoSoloPDF = `
            <h3 style="text-align: center; font-weight: bold; font-size: 24px;">FACTURA DE VENTA</h3>
            <p><strong>Fecha:</strong> ${fechaFormateada}, ${horaFormateada}</p>
        `;
        document.getElementById("detalle-recibo").setAttribute("data-pdf-content", contenidoSoloPDF);
    }

    if (btnCerrarRecibo) {
        btnCerrarRecibo.addEventListener("click", () => {
            modalRecibo.style.display = "none";
            modalOverlayRecibo.style.display = "none";
        });
    }

    if (closeRecibo) {
        closeRecibo.addEventListener("click", () => {
            modalRecibo.style.display = "none";
            modalOverlayRecibo.style.display = "none";
        });
    }

    window.addEventListener("click", (event) => {
        if (event.target === modalOverlayRecibo) {
            modalRecibo.style.display = "none";
            modalOverlayRecibo.style.display = "none";
        }
    });

    if (btnDescargarFactura) {
        btnDescargarFactura.addEventListener("click", () => {
            const detalleRecibo = document.getElementById("detalle-recibo");
        
            const contenidoSoloPDF = detalleRecibo.getAttribute("data-pdf-content");
        
            const contenidoParaPDF = document.createElement("div");
            
            contenidoParaPDF.innerHTML = `
                <style>
                    h3 {
                        text-align: center;
                        font-weight: bold;
                        font-size: 24px;
                        margin-bottom: 10px;
                        color: #333;
                    }
                    p {
                        font-size: 14px;
                        line-height: 1.5;
                        color: #555;
                        margin: 5px 0;
                    }
                    p strong {
                        color: #000;
                    }
                    hr {
                        border: 1px solid #ddd;
                        margin: 15px 0;
                    }
                </style>
                ${contenidoSoloPDF}
                ${detalleRecibo.innerHTML}
            `
        
            html2pdf()
                .set({
                    margin: 1,
                    filename: 'Factura_NexGenTech.pdf',
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
                })
                .from(contenidoParaPDF)
                .save();
        });
    }
});
