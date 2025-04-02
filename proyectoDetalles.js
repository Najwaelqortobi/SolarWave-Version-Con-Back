document.addEventListener('DOMContentLoaded', async function() {
  const urlParams = new URLSearchParams(window.location.search);// Crea un objeto para manejar los parámetros de la URL actual me refiero a la url en la que quiero que pinchas para que se ve el detalle del proyecto
  const proyectoId = urlParams.get('id');//Obtiene el valor del parámetro 'id' de la URL. que esta en el index en el a despues ?
  const selectedLanguage = urlParams.get('lang') || localStorage.getItem('selectedLanguage') || 'es';

  const translations = await loadTranslations();

  if (proyectoId) {
      try {
          const response = await fetch('proyectos.json');
          const data = await response.json();
          const proyecto = data[proyectoId];

          if (proyecto) {
              const detallesContainer = document.getElementById('proyecto-detalles');
              
              detallesContainer.innerHTML = `
                  <div class="container-fluid py-4">
                      <div class="row g-0 bg-light position-relative rounded overflow-hidden shadow-lg">
                          <div class="col-lg-8 mb-lg-0 p-0">
                              <div style="height: 560px; overflow: hidden;">
                                  <img src="${proyecto.imagen}" class="w-100 h-100 object-fit-cover" alt="${translations[selectedLanguage].proyectos[proyectoId].nombre}" style="object-position: center;">
                              </div>
                          </div>
                          <div class="col-lg-4 p-4 card-parte-derecha">
                              <h2 class="mt-0 fw-bold" style="font-family: 'Lato', sans-serif; color: black; font-size: 1.8rem; text-align: center">
                                  ${translations[selectedLanguage].proyectos[proyectoId].nombre}
                              </h2>
                              <p class="descripcion" style="font-style: normal ;">
                                  ${translations[selectedLanguage].proyectos[proyectoId].descripcion}
                              </p>                
                              <div class="mb-4">
                                  <span class="badge bg-primary p-2 fs-6">
                                      <i class="fas fa-bolt me-2"></i>${translations[selectedLanguage].proyectos[proyectoId].potencia}
                                  </span>
                              </div>
                            <ul class="list-group list-group-flush mb-4">
                                  <li class="caracteristicas-proyecto"><i class="fas fa-check text-success me-2"></i>${translations[selectedLanguage].proyectos[proyectoId].detalles}</li>
                              </ul>
                          </div>
                      </div>
                  </div>
              `;
          } else {
              console.error('Proyecto no encontrado');
          }
      } catch (error) {
          console.error('Error:', error);
      }
  }
});

//lo que se carga aqui es directamente la trad en funcion del idioma seleccionada con el attributo que figura en el translations.json

  /*     <div style="height: 560px; overflow: hidden;"> este div que escoge la imagen de la 
  que se muestra en detalle producto para controlar el tamaño de la imagen y para que sea lo mismo en los 3 proyectos*/