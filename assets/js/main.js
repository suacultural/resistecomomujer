document.addEventListener('DOMContentLoaded', function() {
  // Cargar sidebar dinámicamente
  const sidebarContainer = document.getElementById('sidebar-container');
  if (sidebarContainer) {
    // Determinar la ruta relativa según la ubicación del archivo actual
    const currentPath = window.location.pathname;
    let sidebarPath = './assets/html/sidebar.html';
    
    // Si estamos en una subcarpeta (historias/ o laboratorio-de-creacion/)
    if (currentPath.includes('/historias/') || currentPath.includes('/laboratorio-de-creaci')) {
      sidebarPath = '../assets/html/sidebar.html';
    }
    
    fetch(sidebarPath)
      .then(response => response.text())
      .then(html => {
        sidebarContainer.innerHTML = html;
        initializeSidebar();
      })
      .catch(err => console.error('Error loading sidebar:', err));
  } else {
    initializeSidebar();
  }

  function initializeSidebar() {
    // Hamburger menu toggle (DESKTOP)
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuClose = document.getElementById('menuClose');

    // Mobile header toggle (MÓVIL)
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');

    const openMenu = function() {
      if (sidebar) sidebar.classList.add('active');
      if (menuToggle) menuToggle.classList.add('active');
      if (mobileMenuToggle) mobileMenuToggle.classList.add('active');
      if (menuOverlay) menuOverlay.classList.add('active');
    };

    const closeMenu = function() {
      if (sidebar) sidebar.classList.remove('active');
      if (menuToggle) menuToggle.classList.remove('active');
      if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
      if (menuOverlay) menuOverlay.classList.remove('active');
    };

    // Desktop hamburger
    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        menuToggle.classList.toggle('active');
        menuOverlay.classList.toggle('active');
      });
    }

    // Mobile header toggle
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', openMenu);
    }

    if (menuClose) {
      menuClose.addEventListener('click', closeMenu);
    }

    if (menuOverlay) {
      menuOverlay.addEventListener('click', closeMenu);
    }

    // Toggle solo para desplegables (HISTORIAS y Laboratorio)
    const toggleButtons = document.querySelectorAll('.sidebar-toggle');
    
    toggleButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const parentLi = this.closest('li');
        const submenu = parentLi.querySelector('.sidebar-submenu');
        if (submenu) {
          submenu.classList.toggle('active');
          this.classList.toggle('active');
        }
      });
    });

    // Click en HISTORIAS y Laboratorio solo despliegua
    const mainLinks = document.querySelectorAll('.sidebar-main-link');
    mainLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const parentLi = this.closest('li');
        const submenu = parentLi.querySelector('.sidebar-submenu');
        const btn = parentLi.querySelector('.sidebar-toggle');
        
        if (submenu) {
          submenu.classList.toggle('active');
          if (btn) btn.classList.toggle('active');
        }
      });
    });

    // Cerrar menú al hacer clic en un enlace de submenu
    const submenuLinks = document.querySelectorAll('.sidebar-submenu a');
    submenuLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768 && sidebar) {
          sidebar.classList.remove('active');
          if (menuToggle) menuToggle.classList.remove('active');
          if (menuOverlay) menuOverlay.classList.remove('active');
        }
      });
    });

  // Marcar enlace activo
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.sidebar-menu a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (currentPath.endsWith(href) || currentPath.includes(href))) {
      link.classList.add('active');
      
      // Expandir submenu si es necesario
      const submenu = link.closest('.sidebar-submenu');
      if (submenu) {
        submenu.classList.add('active');
      }
    }
  });

  // Lazy loading de imágenes
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

  // Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}
});
