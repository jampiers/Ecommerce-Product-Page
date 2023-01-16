(function() {
    const btnAbrirMenu = document.querySelector(".header__btn-burger");
    const btnCerrarMenu = document.querySelector(".nav__btn-cerrar");

    const btnSliderPrevio = document.querySelector(".producto__previo-btn");
    const btnSliderSiguiente = document.querySelector(".producto__siguiente-btn");
    const imagenesSlider = document.querySelectorAll(".producto__img-c");
    const btnMiniaturas = document.querySelectorAll(".producto__miniatura-img-c");
    const imagenesGaleria = document.querySelectorAll(".producto__galeria-img-c");    


    const btnModalSliderPrevio = document.querySelector(".modal__slider-btn-previo");
    const btnModalSliderSiguiente = document.querySelector(".modal__slider-btn-siguiente");
    const modalImagenesSider = document.querySelectorAll(".modal__slider-img-c");
    const modalBtnMiniaturas = document.querySelectorAll(".modal__miniatura-img-c");
    const modalBtnCerrar = document.querySelector(".modal__slider-btn-cerrar");


    let contador1 = 0;
    let contador2 = 0;


    // Abrir y cerrar menu

    btnAbrirMenu.addEventListener("click", () => {
        document.querySelector(".nav").classList.toggle("nav--mostrar");
        document.querySelector(".header__overlay").classList.toggle("header__overlay--activo");
    });

    btnCerrarMenu.addEventListener("click", () => {
        document.querySelector(".nav").classList.toggle("nav--mostrar");
        document.querySelector(".header__overlay").classList.toggle("header__overlay--activo");
    });


    // SLIDER Y MINIATURAS


    btnSliderPrevio.addEventListener("click", () => {
        retrocederImagen(imagenesSlider, "producto__img-c--activo");
    });

    btnSliderSiguiente.addEventListener("click", () => {
        siguienteImagen(imagenesSlider, "producto__img-c--activo");
    });

    btnMiniaturas.forEach((btn, index) => {

        btn.addEventListener("click", () => {
            if(!btn.classList.contains("producto__miniatura-img-c--activo")) {
                cambiarMiniatura(btn, btnMiniaturas, imagenesGaleria, index, ["producto__miniatura-img-c--activo", "producto__galeria-img-c--activo"]);
            }
    });

    })



    // SLIDER DEL MODAL Y MINIATURAS

    document.querySelector(".producto__galeria-c").addEventListener("click", () => {
        document.querySelector("body").style.overflow = "hidden";
        document.querySelector(".modal").classList.toggle("modal--activo");
    })


    modalBtnCerrar.addEventListener("click", () => {
        document.querySelector(".modal").classList.toggle("modal--activo");
        document.querySelector("body").style.overflow = "auto";
    });

    btnModalSliderPrevio.addEventListener("click", () => {
        retrocederImagen(modalImagenesSider, "modal__slider-img-c--activo", true);
    });

    btnModalSliderSiguiente.addEventListener("click", () => {   
        siguienteImagen(modalImagenesSider, "modal__slider-img-c--activo", true);
    });

    modalBtnMiniaturas.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if(!btn.classList.contains("modal__miniatura-img-c--activo")) {
                cambiarMiniatura(btn, modalBtnMiniaturas, modalImagenesSider, index, ["modal__miniatura-img-c--activo", "modal__slider-img-c--activo"]);
                contador2 = index;
            }
        });
    });



    // FUNCIONES DE LOS SLIDERS Y MINIATURAS

    function cambiarMiniatura(btn, miniaturasBtn, imagenesACambiar, index, [clase1, clase2]) {
        miniaturasBtn.forEach(btn => btn.classList.remove(clase1));
        btn.classList.add(clase1);
        imagenesACambiar.forEach(img => img.classList.remove(clase2));
        imagenesACambiar[index].classList.add(clase2);
    }


    function retrocederImagen(imagenes, clase, modal) {

        if(modal) {
            if(contador2 === 0) {
                contador2 = imagenes.length - 1;
            } else {
                contador2--;
            }
    
            imagenes.forEach(img => img.classList.remove(clase));
            imagenes[contador2].classList.add(clase);
            modalBtnMiniaturas.forEach(btn => btn.classList.remove("modal__miniatura-img-c--activo"));
            modalBtnMiniaturas[contador2].classList.add("modal__miniatura-img-c--activo");

        } else {
            if(contador1 >= imagenes.length - 1) {
                contador1 = 0;
            } else {
                contador1++;
            } 
    
            imagenes.forEach(img => img.classList.remove(clase));
            imagenes[contador1].classList.add(clase);
        }
    }


    function siguienteImagen(imagenes, clase, modal) {

        if(modal) {
            if(contador2 >= imagenes.length - 1) {
                contador2 = 0;
            } else {
                contador2++;
            } 
    
            imagenes.forEach(img => img.classList.remove(clase));
            imagenes[contador2].classList.add(clase);
            modalBtnMiniaturas.forEach(btn => btn.classList.remove("modal__miniatura-img-c--activo"));
            modalBtnMiniaturas[contador2].classList.add("modal__miniatura-img-c--activo");
    
        } else {
            if(contador1 >= imagenes.length - 1) {
                contador1 = 0;
            } else {
                contador1++;
            } 
    
            imagenes.forEach(img => img.classList.remove(clase));
            imagenes[contador1].classList.add(clase);
    
        }
    }

})();
