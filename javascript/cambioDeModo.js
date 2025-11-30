// Cambio de Modo Claro/Oscuro

// Variables
const body = document.body;
const botonModoOscuro = document.querySelector(".modo-oscuro-btn");
const header = document.querySelector("header");
const menuLinks = document.querySelector("nav");
const sobreMiSection = document.getElementById("about-me");
const tarjetasProyecto = Array.from(document.querySelectorAll("article"));
const footer = document.getElementById("contacto");
const textos = Array.from(document.querySelectorAll("p, a"));
const encabezados = Array.from(
  document.querySelectorAll("h1, h2, h3, h4, h5, h6")
);
const encabezadosCards = Array.from(
  document.querySelectorAll("[data-id='cardTitle']")
);
const enlaces = Array.from(document.querySelectorAll("a"));
const enlacesNav = Array.from(
  document.querySelectorAll("[data-id='menu-inicio']")
);
const botonVistaDetallada = Array.from(
  document.querySelectorAll(".vistaDetallada")
);
let modoOscuro = false;

// Función para cambiar el modo
function cambiarModo() {
  modoOscuro = !modoOscuro;
  const modoOscuroActivo = !modoOscuro;
  if (!modoOscuroActivo) {
    // Modo claro
    body.classList.add("body-claro");
    header.classList.add("header-claro");
    menuLinks.classList.add("nav-claro");
    sobreMiSection.classList.add("sobreMi-claro");
    tarjetasProyecto.forEach((tarjeta) => tarjeta.classList.add("cards-claro"));
    footer.classList.add("footer-claro");
    textos.forEach((texto) => texto.classList.add("parrafos-claro"));
    encabezados.forEach((encabezado) =>
      encabezado.classList.add("encabezados-claro")
    );
    encabezadosCards.forEach((encabezadosCards) =>
      encabezadosCards.classList.add("encabezados-cards-claro")
    );
    enlaces.forEach((enlace) => enlace.classList.add("enlaces-claro"));
    botonVistaDetallada.forEach((boton) =>
      boton.classList.add("enlaces-claro")
    );
    enlacesNav.forEach((enlace) => enlace.classList.remove("enlaces-claro"));
    botonModoOscuro.textContent = "☀️";
  } else {
    // Modo oscuro (restaura)
    body.classList.remove("body-claro");
    header.classList.remove("header-claro");
    menuLinks.classList.remove("nav-claro");
    sobreMiSection.classList.remove("sobreMi-claro");
    tarjetasProyecto.forEach((tarjeta) =>
      tarjeta.classList.remove("cards-claro", "encabezados-cards-claro")
    );
    encabezadosCards.forEach((encabezadosCards) =>
      encabezadosCards.classList.remove("encabezados-cards-claro")
    );
    footer.classList.remove("footer-claro");
    textos.forEach((texto) => texto.classList.remove("parrafos-claro"));
    encabezados.forEach((encabezado) =>
      encabezado.classList.remove("encabezados-claro")
    );
    enlaces.forEach((enlace) => enlace.classList.remove("enlaces-claro"));
    botonVistaDetallada.forEach((boton) =>
      boton.classList.remove("enlaces-claro")
    );
    botonModoOscuro.textContent = "🌙";
  }
}

if (botonModoOscuro) {
  botonModoOscuro.addEventListener("click", cambiarModo);
}
