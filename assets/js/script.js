/* ==============================================================
   SCRIPT PRINCIPAL - SÍIJIL NOH HÁ (ESTADO FINAL)
   ============================================================== */

/* --------------------------------------------------------------
   1. LÓGICA DEL MENÚ MÓVIL (Blindado)
   -------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const navOpenBtn = document.querySelector("[data-nav-open-btn]");
  const navbar = document.querySelector("[data-navbar]");
  const navCloseBtn = document.querySelector("[data-nav-close-btn]");
  const overlay = document.querySelector("[data-overlay]");
  const navLinks = document.querySelectorAll("[data-nav-link]");

  function toggleNavbar() {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");
  }

  // Asignar clics de forma segura
  if (navOpenBtn) navOpenBtn.onclick = toggleNavbar;
  if (navCloseBtn) navCloseBtn.onclick = toggleNavbar;
  if (overlay) overlay.onclick = toggleNavbar;

  // Cerrar menú al tocar un enlace
  navLinks.forEach(link => {
    link.onclick = function() {
      navbar.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("active");
    };
  });
});


/* --------------------------------------------------------------
   2. TIENDA Y CARRITO (Lógica)
   -------------------------------------------------------------- */
let carrito = [];
let total = 0;

window.agregarAlCarrito = function(producto, precio) {
  carrito.push({ producto, precio });
  total += precio;
  actualizarVistaCarrito();
  const carritoFlotante = document.getElementById('carrito-flotante');
  if (carritoFlotante) carritoFlotante.style.display = 'block';
}

function actualizarVistaCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalElemento = document.getElementById('total-carrito');
  if(lista) lista.innerHTML = '';
  
  carrito.forEach((item) => {
    if(lista) {
      lista.innerHTML += `
        <li style="font-size: 14px; color: #555; margin-bottom: 5px; display: flex; justify-content: space-between;">
          ${item.producto} <span>$${item.precio}</span>
        </li>`;
    }
  });
  if(totalElemento) totalElemento.innerText = `$${total} MXN`;
}

window.finalizarCompraWhatsApp = function() {
  if (carrito.length === 0) return;
  let mensaje = "Hola Síijil Noh Há, quiero comprar:%0D%0A";
  carrito.forEach(item => { mensaje += `- ${item.producto} ($${item.precio})%0D%0A`; });
  mensaje += `%0D%0ATotal: $${total} MXN`;
  window.open(`https://wa.me/529838090970?text=${mensaje}`, '_blank');
}

window.abrirPasarela = function() {
  if (carrito.length === 0) { alert("Tu carrito está vacío."); return; }
  const modal = document.getElementById('modal-pago');
  if(modal) {
    modal.style.display = 'flex';
    const totalModal = document.getElementById('total-pago-modal');
    if(totalModal) totalModal.innerText = `$${total} MXN`;
  }
}

window.cerrarPasarela = function() {
  const modal = document.getElementById('modal-pago');
  if(modal) modal.style.display = 'none';
}

window.procesarPago = function(event) {
  event.preventDefault();
  const btnPagar = document.getElementById('btn-pagar');
  const textoOriginal = btnPagar.innerText;
  
  btnPagar.innerText = "Procesando...";
  btnPagar.backgroundColor = "#ccc";
  btnPagar.disabled = true;

  setTimeout(() => {
    alert("¡Pago Aprobado! 🎉 Gracias por tu compra.");
    carrito = [];
    total = 0;
    actualizarVistaCarrito();
    window.cerrarPasarela();
    document.getElementById('carrito-flotante').style.display = 'none';
    btnPagar.innerText = textoOriginal;
    btnPagar.backgroundColor = "";
    btnPagar.disabled = false;
    event.target.reset();
  }, 2000);
}


/* --------------------------------------------------------------
   3. MASCOTA INTERACTIVA (Sonido y Animación)
   -------------------------------------------------------------- */
