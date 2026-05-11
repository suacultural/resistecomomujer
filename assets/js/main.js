document.addEventListener('DOMContentLoaded', function() {
  // Menú hamburguesa
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sidebarMenu = document.querySelector('.sidebar-menu');
  
  if (hamburgerBtn && sidebarMenu) {
    hamburgerBtn.addEventListener('click', function(e) {
      e.preventDefault();
      sidebarMenu.classList.toggle('active');
      this.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    const menuLinks = sidebarMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        // No cerrar si es un toggle
        if (!this.classList.contains('sidebar-toggle')) {
          sidebarMenu.classList.remove('active');
          hamburgerBtn.classList.remove('active');
        }
      });
    });

    // Cerrar menú al clickear fuera
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.sidebar') && sidebarMenu.classList.contains('active')) {
        sidebarMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
      }
    });
  }

  // Toggle menú submenu
  const toggleButtons = document.querySelectorAll('.sidebar-toggle');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const parent = this.closest('li');
      const submenu = parent.querySelector('.sidebar-submenu');
      
      if (submenu) {
        submenu.classList.toggle('active');
        this.classList.toggle('active');
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
        const toggle = submenu.previousElementSibling;
        if (toggle && toggle.classList.contains('sidebar-toggle')) {
          toggle.classList.add('active');
        }
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
});
