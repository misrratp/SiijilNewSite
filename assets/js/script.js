'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
  
  
  
  
  

});

/**
 * ==============================================================
 * FUNCIONALIDAD DE LA TIENDA Y CARRITO (SÍIJIL NOH HÁ)
 * ==============================================================
 */

// 1. Variables Globales
let carrito = [];
let total = 0;

// 2. Función para agregar productos al carrito
function agregarAlCarrito(producto, precio) {
  // Añadimos el producto a la lista
  carrito.push({ producto, precio });
  
  // Sumamos al total
  total += precio;

  // Actualizamos lo que ve el usuario
  actualizarVistaCarrito();
  
  // Hacemos visible la ventanita flotante
  const carritoFlotante = document.getElementById('carrito-flotante');
  if (carritoFlotante) {
    carritoFlotante.style.display = 'block';
  }
}

// 3. Función para dibujar la lista de compras en la ventanita
function actualizarVistaCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalElemento = document.getElementById('total-carrito');
  
  // Limpiamos la lista anterior
  lista.innerHTML = '';

  // Recorremos el carrito y dibujamos cada elemento
  carrito.forEach((item) => {
    lista.innerHTML += `
      <li style="font-size: 14px; color: #555; margin-bottom: 5px; display: flex; justify-content: space-between;">
        ${item.producto} 
        <span>$${item.precio}</span>
      </li>
    `;
  });

  // Actualizamos el texto del precio total
  totalElemento.innerText = `$${total} MXN`;
}

// 4. Función para enviar el pedido por WhatsApp
function finalizarCompraWhatsApp() {
  // Si el carrito está vacío, no hacemos nada
  if (carrito.length === 0) return;

  // Creamos el mensaje base
  let mensaje = "Hola equipo de Síijil Noh Há, quiero comprar los siguientes recuerdos:%0D%0A";
  
  // Añadimos cada producto al mensaje
  carrito.forEach(item => {
    mensaje += `- ${item.producto} ($${item.precio})%0D%0A`;
  });

  // Añadimos el total
  mensaje += `%0D%0ATotal a pagar: $${total} MXN`;
  mensaje += "%0D%0A¿Me indican cómo realizar el pago?";

  // Tu número de teléfono (Asegúrate que esté correcto)
  const numeroWhatsApp = "529838090970"; 
  
  // Abrimos WhatsApp en una nueva pestaña
  window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank');
}

/* ==============================================================
   FUNCIONES DE LA PASARELA DE PAGO (DEMOSTRACIÓN)
   ==============================================================
*/

// 1. Abrir la ventana de pago
function abrirPasarela() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío. Agrega productos primero.");
    return;
  }
  
  // Mostrar el modal
  const modal = document.getElementById('modal-pago');
  modal.style.display = 'flex'; // Usamos flex para centrarlo

  // Actualizar el total en la ventana de pago
  document.getElementById('total-pago-modal').innerText = `$${total} MXN`;
}

// 2. Cerrar la ventana de pago
function cerrarPasarela() {
  const modal = document.getElementById('modal-pago');
  modal.style.display = 'none';
}

// 3. Procesar el pago (Simulación)
function procesarPago(event) {
  event.preventDefault(); // Evita que la página se recargue de golpe

  const btnPagar = document.getElementById('btn-pagar');
  const textoOriginal = btnPagar.innerText;

  // CAMBIO VISUAL: Simular que está pensando
  btnPagar.innerText = "Procesando pago...";
  btnPagar.style.backgroundColor = "#ccc";
  btnPagar.disabled = true;

  // Esperar 3 segundos (3000 milisegundos) para simular conexión con banco
  setTimeout(() => {
    
    // 1. Mensaje de éxito
    alert("¡Pago Aprobado! 🎉\nGracias por tu compra en Síijil Noh Há.");

    // 2. Simular envío de recibo al correo (opcional, o solo limpiar)
    enviarReciboCorreo();

    // 3. Limpiar carrito y cerrar todo
    carrito = [];
    total = 0;
    actualizarVistaCarrito();
    document.getElementById('carrito-flotante').style.display = 'none';
    
    // 4. Restaurar botón y cerrar modal
    btnPagar.innerText = textoOriginal;
    btnPagar.style.backgroundColor = ""; // Regresa al color original
    btnPagar.disabled = false;
    cerrarPasarela();
    
    // Resetear formulario
    event.target.reset();

  }, 3000); 
}

// 4. Generar correo de confirmación de compra (Pago con Tarjeta)
function enviarReciboCorreo() {
    let cuerpo = "COMPROBANTE DE PAGO - SÍIJIL NOH HÁ%0D%0A%0D%0A";
    cuerpo += "Estado: PAGADO (Tarjeta Crédito/Débito)%0D%0A";
    cuerpo += "-----------------------------------%0D%0A";
    
    // Necesitamos una copia temporal del carrito antes de borrarlo
    // (En la función procesarPago ya se borra, pero aquí aun tenemos acceso si lo llamamos antes)
    // Para simplificar, usamos el array global 'carrito' que aún tiene datos en este milisegundo.
    
    carrito.forEach(item => {
        cuerpo += `- ${item.producto} ($${item.precio})%0D%0A`;
    });

    cuerpo += "-----------------------------------%0D%0A";
    cuerpo += `TOTAL PAGADO: $${total} MXN%0D%0A`;
    cuerpo += "%0D%0A¡Gracias por tu visita!";

    // Abrir cliente de correo
    // NOTA: Pon aquí tu correo para que te llegue a ti la "notificación" de que pagaron
    window.location.href = `mailto:TU_CORREO_PERSONAL@GMAIL.COM?subject=NUEVA COMPRA PAGADA WEB&body=${cuerpo}`;
}


