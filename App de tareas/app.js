// Variables

const inputValue = document.getElementById("nuevaTarea");

const crearTarea = document.querySelector("button");

const contenedorLista = document.querySelector(".lista-tareas");

const lista = document.getElementById("lista");

const btnEliminar = document.querySelector("button[data-id='eliminarTarea']");

const tareas = [];

const btnSalir = document.createElement("button");
btnSalir.textContent = "X";
btnSalir.classList.add("salir");

let deleteMode = false;

// Funciones
// Debe ir aquí porque necesitamos tener la función disponible para cualquier parte del código que modifique la lista.

function visibilityBtn() {
  const tieneTareas = lista.querySelectorAll("li").length > 0;

  if (tieneTareas) {
    // Hay tareas: mostrar el botón eliminar (no la X)
    btnEliminar.style.visibility = "visible";
  } else {
    // No hay tareas: ocultar botón eliminar y asegurarnos de salir del modo eliminar
    btnEliminar.style.visibility = "hidden";
    deleteMode = false;

    // Si la X está puesta en el contenedor, la quitamos
    if (btnSalir.parentElement === contenedorLista) {
      btnSalir.remove();
    }

    // Y nos aseguramos de que el botón eliminar vuelva al contenedor
    if (btnEliminar.parentElement !== contenedorLista) {
      contenedorLista.appendChild(btnEliminar);
    }
  }
}

function mensajeTareas(contador) {
  contador = lista.querySelectorAll("li").length > 0;

  const h3Antiguo = document.querySelector("h3");
  if (h3Antiguo) {
    h3Antiguo.remove();
  }
  const h3 = document.createElement("h3");

  // h3.textContent = tieneTareas ? "Tareas por Hacer" : "No Hay Tareas Aún";

  if (contador) {
    h3.textContent = "Tareas Pendientes";
  } else {
    h3.textContent = "No Existen Tareas Todavía";
  }
  contenedorLista.prepend(h3);
}

function mensajeTareasCumplidas() {
  const tareasTerminadas = Array.from(
    lista.querySelectorAll("li.tareaTerminada")
  );
  const tareasPendientes = Array.from(
    lista.querySelectorAll("li:not(.tareaTerminada)")
  );

  let mensajeTareasCumplidas = lista.querySelector(
    "h3.mensaje-tareas-cumplidas"
  );

  if (tareasTerminadas.length === 0) {
    if (mensajeTareasCumplidas) {
      mensajeTareasCumplidas.remove();
    }

    tareasPendientes.forEach((tareaPendiente) =>
      lista.appendChild(tareaPendiente)
    );
    return;
  }

  if (!mensajeTareasCumplidas) {
    mensajeTareasCumplidas = document.createElement("h3");
    mensajeTareasCumplidas.classList.add("mensaje-tareas-cumplidas");
    mensajeTareasCumplidas.style.marginTop = "1rem";
    mensajeTareasCumplidas.textContent = "Tareas Cumplidas/Completadas";
  }

  tareasPendientes.forEach((tareaPendiente) =>
    lista.appendChild(tareaPendiente)
  );
  lista.appendChild(mensajeTareasCumplidas);
  tareasTerminadas.forEach((tareaTerminada) =>
    lista.appendChild(tareaTerminada)
  );
}

function eliminarTarea(check) {
  if (deleteMode) {
    const li = check.parentElement;
    if (check.checked) {
      const confirmar = confirm("¿Estas seguro que deseas eliminar la tarea?");
      if (confirmar === true) {
        li.remove();
        mensajeTareas();
        visibilityBtn();
        mensajeTareasCumplidas();
      }
    } else {
      check.checked = false;
      return;
    }
  }
}

function tareaTachada(check) {
  const li = check.parentElement;
  if (check.checked) {
    li.style.textDecoration = "line-through";
    li.classList.add("tareaTerminada");
  } else {
    li.style.textDecoration = "none";
    li.classList.remove("tareaTerminada");
  }
  mensajeTareasCumplidas();
}
// Debe ir aquí porque al iniciar la aplicación necesitamos dejar el botón oculto si la lista comienza vacía.
visibilityBtn();
mensajeTareas();

function añadirTarea() {
  tareas.push(inputValue.value);
  if (inputValue.value === "") return;
  const li = document.createElement("li");
  li.classList.add("tarea");
  li.style.fontSize = "18px";
  const check = document.createElement("input");
  check.type = "checkbox";
  check.style.marginLeft = "10px";
  // Si el usuario está en modo eliminar cuando crea una nueva tarea,
  // también le añadimos la clase "checkMoodEliminar" a este checkbox
  if (deleteMode) {
    check.classList.add("checkMoodEliminar");
  }

  li.textContent = tareas[tareas.length - 1];
  li.appendChild(check);
  lista.prepend(li);
  mensajeTareas();
  visibilityBtn();
  inputValue.value = "";
  mensajeTareasCumplidas();

  // Eventos

  // Evento de check para tachar la tarea o eliminar según el modo
  // El mismo checkbox sirve para dos cosas: naturalmente solo tacha o destacha la tarea
  // En "modo eliminar" pregunta y, si se confirma, elimina la tarea.
  check.addEventListener("click", () => eliminarTarea(check));

  // Si no estamos en modo eliminar, o si el usuario canceló la eliminación,
  // el checkbox se comporta como antes: solo tacha o destacha la tarea.
  check.addEventListener("click", () => tareaTachada(check));
}

crearTarea.addEventListener("click", añadirTarea);

// Activa el modo eliminar, quitamos el botón original y mostramos "Salir".
// Además, aquí añadimos la clase "checkMoodEliminar" a TODOS los checkboxes existentes
btnEliminar.addEventListener("click", function () {
  deleteMode = true;
  btnEliminar.remove();
  contenedorLista.appendChild(btnSalir);
  lista.querySelectorAll("input[type='checkbox']").forEach(function (checkbox) {
    checkbox.classList.add("checkMoodEliminar");
  });
});

// Quitamos la clase "checkMoodEliminar" de todos los checkboxes,
// Así dejan de mostrar la animación y vuelven a comportarse solo como tachadores.

btnSalir.addEventListener("click", function () {
  deleteMode = false;
  btnSalir.remove();
  contenedorLista.appendChild(btnEliminar);
  lista.querySelectorAll("input[type='checkbox']").forEach(function (checkbox) {
    checkbox.classList.remove("checkMoodEliminar");
  });
});

inputValue.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    añadirTarea();
  }
});
