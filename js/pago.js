document.addEventListener("DOMContentLoaded", () => {
    // Selección de elementos necesarios
    const modalPago = document.getElementById("modal-pago");
    const modalOverlay = document.getElementById("modal-overlay");
    const btnContinuarPago = document.querySelector(".boton-pago");
    const closeModal = document.querySelector(".close");

    // Mostrar el modal y la capa oscura al hacer clic en "Continuar pago"
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

    // Cerrar el modal y la capa oscura al hacer clic en la "X"
    closeModal.addEventListener("click", () => {
        modalPago.style.display = "none";
        modalOverlay.style.display = "none";
    });

    // Cerrar el modal al hacer clic fuera del contenido del modal
    window.addEventListener("click", (event) => {
        if (event.target === modalOverlay) {
            modalPago.style.display = "none";
            modalOverlay.style.display = "none";
        }
    });

    // Validación y acción al enviar el formulario de pago
    document.getElementById("form-pago").addEventListener("submit", (event) => {
        event.preventDefault();

        // Validación básica de campos
        const nombre = document.getElementById("nombre").value;
        const tarjeta = document.getElementById("tarjeta").value;
        const exp = document.getElementById("exp").value;
        const cvv = document.getElementById("cvv").value;

        if (nombre && tarjeta && exp && cvv) {
            alert("Pago realizado con éxito.");
            modalPago.style.display = "none";
            modalOverlay.style.display = "none";
            // Puedes añadir acciones adicionales después del pago aquí
        } else {
            alert("Por favor, complete todos los campos.");
        }
    });
});
