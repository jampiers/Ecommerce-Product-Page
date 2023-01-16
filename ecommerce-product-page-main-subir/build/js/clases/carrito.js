import {gestionarCarrito, ui} from '../funciones.js';

export class Carrito {
    constructor() {
        this.productosArr = []
    }

    agregarProducto(nuevoProducto) {

        let productoParaActualizar = "";

        if(this.existeProducto(nuevoProducto.id)) {
            const productosActualizado = this.productosArr.map(producto => {
                if(producto.id === nuevoProducto.id) {
                    producto.cantidad = nuevoProducto.cantidad;
                    productoParaActualizar = producto 
                }

                return producto;
            });

            this.productosArr = [...productosActualizado];

            ui.formatearCantidad(productoParaActualizar.precioUnitario, productoParaActualizar.cantidad, productoParaActualizar.id, true);
            ui.formatearPrecio(productoParaActualizar.precioUnitario, productoParaActualizar.cantidad, productoParaActualizar.id, true);

            ui.mostrarAlerta("The product was updated successfully", false, document.querySelector(".producto__botonera"));

            gestionarCarrito.agregarAStorage();

        } else {
            this.productosArr = [...this.productosArr, nuevoProducto];

            ui.mostrarCarrito(gestionarCarrito);

            ui.mostrarAlerta("The product was added successfully", false, document.querySelector(".producto__botonera"));
        }

        console.log(this);
    }

    existeProducto(id) {
        // si se intenta añadir un producto existente (verificamos por el id)
        return this.productosArr.some(producto => producto.id === id);
    }

    aumentarCantidad(id) {
        let productoParaActualizar = "";

        const productosActualizado = this.productosArr.map(producto => {
            if(producto.id === id) {
                producto.cantidad++;
                productoParaActualizar = producto;
            }

            return producto;
        });
        
        this.productosArr = [...productosActualizado];
        ui.formatearCantidad(productoParaActualizar.precioUnitario, productoParaActualizar.cantidad, productoParaActualizar.id, true);
        ui.formatearPrecio(productoParaActualizar.precioUnitario, productoParaActualizar.cantidad, productoParaActualizar.id, true);

    }

    decrementarCantidad(id) {
        let productoParaActualizar = "";

        const productosActualizado = this.productosArr.map(producto => {
            if(producto.id === id) {
                producto.cantidad--;
                productoParaActualizar = producto;
            }

            return producto;
        });
        
        this.productosArr = [...productosActualizado];
        ui.formatearCantidad(productoParaActualizar.precioUnitario, productoParaActualizar.cantidad, productoParaActualizar.id, true);
        ui.formatearPrecio(productoParaActualizar.precioUnitario, productoParaActualizar.cantidad, productoParaActualizar.id, true);
    }

    eliminarProducto(id) {
        const productosActualizado = this.productosArr.filter(producto => producto.id !== id);
        this.productosArr = [...productosActualizado];
    }

    agregarAStorage() {
        localStorage.setItem("carrito", JSON.stringify(this.productosArr));
    }

    cargarStorage() {
        this.productosArr = JSON.parse(localStorage.getItem("carrito")) ?? [];
        console.log(this.productosArr);
        ui.mostrarCarrito(gestionarCarrito);
    }
}