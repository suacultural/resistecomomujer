document.addEventListener('DOMContentLoaded', function() {
  // Toggle menú submenu
  const toggleButtons = document.querySelectorAll('.sidebar-toggle');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const submenu = this.nextElementSibling;
      if (submenu && submenu.classList.contains('sidebar-submenu')) {
        submenu.classList.toggle('active');
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
});