window.hacerEnojar = function() {
  const mascota = document.getElementById('mascota-img');
  const audio = document.getElementById('sonido-enojo');
  
  if (!mascota) return;

  // Si ya está enojada, no hacemos nada
  if (mascota.classList.contains('mascota-enojada')) return;

  // 1. SONIDO
  if (audio) {
    audio.volume = 1.0;
    audio.currentTime = 0; 
    var promesa = audio.play();
    if (promesa !== undefined) {
        promesa.catch(error => console.log("Audio bloqueado:", error));
    }
  }

  // 2. ANIMACIÓN
  mascota.classList.add('mascota-enojada');

  // 3. QUITAR ENOJO
  setTimeout(() => {
    mascota.classList.remove('mascota-enojada');
  }, 500);
}


/* --------------------------------------------------------------
   4. EFECTO DE NIEVE
   -------------------------------------------------------------- */
function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  snowflake.innerHTML = '❄';
  snowflake.style.left = Math.random() * 100 + 'vw';
  snowflake.style.fontSize = (Math.random() * 15 + 10) + 'px';
  snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
  snowflake.style.opacity = Math.random();
  document.body.appendChild(snowflake);
  setTimeout(() => { snowflake.remove(); }, 5000);
}
// Iniciamos la nieve
setInterval(createSnowflake, 200);


/* --------------------------------------------------------------
   5. SLIDER AUTOMÁTICO DE NOVEDADES
   -------------------------------------------------------------- */
const trackNovedades = document.querySelector('.slider-track');
const slidesNovedades = document.querySelectorAll('.slide');
let indexSlider = 0;

function moverSlider() {
  if (!trackNovedades || slidesNovedades.length === 0) return;
  indexSlider++;
  if (indexSlider >= slidesNovedades.length) indexSlider = 0;
  trackNovedades.style.transform = `translateX(${indexSlider * -100}%)`;
}
if (slidesNovedades.length > 0) setInterval(moverSlider, 4000);


/* --------------------------------------------------------------
   6. POSTAL NAVIDEÑA (Lógica de subir y borrar)
   -------------------------------------------------------------- */
const inputPostal = document.getElementById('input-postal');
const imgVistaPrevia = document.getElementById('vista-previa-postal');

// Subir foto al marco
if (inputPostal) {
  inputPostal.addEventListener('change', function(event) {
    const archivo = event.target.files[0];
    if (archivo) {
      imgVistaPrevia.src = URL.createObjectURL(archivo);
    }
  });
}

// Borrar foto del marco
window.borrarFoto = function() {
  if (imgVistaPrevia) imgVistaPrevia.src = "./assets/images/logo.svg"; 
  if (inputPostal) inputPostal.value = ""; 
}

// Descargar postal como imagen
window.descargarPostal = function() {
  const marco = document.querySelector('.marco-borde');
  if (!marco || typeof html2canvas === 'undefined') {
    console.error("Falta html2canvas");
    return;
  }
  
  const btn = document.querySelector('.btn-descargar');
  const textoOriginal = btn ? btn.innerHTML : "Descargar";
  if(btn) btn.innerHTML = '⏳ ...';

  html2canvas(marco, { scale: 2, useCORS: true }).then(canvas => {
    const enlace = document.createElement('a');
    enlace.download = 'Mi-Postal-Siijil.png';
    enlace.href = canvas.toDataURL('image/png');
    enlace.click();
    if(btn) btn.innerHTML = textoOriginal;
  });
}


/* --------------------------------------------------------------
   7. REPRODUCTOR DE MÚSICA (Toggle)
   -------------------------------------------------------------- */
let isPlaying = false;

window.toggleMusic = function() {
  const disco = document.getElementById('vinyl-disc');
  const audio = document.getElementById('selva-audio');
  const texto = document.getElementById('music-text');

  if (!audio || !disco) return;

  if (isPlaying) {
    // PAUSAR
    audio.pause();
    disco.classList.remove('disco-girando');
    texto.innerText = "🎵 SONIDO SELVA";
    texto.style.color = "white";
    isPlaying = false;
  } else {
    // PLAY
    disco.classList.add('disco-girando');
    texto.innerText = "⌛ CARGANDO...";
    texto.style.color = "#F8B229";

    audio.volume = 0.5;

    audio.play()
      .then(() => {
        texto.innerText = "🎶 REPRODUCIENDO...";
        isPlaying = true;
      })
      .catch(error => {
        console.error(error);
        disco.classList.remove('disco-girando');
        texto.innerText = "❌ ERROR";
        texto.style.color = "red";
      });
  }
}