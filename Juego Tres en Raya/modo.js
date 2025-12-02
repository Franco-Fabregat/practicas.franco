const modo = document.querySelector('[data-id="CambiaModo"]');
let modoOscuroActivo = false;

modo.addEventListener("click", () => {
  modoOscuroActivo = !modoOscuroActivo;
  const icono = modoOscuroActivo ? "🌙" : "🌞";

  modo.textContent = icono;
  document.body.classList.toggle("dark", modoOscuroActivo);
});
