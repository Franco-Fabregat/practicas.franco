document
  .querySelector('a[href="#Formulario"]')
  .addEventListener("click", function manejarClickFormulario(e) {
    const id = this.getAttribute("href");
    const destino = document.querySelector(id);

    if (!destino) return;

    e.preventDefault();

    const inicio = window.pageYOffset;
    const fin = destino.getBoundingClientRect().top + inicio;
    const duracion = 2000; // 2 segundos reales
    let tiempoInicio = null;

    function animarScroll(tiempoActual) {
      if (!tiempoInicio) tiempoInicio = tiempoActual;
      const progreso = tiempoActual - tiempoInicio;
      const porcentaje = Math.min(progreso / duracion, 1);

      // easing suave (easeInOut)
      const ease =
        porcentaje < 0.5
          ? 2 * porcentaje * porcentaje
          : 1 - Math.pow(-2 * porcentaje + 2, 2) / 2;

      window.scrollTo(0, inicio + (fin - inicio) * ease);

      if (progreso < duracion) {
        requestAnimationFrame(animarScroll);
      }
    }

    requestAnimationFrame(animarScroll);
  });

// --------- Validación de formulario de reservas (refactor compacta) ---------
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-turno");
  const nombre = form.querySelector("#nombre");
  const dia = form.querySelector("#dia");
  const horario = form.querySelector("#horario");
  const nameRegex = /^[\p{L}\s]+$/u;

  const eliminarMensaje = (el) => {
    const w = el.parentElement;
    const existing = w.querySelector(".message");
    if (existing) existing.remove();
    el.classList.remove("input-error", "input-valid", "input-invalid");
  };

  const mostrarMensaje = (el, type, text) => {
    eliminarMensaje(el);
    const w = el.parentElement;
    const div = document.createElement("div");
    div.className =
      "message " + (type === "error" ? "error-message" : "valid-message");
    div.textContent = text;
    w.appendChild(div);
    if (type === "error") {
      el.classList.add("input-error", "input-invalid");
    } else {
      el.classList.add("input-valid");
      el.classList.remove("input-invalid");
    }
  };

  const validarNombre = () => {
    const v = nombre.value.trim();
    if (!v) {
      mostrarMensaje(nombre, "error", "Por favor ingresa tu nombre.");
      return false;
    }
    if (!nameRegex.test(v)) {
      mostrarMensaje(
        nombre,
        "error",
        "El nombre solo debe contener letras y espacios."
      );
      return false;
    }
    mostrarMensaje(nombre, "valid", "Nombre válido");
    return true;
  };

  const validarDia = () => {
    if (!dia.value) {
      mostrarMensaje(
        dia,
        "error",
        "Selecciona un día (no dejes la opción por defecto)."
      );
      return false;
    }
    mostrarMensaje(dia, "valid", "Día seleccionado");
    return true;
  };

  const validarHorario = () => {
    if (!horario.value) {
      mostrarMensaje(
        horario,
        "error",
        "Selecciona un horario (no dejes la opción por defecto)."
      );
      return false;
    }
    mostrarMensaje(horario, "valid", "Horario seleccionado");
    return true;
  };

  const limpiarMensajeExito = () => {
    const s = form.querySelector(".success-message");
    if (s) s.remove();
  };

  const limpiarTodo = () => {
    // eliminar todos los mensajes de feedback (error/valid) y mensaje de éxito
    form
      .querySelectorAll(".message, .success-message")
      .forEach((el) => el.remove());
    // eliminar clases de estado en inputs
    [nombre, dia, horario].forEach((el) =>
      el.classList.remove("input-error", "input-valid", "input-invalid")
    );
    // resetear formulario
    form.reset();
  };

  const actualizarIndicador = () => {
    const all = validarNombre() && validarDia() && validarHorario();
    const ind = form.querySelector(".form-valid-indicator");
    if (all) {
      if (!ind) {
        const i = document.createElement("div");
        i.className = "form-valid-indicator";
        form.prepend(i);
        i.textContent = "Todos los campos son válidos";
      }
    } else if (ind) ind.remove();
    return all;
  };

  form.addEventListener("submit", function manejarEnvio(e) {
    e.preventDefault();
    [nombre, dia, horario].forEach(eliminarMensaje);
    const ok = validarNombre() && validarDia() && validarHorario();
    if (!ok) {
      const first = form.querySelector(".input-error");
      if (first) first.focus();
      actualizarIndicador();
      return;
    }

    limpiarMensajeExito();
    let s = form.querySelector(".success-message");
    if (!s) {
      s = document.createElement("div");
      s.className = "success-message";
      form.prepend(s);
    }
    s.textContent = "Reserva enviada correctamente. ¡Gracias!";
    s.style.fontSize = "1.3em";
    const ind = form.querySelector(".form-valid-indicator");
    if (ind) ind.remove();
    form.reset();
    setTimeout(() => {
      limpiarTodo();
    }, 2000);
  });

  // validación en tiempo real
  nombre.addEventListener("change", function manejarCambioNombre() {
    limpiarMensajeExito();
    eliminarMensaje(nombre);
    validarNombre();
    actualizarIndicador();
  });
  dia.addEventListener("change", function manejarCambioDia() {
    limpiarMensajeExito();
    eliminarMensaje(dia);
    validarDia();
    actualizarIndicador();
  });
  horario.addEventListener("change", function manejarCambioHorario() {
    limpiarMensajeExito();
    eliminarMensaje(horario);
    validarHorario();
    actualizarIndicador();
  });
});
