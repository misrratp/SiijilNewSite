/* ==============================================================
   SCRIPT PRINCIPAL - SÍIJIL NOH HÁ
   ============================================================== */

/* --------------------------------------------------------------
   1. MENÚ MÓVIL (Lógica Blindada)
   -------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // Solo se ejecuta cuando el HTML ya cargó por completo
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
   2. TIENDA Y CARRITO
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

/* Pasarela Falsa */
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
  btnPagar.style.backgroundColor = "#ccc";
  btnPagar.disabled = true;

  setTimeout(() => {
    alert("¡Pago Aprobado! 🎉 Gracias por tu compra.");
    carrito = [];
    total = 0;
    actualizarVistaCarrito();
    window.cerrarPasarela();
    document.getElementById('carrito-flotante').style.display = 'none';
    btnPagar.innerText = textoOriginal;
    btnPagar.style.backgroundColor = "";
    btnPagar.disabled = false;
    event.target.reset();
  }, 2000);
}


/* --------------------------------------------------------------
   3. MASCOTA INTERACTIVA
   -------------------------------------------------------------- */
window.hacerEnojar = function() {
  const mascota = document.getElementById('mascota-img');
  const audio = document.getElementById('sonido-enojo');
  
  if (!mascota) return;
  if (mascota.classList.contains('mascota-enojada')) return;

  // Sonido
  if (audio) {
    audio.volume = 1.0;
    audio.currentTime = 0; 
    var promesa = audio.play();
    if (promesa !== undefined) {
        promesa.catch(error => console.log("Audio bloqueado:", error));
    }
  }

  // Animación
  mascota.classList.add('mascota-enojada');
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
   5. SLIDER DE NOVEDADES
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
   6. POSTAL NAVIDEÑA
   -------------------------------------------------------------- */
const inputPostal = document.getElementById('input-postal');
const imgVistaPrevia = document.getElementById('vista-previa-postal');

if (inputPostal) {
  inputPostal.addEventListener('change', function(event) {
    const archivo = event.target.files[0];
    if (archivo) {
      imgVistaPrevia.src = URL.createObjectURL(archivo);
    }
  });
}

// --- FUNCIÓN 1: PUBLICAR FOTO (CALIDAD ULTRA HD 2.5X) ---
    const btnPublicar = document.getElementById('btn-publicar');
    
    if (btnPublicar) {
      btnPublicar.addEventListener('click', async () => {
        const marco = document.querySelector('.marco-borde');
        
        if(!marco) return;

        const textoOriginal = '<ion-icon name="cloud-upload"></ion-icon> Publicar';
        btnPublicar.innerHTML = '✨ Renderizando HD...';
        btnPublicar.disabled = true;

        try {
          // DETECTAR DISPOSITIVO
          const esCelular = window.innerWidth < 800;
          
          // AJUSTES DE CALIDAD: Usamos 2.5x la resolución base para máxima nitidez en móvil.
          const escala = esCelular ? 2.5 : 1.0; 

          // PASO 2: TOMAR LA FOTO CON HTML2CANVAS
          const canvas = await html2canvas(marco, { 
              scale: escala, // <--- CAMBIO CRUCIAL PARA LA NITIDEZ
              useCORS: true, 
              logging: false,
              allowTaint: true,
              backgroundColor: null,
              imageTimeout: 0
          });

          // Compresión suave (0.95 para máxima calidad de color)
          const imagenBase64 = canvas.toDataURL('image/jpeg', 0.95);

          btnPublicar.innerHTML = '☁️ Subiendo...';

          // SUBIR A STORAGE
          const nombreArchivo = `postales/postal_HD_${Date.now()}.jpg`;
          const referenciaStorage = ref(storage, nombreArchivo);
          await uploadString(referenciaStorage, imagenBase64, 'data_url');
          
          // GUARDAR DATOS
          btnPublicar.innerHTML = '💾 Finalizando...';
          const urlPublica = await getDownloadURL(referenciaStorage);

          await addDoc(collection(db, "muro_navideno"), {
            fotoUrl: urlPublica,
            fecha: new Date()
          });

          alert("¡LISTO! Tu postal se subió en Alta Definición 📸");
          cargarMuro(); 

        } catch (error) {
          console.error("Error al subir:", error);
          // Si falla, es por memoria. El código vuelve a habilitar el botón.
          alert("⚠️ ¡Error! El navegador se quedó sin memoria (la foto es muy pesada). Intenta con una foto más pequeña.");
        } finally {
          btnPublicar.innerHTML = textoOriginal;
          btnPublicar.disabled = false;
        }
      });
    }

/* --------------------------------------------------------------
   7. REPRODUCTOR DE MÚSICA
   -------------------------------------------------------------- */
let isPlaying = false;

window.toggleMusic = function() {
  const disco = document.getElementById('vinyl-disc');
  const audio = document.getElementById('selva-audio');
  const texto = document.getElementById('music-text');

  if (!audio || !disco) return;

  if (isPlaying) {
    // PAUSA
    audio.pause();
    disco.classList.remove('disco-girando');
    texto.innerText = "🎵 SONIDO SELVA";
    texto.style.color = "white";
    isPlaying = false;
  } else {
    // PLAY
    // Giro visual inmediato
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