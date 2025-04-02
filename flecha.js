document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('scrollTopBtn');
  
    if (!btn) {
        console.error('Botón de scroll no encontrado');
        return;
    }
  
    function toggleButtonVisibility() {
        // Mostrar el botón después de 100px de scroll
        if (window.scrollY > 100) {
            btn.style.display = 'flex';
        } else {
            btn.style.display = 'none';
        }
    }
  
    window.addEventListener('scroll', toggleButtonVisibility);
  
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
  
    // Llamar a la función inicialmente para establecer el estado correcto
    toggleButtonVisibility();
  });