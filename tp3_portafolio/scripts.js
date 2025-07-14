document.addEventListener("DOMContentLoaded", () => {
  // Toggle modales: solo uno visible a la vez
  const toggleBtns = document.querySelectorAll(".toggle-btn");
  const modales = document.querySelectorAll(".modal");

  toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const objetivo = btn.dataset.target;
      modales.forEach(modal => {
        if(modal.id === objetivo){
          // Mostrar modal si está oculto, sino cerrar
          if(modal.style.display === "flex"){
            modal.style.display = "none";
          } else {
            // cerrar otros
            modales.forEach(m => m.style.display = "none");
            modal.style.display = "flex";
          }
        } else {
          modal.style.display = "none";
        }
      });
    });
  });

  // Botón cerrar modal
  modales.forEach(modal => {
    const closeBtn = modal.querySelector(".modal-close");
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Cerrar modal clickeando fuera del contenido
    modal.addEventListener("click", (e) => {
      if(e.target === modal){
        modal.style.display = "none";
      }
    });
  });

  // --- Calculadora ---
  const pantalla = document.getElementById("pantalla");
  const botonesCalc = document.querySelectorAll(".btn-calc");

  botonesCalc.forEach(btn => {
    btn.addEventListener("click", () => {
      const valor = btn.dataset.valor;

      if (valor === "=") {
        try {
          // Evalua expresion matematica segura
          pantalla.value = eval(pantalla.value);
        } catch {
          pantalla.value = "Error";
        }
      } else if (valor === "C") {
        pantalla.value = "";
      } else {
        pantalla.value += valor;
      }
    });
  });

  // --- Galería ---
  const galeria = [
    "static/ny1.jpg",
    "static/ny2.jpg",
    "static/ny3.jpg"
  ];
  let index = 0;

  const imagen = document.getElementById("imagen-galeria");
  const anterior = document.getElementById("btn-anterior");
  const siguiente = document.getElementById("btn-siguiente");

  function mostrarImagen() {
    imagen.src = galeria[index];
  }

  anterior.addEventListener("click", () => {
    index = (index - 1 + galeria.length) % galeria.length;
    mostrarImagen();
  });

  siguiente.addEventListener("click", () => {
    index = (index + 1) % galeria.length;
    mostrarImagen();
  });

  mostrarImagen();

  // --- Botonera de Sonidos ---
  const sonidos = {
    "btn-sonido1": "static/sonido1.mp3",
    "btn-sonido2": "static/sonido2.mp3",
    "btn-sonido3": "static/sonido3.mp3"
  };

  const botonesSonido = {};
  const audios = {};
  let mute = false;
  let btnMute;

  // Crear audio y almacenar referencias
  Object.keys(sonidos).forEach(id => {
    const boton = document.getElementById(id);
    const audio = new Audio(sonidos[id]);
    botonesSonido[id] = boton;
    audios[id] = audio;

    boton.addEventListener("click", () => {
      if(mute) return; // si está muteado no reproduce

      // Reset audio
      audio.currentTime = 0;
      audio.play();

      // Quitar clase active a todos
      Object.values(botonesSonido).forEach(b => b.classList.remove("active"));
      // Marcar activo el botón presionado
      boton.classList.add("active");
    });
  });

  // Crear botón mute dinámicamente y agregar al DOM botonera
  btnMute = document.createElement("button");
  btnMute.id = "btn-mute";
  btnMute.className = "btn";
  btnMute.textContent = "Mutear";
  const botoneraDiv = document.querySelector("#botonera .btn-group");
  botoneraDiv.parentNode.appendChild(btnMute);

  btnMute.addEventListener("click", () => {
    mute = !mute;
    if(mute){
      btnMute.textContent = "Desmutear";
      btnMute.classList.add("muted");
      // Pausar todos los audios y quitar activo
      Object.values(audios).forEach(audio => audio.pause());
      Object.values(botonesSonido).forEach(b => b.classList.remove("active"));
    } else {
      btnMute.textContent = "Mutear";
      btnMute.classList.remove("muted");
    }
  });

});