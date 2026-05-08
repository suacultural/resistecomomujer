// ========================================
// MENU HAMBURGUESA Y NAVEGACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  const labDropdown = document.getElementById('labDropdown');
  const dropdownMenu = document.getElementById('dropdownMenu');

  if (!menuToggle || !navMenu) return;

  // Toggle menú hamburguesa
  menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', menuToggle.classList.contains('active'));
  });

  // Cerrar menú al hacer click en un enlace (móvil)
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // No cerrar si es dropdown
      if (!this.classList.contains('dropdown-toggle')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', false);
      }
    });
  });

  // Dropdown en móvil
  if (labDropdown) {
    labDropdown.addEventListener('click', function(e) {
      if (window.innerWidth <= 767) {
        e.preventDefault();
        const dropdown = this.parentElement;
        dropdown.classList.toggle('active');
        
        // Rotar el icono
        this.style.transform = dropdown.classList.contains('active') 
          ? 'rotate(180deg)' 
          : 'rotate(0)';
      }
    });
  }

  // Cerrar menú al hacer click fuera
  document.addEventListener('click', function(event) {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnToggle = menuToggle.contains(event.target);

    if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', false);
    }
  });

  // Ajustar menú si se redimensiona la ventana
  window.addEventListener('resize', function() {
    if (window.innerWidth > 767) {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', false);
    }
  });

  // Marcar el enlace activo basado en la URL actual
  setActiveLink();
  window.addEventListener('hashchange', setActiveLink);
});

function setActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    link.classList.remove('active');

    // Comparar rutas
    if (href === '/' && currentPage === '' || href === 'index.html') {
      link.classList.add('active');
    } else if (href === currentPage || href.endsWith(currentPage)) {
      link.classList.add('active');
    }
  });
}

// ========================================
// LAZY LOADING DE IMÁGENES
// ========================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ========================================
// SUAVIDAD AL DESPLAZARSE (SMOOTH SCROLL)
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// DETECCIÓN DE MODO OSCURO DEL SISTEMA
// ========================================

function initDarkMode() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDarkMode = localStorage.getItem('darkMode') !== 'false';

  if (prefersDark && isDarkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

initDarkMode();

// Escuchar cambios en preferencias del sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (e.matches && localStorage.getItem('darkMode') !== 'false') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
});

// ========================================
// ANALYTICS Y TRACKING (Opcional)
// ========================================

// Descomentar si usas Google Analytics u otra solución
/*
window.addEventListener('pageview', function(e) {
  console.log('Página visitada:', e.target.location.pathname);
});
*/

// ========================================
// UTILIDADES
// ========================================

// Función para obtener URL de Vimeo
function getVimeoEmbed(videoId, title = 'Video') {
  if (!videoId) return '';
  
  return `
    <iframe 
      src="https://player.vimeo.com/video/${videoId}"
      width="640"
      height="360"
      frameborder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowfullscreen
      title="${title}">
    </iframe>
  `;
}

// Función para detección de dispositivo
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Log de información (desarrollo)
console.log('✓ Resistecomoujer.com cargado correctamente');
console.log('Dispositivo móvil:', isMobileDevice());
console.log('Modo oscuro sistema:', window.matchMedia('(prefers-color-scheme: dark)').matches);
