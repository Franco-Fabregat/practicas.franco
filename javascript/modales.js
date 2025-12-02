// Modal About Me
const botonVerMas = document.querySelector('button[data-id="activador-modal"]');
botonVerMas.style.cursor = "pointer";
botonVerMas.style.color = "black";
botonVerMas.style.fontWeight = "bold";
let modal = false;

function activarModal() {
  const modalActivo = (modal = !modal);
  if (modalActivo === true) {
    const contenedorModal = document.createElement("div");
    contenedorModal.classList.add("opacity");
    contenedorModal.innerHTML = `
      <div class="modal-contenido">
      <p class="texto-presentacion">
      Hola!... Soy <strong>Franco Fabregat</strong>, un Frontend Developer en formación,
      apasionado por crear experiencias digitales atractivas y funcionales.
      Mi objetivo es combinar creatividad y tecnología para diseñar sitios web que no solo sean visualmente impresionantes,
      sino también fáciles de usar y accesibles para todos.
<br>
Cuento con habilidades en <strong>HTML</strong>, <strong>CSS</strong>, <strong>JavaScript</strong> y
<strong>Bootstrap</strong>. Actualmente continúo ampliando mis conocimientos en <strong>JavaScript</strong>,
y luego estaré explorando nuevas tecnologías, como el uso de frameworks entre ellos <strong>React</strong> y
librerías como <strong>jQuery</strong>, ya que el mundo del desarrollo web es amplio y siempre está en evolución.
Por ahora, domino especificamente JavaScript orientado al DOM para crear interfaces interactivas.
<br>
Bienvenido a mi <strong>portafolio:</strong>
      </p>
        <button class="salir">❌</button>
      </div>
    `;
    document.body.appendChild(contenedorModal);
    // DESHABILITAR SCROLL DEL FONDO CUANDO EL MODAL ESTÁ ABIERTO
    document.body.style.overflow = "hidden";
    // Cerrar modal al hacer clic en el botón "❌"
    contenedorModal.querySelector(".salir").addEventListener("click", () => {
      contenedorModal.remove();
      modal = false;
      // HABILITAR SCROLL DEL FONDO CUANDO EL MODAL SE CIERRA
      document.body.style.overflow = "";
    });
  }
}

botonVerMas.addEventListener("click", activarModal);

// ===========================================================

// Modal para Proyectos
const botnVerProyectos = document.querySelectorAll(
  "[data-proyecto='modal-proyecto']"
);
const proyectos = {
  proyecto1: {
    id: "proyecto1",
    titulo: "Pastelería Dulce Encanto Website",
    descripcion:
      "Desarrollé un sitio web para una pastelería local llamada 'Dulce Encanto'. El sitio presenta un diseño atractivo y funcional, con secciones para mostrar productos, promociones y contacto. Utilicé HTML, CSS y JavaScript para crear una experiencia de usuario amigable y visualmente atractiva.",
    tecnologias: ["HTML", "CSS"],
    Imagen: [
      "visuales/capturas-de-proyectos/pasteleria/photo1.png",
      "visuales/capturas-de-proyectos/pasteleria/photo2.jpg",
      "visuales/capturas-de-proyectos/pasteleria/photo3.jpg",
      "visuales/capturas-de-proyectos/pasteleria/photo4.jpg",
    ],
  },
  proyecto2: {
    id: "proyecto2",
    titulo: "Sabor de Barrio Website",
    descripcion:
      "Creé un sitio web básico y de un restaurante local llamado 'Sabor de Barrio'. El sitio incluye fotos de los platillos y menu, horarios de apertura y contacto. Implementé un diseño responsivo para asegurar que el sitio se vea bien en dispositivos móviles y de escritorio.",
    tecnologias: ["HTML", "CSS"],
    Imagen: [
      "visuales/capturas-de-proyectos/saborDbarrio/photo1.png",
      "visuales/capturas-de-proyectos/saborDbarrio/photo2.png",
    ],
  },
  proyecto3: {
    id: "proyecto3",
    titulo: "Apple Store Website Clone",
    descripcion:
      "Cloné una página web inspirada en Apple Store, con un diseño moderno y funcional que refleja la identidad de la marca. Muestro un producto nuevo, servicios y contacto.",
    tecnologias: ["HTML", "CSS"],
    Imagen: ["visuales/capturas-de-proyectos/appleStore/photo1.png"],
  },
  proyecto4: {
    id: "proyecto4",
    titulo: "Galería de Productos Digitales",
    descripcion:
      "Una galería de productos inspirada en una tienda real, mostrando solo unos pocos productos digitales como ejemplo.",
    tecnologias: ["HTML", "CSS"],
    Imagen: [
      "visuales/capturas-de-proyectos/galeriaDproductos/photo1.png",
      "visuales/capturas-de-proyectos/galeriaDproductos/photo2.png",
    ],
  },
  proyecto5: {
    id: "proyecto5",
    titulo: "TechNova Store.website",
    descripcion:
      "Tienda de Productos digitales digitales, con diseño responsivo.",
    tecnologias: ["HTML", "CSS", "Bootstrap"],
    Imagen: [
      "visuales/capturas-de-proyectos/TechStore/photo1.png",
      "visuales/capturas-de-proyectos/TechStore/photo2.png",
      "visuales/capturas-de-proyectos/TechStore/photo3.png",
      "visuales/capturas-de-proyectos/TechStore/photo4.png",
    ],
  },

  proyecto6: {
    id: "proyecto6",
    titulo: "Juego 3 en Raya (Tic Tac Toe)",
    descripcion:
      "Famoso juego X y O, un juego que permite a dos jugadores competir en un tablero interactivo. Muestra el estado del juego en tiempo real y determina el ganador o si hay un empate.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    Imagen: [
      "visuales/capturas-de-proyectos/3enRaya/photo1.png",
      "visuales/capturas-de-proyectos/3enRaya/photo2.png",
      "visuales/capturas-de-proyectos/3enRaya/photo3.png",
      "visuales/capturas-de-proyectos/3enRaya/photo4.png",
    ],
  },
  proyecto7: {
    id: "proyecto7",
    titulo: " App Web de Tareas (To-Do List)",
    descripcion:
      "Aplicación web para gestionar tareas diarias. Permite a los usuarios agregar, marcar como completadas y eliminar tareas, con una interfaz sencilla y funcional.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    Imagen: [
      "visuales/capturas-de-proyectos/AppTareas/photo1.png",
      "visuales/capturas-de-proyectos/AppTareas/photo2.png",
      "visuales/capturas-de-proyectos/AppTareas/photo3.png",
    ],
  },
};

