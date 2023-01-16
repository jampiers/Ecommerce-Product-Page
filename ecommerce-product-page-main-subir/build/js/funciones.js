import {Carrito} from './clases/carrito.js';
import {UI} from './clases/ui.js';
import {
        cantidadProducto
        } 
from './variables.js';

let cantidad = 0;

export const gestionarCarrito = new Carrito();
export const ui = new UI();

export function aumentarDecrementarCantidad(tipo) {
    // Se aumenta en 1 antes de usarlo, si fuera asi => cantidad++ estariamos usando primero la variable y despues se aumentaria en 1, igual ocurre para decrementar
    if(tipo === "aumentar") {
        cantidadProducto.textContent = ++cantidad;
    } else if(tipo === "decrementar") {
        cantidadProducto.textContent = cantidad <= 0 ? "0" : --cantidad; 
    }
}

export function agregarProducto(divProducto) {
    if(divProducto.querySelector(".producto__cantidad").textContent === "0") {
        ui.mostrarAlerta("The quantity of the product cannot be 0", true, divProducto.querySelector(".producto__botonera"));
        return;
    }

    const producto = {
        imagen: divProducto.querySelector(".producto__miniatura-img").src,
        nombre: divProducto.querySelector("h1").textContent,
        precioUnitario: Number(divProducto.querySelector(".producto__precio").textContent.slice(1)),
        cantidad: Number(divProducto.querySelector(".producto__cantidad").textContent),
        id: divProducto.getAttribute("data-id")
    }

    gestionarCarrito.agregarProducto(producto);
    cantidad = 0; // Se reinicia el contador de la cantidad
    document.querySelector(".producto__cantidad").textContent = "0";
}

export function actualizarCantidad(id, tipo) {
    if(tipo === "aumentar") {
        gestionarCarrito.aumentarCantidad(id);
    } else if(tipo === "decrementar" && document.querySelector(`#${id}`).querySelector(".header__carrito-producto-cantidadPrecio").textContent[document.querySelector(`#${id}`).querySelector(".header__carrito-producto-cantidadPrecio").textContent.length - 1] !== "1") { // Revisamos que las 2 condiciones se cumplan, que el tipo sea decrementar y que la cantidad sea diferente a 1 para decrementar la cantidad. Si la cantidad ya es 1 no realiza el decremento de cantidad.
        gestionarCarrito.decrementarCantidad(id);
    }

    gestionarCarrito.agregarAStorage();
}

export function eliminarProducto(id) {
    gestionarCarrito.eliminarProducto(id);
    ui.mostrarCarrito(gestionarCarrito);
}
