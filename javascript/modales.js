// Modal About Me
const botonVerMas = document.querySelector('button[data-id="activador-modal"]');
let modal = false;

function activarModal() {
  const modalActivo = (modal = !modal);
  if (modalActivo === true) {
    const contenedorModal = document.createElement("div");
    contenedorModal.classList.add("opacity");
    contenedorModal.innerHTML = `
      <div class="modal-contenido">
        Hola!... Soy <strong>Franco Fabregat</strong>, un Frontend Developer en formación, apasionado por
        crear experiencias digitales atractivas y funcionales. Mi objetivo es
        combinar creatividad y tecnología para diseñar lugares webs que no solo
        sean visualmente impresionantes, sino también fáciles de usar y
        accesibles para todos. Con habilidades en HTML, CSS, JavaScript,
        también sigo aprendiendo nuevas tecnologías y habilidades como el uso de frameworks tales
        como React y Bootstrap y librerías como jQuery ya que es un mundo muy vasto.
        Por ahora domino Bootstrap. Estoy listo para
        enfrentar nuevos desafíos y contribuir al éxito de proyectos
        innovadores mientras aprendo y crezco en este mundo tecnológico. Este es mi <strong>portafolio:</strong>
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
      "../visuales/capturas-de-proyectos/pasteleria/photo1.png",
      "../visuales/capturas-de-proyectos/pasteleria/photo2.jpg",
      "../visuales/capturas-de-proyectos/pasteleria/photo3.jpg",
      "../visuales/capturas-de-proyectos/pasteleria/photo4.jpg",
    ],
  },
  proyecto2: {
    id: "proyecto2",
    titulo: "Sabor de Barrio Website",
    descripcion:
      "Creé un sitio web básico y de un restaurante local llamado 'Sabor de Barrio'. El sitio incluye fotos de los platillos y menu, horarios de apertura y contacto. Implementé un diseño responsivo para asegurar que el sitio se vea bien en dispositivos móviles y de escritorio.",
    tecnologias: ["HTML", "CSS"],
    Imagen: [
      "../visuales/capturas-de-proyectos/saborDbarrio/photo1.png",
      "../visuales/capturas-de-proyectos/saborDbarrio/photo2.png",
    ],
  },
  proyecto3: {
    id: "proyecto3",
    titulo: "Apple Store Website Clone",
    descripcion:
      "Cloné una página web inspirada en Apple Store, con un diseño moderno y funcional que refleja la identidad de la marca. Muestro un producto nuevo, servicios y contacto.",
    tecnologias: ["HTML", "CSS"],
    Imagen: ["../visuales/capturas-de-proyectos/appleStore/photo1.png"],
  },
};

function activarModalProyecto(e) {
  const idProyecto = e.currentTarget.getAttribute("data-id");
  const proyecto = proyectos[idProyecto];
  if (proyecto) {
    const vistaProyecto = document.createElement("div");
    vistaProyecto.classList.add("opacity");
    vistaProyecto.innerHTML = `
      <div class="modal-contenido"
      style = "width: 80%; height: 80%; overflow: auto;">
        <h2>${proyecto.titulo}</h2>
        <p>${proyecto.descripcion}</p>
        <ul>
          ${proyecto.tecnologias.map((tec) => `<li>${tec}</li>`).join("")}
        </ul>
        <figure class="container-figure">
        <figcaption>Imágenes del proyecto</figcaption>
        ${proyecto.Imagen.map(
          (img) => `<img class="imagenProyecto" src="${img}">`
        ).join("")}
        </figure>
        <button class="salirProyecto" style="!important">❌</button>
      </div>
    `;
    document.body.appendChild(vistaProyecto);
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