function activarModalProyecto(e) {
  const idProyecto = e.currentTarget.getAttribute("data-id");
  const proyecto = proyectos[idProyecto];
  if (proyecto) {
    const vistaProyecto = document.createElement("div");
    vistaProyecto.classList.add("opacity");
    vistaProyecto.innerHTML = `
      <div class="modal-contenido">
        <h2 class ="tituloProyecto">${proyecto.titulo}</h2>
        <p>${proyecto.descripcion}</p>
        <ul style="text-align: left;" >
          ${proyecto.tecnologias.map((tec) => `<li>${tec}</li>`).join("")}
        </ul>
        <figure class="container-figure">
        <figcaption>Imágenes del proyecto</figcaption>
        ${proyecto.Imagen.map(
          (img) => `<img class="imagenProyecto" src="${img}">`
        ).join("")}
        </figure>
        <button class="salirProyecto"">❌</button>
      </div>
    `;
    document.body.appendChild(vistaProyecto);

    // Esta lógica vive aquí para que las imágenes y el contenedor existan en el DOM
    // en el momento en que se hace el querySelector y se agregan los listeners.

    const imagenesProyecto = vistaProyecto.querySelectorAll(".imagenProyecto");
    let imagenGrande = false;

    function manejarZoomImagen(e) {
      const imagenClicada = e.currentTarget;

      if (!imagenGrande) {
        // Primer clic: agrandar imagen
        imagenGrande = true;

        // quitar enfoque de todas
        imagenesProyecto.forEach((img) => {
          img.classList.remove("imagen-enfocada");
        });

        // dar enfoque solo a la clicada
        imagenClicada.classList.add("imagen-enfocada");
      } else {
        // Segundo clic: volver todo a su estado original
        imagenGrande = false;

        imagenesProyecto.forEach((img) => {
          img.classList.remove("imagen-enfocada");
        });
      }
    }

    // Agrandar imágenes en el modal de proyectos para verlas mejor
    imagenesProyecto.forEach((imagen) => {
      imagen.addEventListener("click", manejarZoomImagen);
    });

    // 2. Clic fuera para volver al tamaño original
    // vistaProyecto.addEventListener("click", (e) => {
    //   // Si haces clic directamente en el fondo (no en el contenido)
    //   if (e.target === vistaProyecto) {
    //     imagenesProyecto.forEach((img) => {
    //       img.style.transform = "scale(1)";
    //     });
    // }
    // });

    // DESHABILITAR SCROLL DEL FONDO CUANDO EL MODAL DE PROYECTO ESTÁ ABIERTO
    document.body.style.overflow = "hidden";
    vistaProyecto
      .querySelector(".salirProyecto")
      .addEventListener("click", () => {
        vistaProyecto.remove();
        // HABILITAR SCROLL DEL FONDO CUANDO EL MODAL DE PROYECTO SE CIERRA
        document.body.style.overflow = "";
      });
  }
}

// Asignar evento a cada botón de proyecto
botnVerProyectos.forEach((btn) => {
  btn.addEventListener("click", activarModalProyecto);
});

// ===========================================================

