document.addEventListener("DOMContentLoaded", () => {
    const modalPago = document.getElementById("modal-pago");
    const modalOverlay = document.getElementById("modal-overlay");
    const btnContinuarPago = document.querySelector(".boton-pago");
    const closeModal = document.querySelector(".close");
    
    const modalRecibo = document.getElementById("recibo-compra");
    const modalOverlayRecibo = document.getElementById("modal-overlay-recibo");
    const btnCerrarRecibo = document.getElementById("cerrar-recibo");
    const closeRecibo = document.getElementById("close-recibo");

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
            // Genera el recibo de compra
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

    function generarRecibo(nombreCliente) {
        const carrito = obtenerCarrito();
        const detalleRecibo = document.getElementById("detalle-recibo");
    
        // Nombre de la empresa
        const nombreEmpresa = "NexGenTech";  // Puedes cambiar esto por el nombre real de la empresa
        detalleRecibo.innerHTML = `<p><strong>Empresa:</strong> ${nombreEmpresa}</p>`;
        
        // Número de ticket (número aleatorio)
        const numeroTicket = Math.floor(Math.random() * 1000000); // Genera un número aleatorio para el ticket
        detalleRecibo.innerHTML += `<p><strong>Número de Ticket:</strong> ${numeroTicket}</p>`;
    
        // Nombre del cliente
        detalleRecibo.innerHTML += `<p><strong>Nombre del Cliente:</strong> ${nombreCliente}</p>`;
        
        // Detalle de la compra
        detalleRecibo.innerHTML += "<p><strong>Detalle de la Compra:</strong></p>";
    
        let total = 0;
        carrito.forEach(producto => {
            detalleRecibo.innerHTML += `
                <p>${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio}</p>
            `;
            total += producto.precio * producto.cantidad;
        });
    
        // Total sin IVA
        const totalConIva = total * 1.16;  // Calcula el total con el 16% de IVA
    
        // Mostrar el total y el IVA
        detalleRecibo.innerHTML += `<p><strong>Total:</strong> $${total.toFixed(2)}</p>`;
        detalleRecibo.innerHTML += `<p><strong>IVA (16%):</strong> $${(total * 0.16).toFixed(2)}</p>`;
        detalleRecibo.innerHTML += `<p><strong>Total con IVA:</strong> $${totalConIva.toFixed(2)}</p>`;
    
        // Mensaje de agradecimiento
        detalleRecibo.innerHTML += `<p><strong>¡Gracias por tu compra!</strong></p>`;
    
        // Mostrar el modal con el recibo
        modalRecibo.style.display = "block";
        modalOverlayRecibo.style.display = "block";
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
});