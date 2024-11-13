document.addEventListener("DOMContentLoaded", () => {
    // Actualiza el contador del carrito en cada página donde aparece
    actualizarContadorCarrito();

    // Verifica si estás en la página del carrito de compras
    if (document.title === "Carrito de Compras - Productos Tecnológicos") {
        mostrarCarrito(); // Solo se ejecuta en la página del carrito
    }
});

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito(); 
}

function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    const cuentaCar = document.getElementById("cuenta-car");
    const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    if (cuentaCar) {
        cuentaCar.innerText = totalProductos; 
    }
}

function mostrarCarrito() {
    const carrito = obtenerCarrito();
    const contenedorCarrito = document.getElementById("carrito-contenedor");

    contenedorCarrito.innerHTML = ""; 

    let total = 0;

    carrito.forEach((producto, index) => {
        const productoElemento = document.createElement("div");
        productoElemento.classList.add("producto");

        // Imagen
        const img = document.createElement("img");
        img.src = producto.imagen;
        img.alt = producto.nombre;
        img.classList.add("producto-imagen");
        productoElemento.appendChild(img);

        // Nombre
        const nombre = document.createElement("h2");
        nombre.innerText = producto.nombre;
        productoElemento.appendChild(nombre);

        // Precio
        const precio = document.createElement("p");
        precio.innerText = `Precio: $${producto.precio}`;
        productoElemento.appendChild(precio);

        // Cantidad
        const cantidad = document.createElement("input");
        cantidad.type = "number";
        cantidad.value = producto.cantidad;
        cantidad.min = 1;
        cantidad.classList.add("producto-cantidad");
        cantidad.addEventListener("change", () => {
            actualizarCantidad(index, parseInt(cantidad.value));
        });
        productoElemento.appendChild(cantidad);

        // Botón de eliminar
        const btnEliminar = document.createElement("button");
        btnEliminar.innerText = "Eliminar";
        btnEliminar.classList.add("producto-eliminar");
        btnEliminar.addEventListener("click", () => {
            eliminarProducto(index);
        });
        productoElemento.appendChild(btnEliminar);

        contenedorCarrito.appendChild(productoElemento);

        total += producto.precio * producto.cantidad;
    });

    // Total
    const totalElemento = document.createElement("div");
    totalElemento.classList.add("total");
    totalElemento.innerText = `Total: $${total}`;
    contenedorCarrito.appendChild(totalElemento);
}

function actualizarCantidad(index, nuevaCantidad) {
    const carrito = obtenerCarrito();
    carrito[index].cantidad = nuevaCantidad;
    guardarCarrito(carrito);
    mostrarCarrito(); 
}

function eliminarProducto(index) {
    const carrito = obtenerCarrito();
    carrito.splice(index, 1);
    guardarCarrito(carrito);
    mostrarCarrito(); 
}

function addToCart(nombre, precio, imagen) {
    const carrito = obtenerCarrito();
    const productoExistente = carrito.find(producto => producto.nombre === nombre);
    
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ nombre, precio, imagen, cantidad: 1 });
    }

    guardarCarrito(carrito);
    alert("Producto agregado al carrito");
}

function obtenerTotalCarrito() {
    const carrito = obtenerCarrito();
    return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
}

