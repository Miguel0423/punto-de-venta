document.addEventListener("DOMContentLoaded", () => {
    // Actualiza el contador del carrito en cada página donde aparece
    actualizarContadorCarrito();

    // Verifica si estás en la página del carrito de compras
    if (document.title === "Carrito de Compras - Productos Tecnológicos") {
        mostrarCarrito(); // Solo se ejecuta en la página del carrito

        // Variables para el modal de pago
        const modalPago = document.getElementById("modal-pago");
        const btnContinuarPago = document.querySelector(".boton-pago");
        const closeModal = document.querySelector(".close");

        // Asegura que el modal esté oculto por defecto al cargar la página
        modalPago.style.display = "none";

        // Mostrar modal al hacer clic en el botón "Continuar pago"
        btnContinuarPago.addEventListener("click", (event) => {
            event.preventDefault();
            modalPago.style.display = "block"; // Solo se abre al hacer clic
        });

        // Cerrar modal al hacer clic en la "X"
        closeModal.addEventListener("click", () => {
            modalPago.style.display = "none";
        });

        // Cerrar modal al hacer clic fuera del contenido del modal
        window.addEventListener("click", (event) => {
            if (event.target === modalPago) {
                modalPago.style.display = "none";
            }
        });

        // Enviar el formulario de pago
        document.getElementById("form-pago").addEventListener("submit", (event) => {
            event.preventDefault();

            // Validación de los campos (opcional)
            const nombre = document.getElementById("nombre").value;
            const apellido = document.getElementById("apellido").value;
            const telefono = document.getElementById("telefono").value;
            const pais = document.getElementById("pais").value;
            const tarjeta = document.getElementById("tarjeta").value;
            const cvv = document.getElementById("cvv").value;

            if (nombre && apellido && telefono && pais && tarjeta && cvv) {
                alert("Pago realizado con éxito.");
                modalPago.style.display = "none"; // Cierra el modal
                // Aquí puedes agregar cualquier acción adicional después de completar el pago
            } else {
                alert("Por favor, complete todos los campos.");
            }
        });
    }
});
