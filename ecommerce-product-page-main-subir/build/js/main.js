import {aumentarDecrementarCantidad, 
        agregarProducto,
        gestionarCarrito
} from './funciones.js';

import {btnCarrito,
        btnAumentarCantidad,
        btnDecrementarCantidad,
        agregarProductoBtn
} from './variables.js';


document.addEventListener("DOMContentLoaded", () => {

    gestionarCarrito.cargarStorage();

    btnCarrito.addEventListener("click", () => {
        document.querySelector(".header__carrito-contenido").classList.toggle("header__carrito-contenido--activo");
    });
    
    btnAumentarCantidad.addEventListener("click", () => {
        aumentarDecrementarCantidad("aumentar");
    });
    
    btnDecrementarCantidad.addEventListener("click", () => {
        aumentarDecrementarCantidad("decrementar");
    });

    agregarProductoBtn.addEventListener("click", () => {
        agregarProducto(agregarProductoBtn.parentElement.parentElement.parentElement);
    });


});