/* ==========================================
   SLIDER AUTOMÁTICO DE FLYERS
   ========================================== */
const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
let indexSlider = 0;

function moverSlider() {
  // 1. Aumentamos el índice
  indexSlider++;

  // 2. Si llegamos al final, volvemos al principio (0)
  if (indexSlider >= slides.length) {
    indexSlider = 0;
  }

  // 3. Calculamos cuánto mover el riel
  // Si estamos en el slide 1, movemos -100%, si slide 2, -200%, etc.
  const desplazamiento = indexSlider * -100;
  
  if(track) {
    track.style.transform = `translateX(${desplazamiento}%)`;
  }
}

// Configuración: Cambia de imagen cada 4000 milisegundos (4 segundos)
if (slides.length > 0) {
  setInterval(moverSlider, 4000);
}

/* ==========================================
   EFECTO DE NIEVE NAVIDEÑA
   ========================================== */
function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  snowflake.innerHTML = '❄'; 
  
  // Posición horizontal aleatoria
  snowflake.style.left = Math.random() * 100 + 'vw';
  
  // Tamaño aleatorio (entre 10px y 25px)
  snowflake.style.fontSize = (Math.random() * 15 + 10) + 'px';
  
  // Velocidad de caída aleatoria (entre 2s y 5s)
  snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
  
  // Opacidad aleatoria
  snowflake.style.opacity = Math.random();

  document.body.appendChild(snowflake);

  // Eliminar el copo después de 5 segundos para no llenar la memoria
  setTimeout(() => {
    snowflake.remove();
  }, 5000);
}

// Crear un copo cada 100 milisegundos
setInterval(createSnowflake, 100);

/* ==========================================
   LÓGICA DE LA POSTAL NAVIDEÑA
   ========================================== */

const inputPostal = document.getElementById('input-postal');
const imgVistaPrevia = document.getElementById('vista-previa-postal');

// 1. Subir Foto
if (inputPostal) {
  inputPostal.addEventListener('change', function(event) {
    const archivo = event.target.files[0];
    if (archivo) {
      const urlImagen = URL.createObjectURL(archivo);
      imgVistaPrevia.src = urlImagen;
    }
  });
}

// 2. Borrar Foto
function borrarFoto() {
  if (imgVistaPrevia) {
    imgVistaPrevia.src = "https://via.placeholder.com/600x400?text=Sube+Tu+Foto+Aquí";
  }
  if (inputPostal) {
    inputPostal.value = ""; 
  }
}

// 3. Descargar Postal (Requiere html2canvas)
function descargarPostal() {
  const marco = document.querySelector('.marco-borde');
  if (!marco) return;

  // Cambiar texto botón temporalmente
  const btn = document.querySelector('.btn-descargar');
  const textoOriginal = btn.innerHTML;
  btn.innerHTML = '⏳ ...';

  html2canvas(marco, { scale: 2, useCORS: true }).then(canvas => {
    const enlace = document.createElement('a');
    enlace.download = 'Postal-Siijil-Navidad.png';
    enlace.href = canvas.toDataURL('image/png');
    enlace.click();
    btn.innerHTML = textoOriginal;
  });
}

// --- VARIABLES PARA EL SLIDER ---
    let indiceMuro = 0;
    let intervaloMuro; // Para guardar el reloj

    // --- FUNCIÓN 2: CARGAR MURO Y ANIMAR (NUEVA) ---
    async function cargarMuro() {
      const track = document.getElementById('muro-track');
      if (!track) return;

      // 1. Pedir las últimas 10 fotos a Firebase
      const q = query(collection(db, "muro_navideno"), orderBy("fecha", "desc"), limit(10));
      const datos = await getDocs(q);

      // Si no hay fotos, no hacemos nada
      if (datos.empty) {
        track.innerHTML = '<div style="min-width:100%; display:flex; justify-content:center; align-items:center;">¡Sé el primero en subir tu foto! 📸</div>';
        return;
      }

      track.innerHTML = ''; // Limpiar mensaje de carga

      // 2. Crear las diapositivas (Slides)
      datos.forEach((doc) => {
        const data = doc.data();
        
        const slide = document.createElement('div');
        // Estilo: Ocupar el 100% del ancho del marco
        slide.style.minWidth = "100%";
        slide.style.height = "100%";
        slide.style.position = "relative";
        
        slide.innerHTML = `
          <img src="${data.fotoUrl}" style="width: 100%; height: 100%; object-fit: cover; display: block;" alt="Foto de visitante">
          <div style="position: absolute; bottom: 0; left: 0; width: 100%; background: rgba(0,0,0,0.5); color: white; padding: 10px; text-align: center; backdrop-filter: blur(2px);">
             <p style="margin:0; font-size: 14px;">🎄 Visitante Síijil Noh Há ✨</p>
          </div>
        `;
        
        track.appendChild(slide);
      });

      // 3. INICIAR LA ANIMACIÓN AUTOMÁTICA (Cada 3 segundos)
      iniciarAnimacionMuro();
    }

    function iniciarAnimacionMuro() {
      // Limpiamos cualquier reloj anterior para evitar errores
      if (intervaloMuro) clearInterval(intervaloMuro);

      const track = document.getElementById('muro-track');
      const totalSlides = track.children.length;

      // Configurar el reloj: 3000 ms = 3 segundos
      intervaloMuro = setInterval(() => {
        indiceMuro++;

        // Si llegamos al final, volvemos al principio
        if (indiceMuro >= totalSlides) {
          indiceMuro = 0;
        }

        // Mover el riel (Track)
        const desplazamiento = indiceMuro * -100; // -100%, -200%, etc.
        track.style.transform = `translateX(${desplazamiento}%)`;

      }, 3000);
    }

    // Cargar fotos al entrar
    cargarMuro();