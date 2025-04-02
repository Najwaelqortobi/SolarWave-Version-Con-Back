document.addEventListener('DOMContentLoaded', function() {
    fetch('proyectos.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('proyectos-container');
            for (const [id, proyecto] of Object.entries(data)) {
                const proyectoHTML = `
                    <div class="col-sm-4 mb-4">
                        <div class="card d-flex flex-column h-100 color-card">
                            <img src="${proyecto.imagen}" alt="${proyecto.nombre}">
                            <div class="card-body d-flex flex-column flex-grow-1">
                                <h5>${proyecto.nombre}</h5>
                                <p class="descripcion">${proyecto.descripcion}</p>
                                <div class="d-flex justify-content-between align-items-center mt-auto">
                                    <p class="potencia">Potencia: ${proyecto.potencia}</p>
                                    <a href="proyectoDetalles.html?id=${id}" class="verDetalles-productos">Ver detalles</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += proyectoHTML;
            }
        })
        .catch(error => console.error('Error cargando los proyectos:', error));
});
