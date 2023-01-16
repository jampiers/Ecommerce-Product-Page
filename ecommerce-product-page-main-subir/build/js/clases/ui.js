import {actualizarCantidad, eliminarProducto, gestionarCarrito} from '../funciones.js';

export class UI {
    constructor() {
        
    }

    mostrarAlerta(mensaje, error, contenedorAlerta) {

        this.removerAlertaPrevia(contenedorAlerta);

        const pError = document.createElement("p");
        pError.classList.add("producto__mensaje");
        pError.textContent = mensaje;

        if(error) {
            pError.classList.add("producto__mensaje--error");
        } else {
            pError.classList.add("producto__mensaje--ok");
        }

        contenedorAlerta.appendChild(pError);

        setTimeout(() => {
            pError.remove();
        }, 3000);
    }

    removerAlertaPrevia(contenedorAlerta) {
        if(contenedorAlerta.querySelector(".producto__mensaje")) {
            contenedorAlerta.querySelector(".producto__mensaje").remove();
        }
    }

    mostrarCarrito({productosArr}) {

        this.limpiarCarritoPrevio();

        gestionarCarrito.agregarAStorage();

        if(!productosArr.length) {
            this.mostrarCarritoVacio();
            return;
        } 

        document.querySelector(".header__carrito-body").classList.remove("header__carrito-body--vacio");
        
        for(let i = 0; i < productosArr.length; i++) {
            const {cantidad, id, imagen, nombre, precioUnitario} = productosArr[i];
            const productoDiv = document.createElement("div");
            productoDiv.classList.add("header__carrito-producto");
            productoDiv.dataset.id = id;
            productoDiv.id = id;
            
            const productoImg = document.createElement("img");
            productoImg.classList.add("header__carrito-producto-img");
            productoImg.src = imagen;

            const productoInfo = document.createElement("div");
            productoInfo.classList.add("header__carrito-producto-info");

            const productoNombre = document.createElement("p");
            productoNombre.classList.add("header__carrito-producto-nombre");
            productoNombre.textContent = nombre;

            const productoCantidad = document.createElement("p");
            productoCantidad.classList.add("header__carrito-producto-cantidadPrecio");
            productoCantidad.textContent = this.formatearCantidad(precioUnitario, cantidad);

            const productoPrecioTotal = document.createElement("p");
            productoPrecioTotal.classList.add("header__carrito-producto-precioTotal");
            productoPrecioTotal.textContent = this.formatearPrecio(precioUnitario, cantidad);

            const productoBtns = document.createElement("div");
            productoBtns.classList.add("header__carrito-producto-btns");

            const productoBtnAumentar = document.createElement("button");
            productoBtnAumentar.classList.add("header__carrito-producto-btnAumentar");
            productoBtnAumentar.onclick = () => {
                actualizarCantidad(id, "aumentar");
            }

            const productoBtnEliminar = document.createElement("button");
            productoBtnEliminar.classList.add("header__carrito-producto-btnEliminar");
            productoBtnEliminar.onclick = () => {
                eliminarProducto(id);
            }

            const productoBtnDecrementar = document.createElement("button");
            productoBtnDecrementar.classList.add("header__carrito-producto-btnRestar");
            productoBtnDecrementar.onclick = () => {
                actualizarCantidad(id, "decrementar");
            }

            productoBtns.appendChild(productoBtnAumentar);
            productoBtns.appendChild(productoBtnEliminar);
            productoBtns.appendChild(productoBtnDecrementar);

            productoInfo.appendChild(productoNombre);
            productoInfo.appendChild(productoCantidad);
            productoInfo.appendChild(productoPrecioTotal)

            productoDiv.appendChild(productoImg);
            productoDiv.appendChild(productoInfo);
            productoDiv.appendChild(productoBtns);

            document.querySelector(".header__carrito-body").appendChild(productoDiv);
            
        }

        const carritoCheckOutBtn = document.createElement("button");
        carritoCheckOutBtn.classList.add("header__carrito-checkoutBtn");
        carritoCheckOutBtn.textContent = "Checkout";

        document.querySelector(".header__carrito-body").appendChild(carritoCheckOutBtn);
    }

