document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();

    if (document.title === "Carrito de Compras - NexGenTech Electronics") {
        mostrarCarrito();
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

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `
            <div class="carrito-vacio">
                <i class="fas fa-shopping-basket"></i>
                <h3>Tu carrito está vacío</h3>
                <p>Agrega productos para comenzar</p>
                <a href="index.html" class="boton-seguir">
                    <i class="fas fa-arrow-left"></i> Ver promociones
                </a>
            </div>
        `;
        actualizarTotalMostrado(0);
        return;
    }

    let total = 0;

    carrito.forEach((producto, index) => {
        const productoElemento = document.createElement("div");
        productoElemento.classList.add("producto");

        const img = document.createElement("img");
        img.src = producto.imagen;
        img.alt = producto.nombre;
        img.classList.add("producto-imagen");
        img.onerror = function() {
            this.src = "imagenes/placeholder.png";
        };
        productoElemento.appendChild(img);

        const nombre = document.createElement("h2");
        nombre.innerText = producto.nombre;
        nombre.classList.add("producto-nombre");
        productoElemento.appendChild(nombre);

        const precio = document.createElement("p");
        precio.innerText = `$${producto.precio}`;
        precio.classList.add("producto-precio");
        productoElemento.appendChild(precio);

        const cantidad = document.createElement("input");
        cantidad.type = "number";
        cantidad.value = producto.cantidad;
        cantidad.min = 1;
        cantidad.classList.add("producto-cantidad");
        cantidad.addEventListener("change", () => {
            actualizarCantidad(index, parseInt(cantidad.value));
        });
        productoElemento.appendChild(cantidad);

        const btnEliminar = document.createElement("button");
        btnEliminar.innerHTML = '<i class="fas fa-trash-alt"></i> Eliminar';
        btnEliminar.classList.add("producto-eliminar");
        btnEliminar.addEventListener("click", () => {
            eliminarProducto(index);
        });
        productoElemento.appendChild(btnEliminar);

        contenedorCarrito.appendChild(productoElemento);

        total += producto.precio * producto.cantidad;
    });

    actualizarTotalMostrado(total);
}

function actualizarTotalMostrado(total) {
    const totalElement = document.getElementById("total-monto");
    if (totalElement) {
        totalElement.innerText = `$${total}`;
    }
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
