document.addEventListener("DOMContentLoaded", () => {
  // Toggle modales: solo uno visible a la vez
  const toggleBtns = document.querySelectorAll(".toggle-btn");
  const modales = document.querySelectorAll(".modal");

  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const objetivo = btn.dataset.target;
      modales.forEach((modal) => {
        if (modal.id === objetivo) {
          if (modal.style.display === "flex") {
            modal.style.display = "none";
          } else {
            modales.forEach((m) => (m.style.display = "none"));
            modal.style.display = "flex";
          }
        } else {
          modal.style.display = "none";
        }
      });
    });
  });

  // Botón cerrar modal
  modales.forEach((modal) => {
    const closeBtn = modal.querySelector(".modal-close");
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Cerrar modal clickeando fuera del contenido
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });

  // --- Botón Hamburguesa ---
  const btnMenu = document.getElementById("btn-menu");
  const menuLateral = document.getElementById("menu-lateral");

  btnMenu.addEventListener("click", () => {
    const isOpen = menuLateral.classList.toggle("open");
    btnMenu.setAttribute("aria-expanded", isOpen);
  });

  menuLateral.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuLateral.classList.remove("open");
      btnMenu.setAttribute("aria-expanded", "false");
    });
  });

  // --- Calculadora ---
  const pantalla = document.getElementById("pantalla");
  const botonesCalc = document.querySelectorAll(".btn-calc");
  const btnClear = document.querySelector(".btn-clear");

  botonesCalc.forEach((btn) => {
    btn.addEventListener("click", () => {
      const valor = btn.dataset.valor;

      if (valor === "=") {
        try {
          pantalla.value = eval(pantalla.value);
        } catch {
          pantalla.value = "Error";
        }
      } else {
        pantalla.value += valor;
      }
    });
  });

  btnClear.addEventListener("click", () => {
    pantalla.value = "";
  });

  // --- Galería ---
  const galeria = ["static/ny1.jpg", "static/ny2.jpg", "static/ny3.jpg"];
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
  const botones = [
    { id: "btn-sonido1", audioSrc: "static/sonido1.mp3" },
    { id: "btn-sonido2", audioSrc: "static/sonido2.mp3" },
    { id: "btn-sonido3", audioSrc: "static/sonido3.mp3" },
  ];

  botones.forEach(({ id, audioSrc }) => {
    const btn = document.getElementById(id);
    if (!btn) return;

    const audio = new Audio(audioSrc);

    btn.addEventListener("click", () => {
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      } else {
        audio.currentTime = 0;
        audio.play();
      }
    });

    btn.addEventListener("mousedown", () => (btn.style.opacity = "0.8"));
    btn.addEventListener("mouseup", () => (btn.style.opacity = "1"));
    btn.addEventListener("mouseleave", () => (btn.style.opacity = "1"));
  });
});
