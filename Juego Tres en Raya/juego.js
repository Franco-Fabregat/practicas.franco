// ================== REFERENCIAS DEL DOM ==================
// Objetivo: guardar los elementos del HTML que se actualizan durante el juego.
const tablero = document.getElementById("tablero");
const mensajeTurno = document.querySelector('[data-player="turno"]');
const finDeJuego = document.querySelector(".endgame");
const mensajeFinDeJuego = document.querySelector(".mensaje-endgame");
const ganador = document.querySelector('[data-player="ganador"]');
const botonReiniciar = document.querySelector(".restart");
const integrarNombres = document.querySelector("form");
const inputJugadorX = document.querySelector('[data-player="X"]');
const inputJugadorO = document.querySelector('[data-player="O"]');
// ================== ESTADO Y CONFIGURACIÓN DEL JUEGO ==================
// Objetivo: definir variables globales y datos compartidos entre funciones.
let comienza = turnoInicialAleatorio();
let turn = 0;
let maxTurns = 9;
let jugadoresRegistrados = false;
let nombresJugadores = {
  X: "",
  O: "",
};
let players = {
  X: "cruz",
  O: "circulo",
};

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

comenzarJuego();
// ================== FUNCIONES DE INICIALIZACIÓN ==================
// Objetivo: preparar el tablero y mostrar el estado inicial del juego.
function comenzarJuego() {
  crearTablero();
  finDeJuego.classList.remove("opacity");
  mensajeFinDeJuego.classList.remove("show");
  turn = 0;
  comienza = turnoInicialAleatorio();
  integrarNombres.reset();
  mensajeTurno.textContent = comienza ? "X" : "O";
  if (!jugadoresRegistrados) {
    mensajeTurno.textContent = "...";
  }
}

function crearTablero() {
  const celdas = 9;

  while (tablero.firstElementChild) {
    tablero.firstElementChild.remove();
  }
  for (let i = 0; i < celdas; i++) {
    const celda = document.createElement("div");
    celda.setAttribute("data-id", i);
    celda.classList.add("celda");
    celda.addEventListener("click", playerClick, { once: true });
    tablero.appendChild(celda);
  }
}

integrarNombres.addEventListener("submit", nombreDelJugador);

function nombreDelJugador(e) {
  e.preventDefault();
  const nombreJugadorX = inputJugadorX.value.trim();
  const nombreJugadorO = inputJugadorO.value.trim();

  if (!nombreJugadorX || !nombreJugadorO) {
    return;
  }

  const jugadores = document.querySelector(".jugadores");
  jugadores.textContent = "";

  const jugadorX = document.createElement("h2");
  const jugadorO = document.createElement("h2");
  jugadorX.textContent = `Jugador X: ${nombreJugadorX}`;
  jugadorO.textContent = `Jugador O: ${nombreJugadorO}`;
  jugadores.appendChild(jugadorX);
  jugadores.appendChild(jugadorO);
  integrarNombres.reset();
  nombresJugadores.X = nombreJugadorX;
  nombresJugadores.O = nombreJugadorO;
  jugadoresRegistrados = true;
  comenzarJuego();
}

// ================== FUNCIONES DE FLUJO DEL JUEGO ==================
// Objetivo: manejar los turnos, dibujar símbolos y validar el resultado.

function turnoInicialAleatorio() {
  const numero = Math.floor(Math.random() * 2); // 0 o 1
  return numero === 0;
}
function playerClick(e) {
  if (!jugadoresRegistrados) {
    alert("Por favor, ingresa un nombre para cada jugador.");
    return;
  }
  const celdaClikeada = e.currentTarget;
  celdaClikeada.style.backgroundColor = "rgba(31, 112, 112, 0.49)";
  const turnoActual = comienza ? players.X : players.O;
  // console.log(celdaClikeada);

  turn++;

  drawSymbol(celdaClikeada, turnoActual);

  const hayGanador = checkWinner(turnoActual);
  if (hayGanador) {
    return;
  }

  if (turn === maxTurns) {
    showEndGame(false);
    return;
  }

  changeTurn();
}

function drawSymbol(e, addClass) {
  e.classList.add(addClass);
}

function changeTurn() {
  comienza = !comienza;
  mensajeTurno.textContent = comienza ? "X" : "O";
}

function checkWinner(jugadorActual) {
  const cells = document.querySelectorAll(".celda");

  const ganador = winningCombinations.some((combinaciones) => {
    return combinaciones.every((posicion) => {
      return cells[posicion].classList.contains(jugadorActual);
    });
  });

  if (!ganador) {
    return;
  }

  showEndGame(true);
  return true;
}

function showEndGame(winner) {
  finDeJuego.classList.add("opacity");
  mensajeFinDeJuego.classList.add("show");
  if (winner) {
    const simboloGanador = comienza ? "X" : "O";
    const nombreGanador = nombresJugadores[simboloGanador] || simboloGanador;
    ganador.textContent = `El jugador ${simboloGanador}: ${nombreGanador}, ha ganado!`;
  } else {
    ganador.textContent = "Empate!";
  }
}

// ================== EVENTOS Y EJECUCIÓN INICIAL ==================
// Objetivo: escuchar acciones del usuario y arrancar el juego apenas carga la página.
botonReiniciar.addEventListener("click", comenzarJuego);
comenzarJuego();