    limpiarCarritoPrevio() {
        while(document.querySelector(".header__carrito-body").firstElementChild) {
            document.querySelector(".header__carrito-body").firstElementChild.remove();
        }
    }

    mostrarCarritoVacio() {
        const pVacio = document.createElement("p");
        pVacio.classList.add("header__carrito-vacio");
        pVacio.textContent = "Your cart is empty!";

        document.querySelector(".header__carrito-body").classList.add("header__carrito-body--vacio");
        document.querySelector(".header__carrito-body").appendChild(pVacio);

    }

    formatearCantidad(precioUnitario, cantidad, id, actualizar) {

        if(actualizar) {
            document.querySelector(`#${id}`).querySelector(".header__carrito-producto-cantidadPrecio").textContent = `${new Intl.NumberFormat("es-US", {style: "currency", currency: "USD"}).format(precioUnitario)} x ${cantidad}`;

            return;
        } 

        return `${new Intl.NumberFormat("es-US", {style: "currency", currency: "USD"}).format(precioUnitario)} x ${cantidad}`
    }

    formatearPrecio(precioUnitario, cantidad, id, actualizar) {
        // con undefined en los locales usará el idioma que el visitante a la pagina tenga en su navegador

        // El objeto Intl tiene que ver con la localizacion, es decir, la adaptacion de nuestra aplicacion a las particularidades de cada idioma

        /* Intl.DateTimeFormat es para dar formato a fechas y horas:
            El constructor DateTimeFormat ayuda a formatear fechas y horas de acuerdo a las particularidades de cada pais,
            como todos los objetos Intl se intancia pasandole como argumento (locales) una cadena de texto en el formato ietf bcp 47 (Codigo de idioma IETF que no son mas que etiquetas de idiomas abreviadas, por ejemplo: "pt-BR" (al portugues de Brasil), "es-PE" (español de Peru)), solo basta con pasarle el nombre del idioma abreviado (es, en, sv) para idiomas genericos, o lo anterior seguido de un - y la abreviatura del pais/cultura en Mayuscula (es-ES, en-US, en-UK, es-PE) y tambien acepta un objeto de opciones de las propiedades. Asi podemos obtener una fecha bien formateada en varios idiomas
        */  

        /*
            Intl.NumberFormat: para dar formato a números y dinero
                Cada idioma tiene formatos diferentes para varias cosas, como: los numeros, cantidad monetarias. En españa los separadores de mil son puntos y el decimal es una coma, y la moneda va despues de la cantidad. Sin embargo en EEUU es lo contrario: el separador de mil es una coma y del decimal es con punto y la moneda va delante de la cantidad.
                
                Como todos los anteriores se instancia pasándole una cadena con el idioma (locales) (si ponemos undefined se usará el idioma del navegador).
                
                Acepta un objeto de opciones donde podemos ajustar el sistema de numercacion, el tipo de moneda (si sera una cantidad de dinero), y tambien la forma de nombrar las monedas, entre otras opciones. La propiedad mas importante es style que nos permite seleccionar si queremos mostrar decimales ("decimal" es el valor por defecto), monedas ("currency") o porcentajes ("percent")

        */

        //  objeto Intl es un objeto global que proporciona acceso a varios constructores y métodos relacionados con la internacionalización. Estos constructores son funciones que se pueden utilizar para crear objetos específicos que manejan diferentes tareas de internacionalización.

        // En resumen, el objeto Intl es un objeto global que proporciona constructores y métodos para manejar las tareas de internacionalización, y los constructores dentro de este objeto son funciones que se utilizan para crear objetos específicos que manejan diferentes tareas de internacionalización.

        if(actualizar) {
            document.querySelector(`#${id}`).querySelector(".header__carrito-producto-precioTotal").textContent = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(precioUnitario * cantidad);

            return;
        } 

        return new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(precioUnitario * cantidad);
    } 

}