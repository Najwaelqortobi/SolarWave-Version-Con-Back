async function cargarProyectos() {
    try {
        const response = await fetch('proyectosRealizados.json');
        if (!response.ok) {
            throw new Error('No se pudo cargar proyectosRealizados.json');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al cargar proyectos:', error);
        return {};
    }
}

async function cargarTraducciones() {
    try {
        const response = await fetch('translations.json');
        if (!response.ok) {
            throw new Error('No se pudo cargar translations.json');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al cargar traducciones:', error);
        return {};
    }
}

function mostrarProyectos(proyectos, traducciones, selectedLanguage) {
    const contenedor = document.querySelector('.proyectos-realizados');
    contenedor.innerHTML = '';

    for (const key in proyectos) {
        const proyecto = proyectos[key];
        const proyectoTraducido = traducciones[selectedLanguage].proyectos[key] || proyecto;
        const elemento = document.createElement('div');
        elemento.className = 'col-md-6 col-lg-4';
        elemento.innerHTML = `
            <div class="contenedor-proyectos">
                <img src="${proyecto.imagen}" alt="${proyectoTraducido.nombre}">
                <h2 class="titulo-proyecto">${proyectoTraducido.nombre}</h2>
                <button class="verDetalles-productos btn-detalles" data-bs-toggle="modal" data-bs-target="#proyectoModal" data-proyecto='${JSON.stringify(proyecto)}' data-key="${key}">
                    ${traducciones[selectedLanguage].verDetalles}
                </button>
            </div>
        `;
        contenedor.appendChild(elemento);
    }

    document.querySelectorAll('.btn-detalles').forEach(btn => {
        btn.addEventListener('click', (event) => mostrarDetallesProyecto(event, traducciones, selectedLanguage));
    });
}

function mostrarDetallesProyecto(event, traducciones, selectedLanguage) {
    const proyecto = JSON.parse(event.target.getAttribute('data-proyecto'));
    const key = event.target.getAttribute('data-key');
    const modal = document.getElementById('proyectoModal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');

    const proyectoTraducido = traducciones[selectedLanguage].proyectos[key] || proyecto;

    modalTitle.textContent = proyectoTraducido.nombre;
    modalTitle.className = 'modal-title'; //para añadir una classe al titulo del proyecto
    modalBody.innerHTML = `
        <div class="img-detalles-proyecto">
            <img src="${proyecto.imagen}" alt="${proyectoTraducido.nombre}">
        </div>
        <div class="detalles-proyecto">
            <h4>
            <span class="badge bg-primary p-2 fs-6">
    <i class="fas fa-bolt me-2"></i>${proyecto.potencia}</span></h4>
            <p>${proyectoTraducido.descripcion}</p>
            <h5>${traducciones[selectedLanguage].projectCharacteristics}:</h5>
            <p class="caracteristicas-proyecto-realizado">${proyectoTraducido.detalles}</p>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', async function() {
    const proyectos = await cargarProyectos();
    const traducciones = await cargarTraducciones();
    const languageSelector = document.querySelector('.language-selector select');
    
    function updateContent() {
        const selectedLanguage = languageSelector.value;
        localStorage.setItem('selectedLanguage', selectedLanguage);
        mostrarProyectos(proyectos, traducciones, selectedLanguage);
        
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (traducciones[selectedLanguage][key]) {
                element.textContent = traducciones[selectedLanguage][key];
            }
        });
    }

    languageSelector.addEventListener('change', updateContent);

    languageSelector.value = localStorage.getItem('selectedLanguage') || 'es';
    updateContent();
});
