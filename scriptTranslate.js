async function loadTranslations() {
    try {
        const response = await fetch('translations.json');
        if (!response.ok) {
            throw new Error('Error al cargar las traducciones');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return {};
    }
}

function saveSelectedLanguage(language) {
    localStorage.setItem('selectedLanguage', language);
}

async function loadAndDisplayProducts(translations, selectedLanguage) {
    try {
        const response = await fetch('proyectos.json');
        const proyectos = await response.json();
        const container = document.getElementById('proyectos-container');
        if (container) {
            container.innerHTML = '';
            Object.entries(proyectos).forEach(([id, proyecto]) => {
                const proyectoTraducido = translations[selectedLanguage].proyectos[id] || proyecto;
                container.innerHTML += `
                    <div class="col-sm-4 mb-4">
                        <div class="card d-flex flex-column h-100 color-card">
                            <img src="${proyecto.imagen}" alt="${proyectoTraducido.nombre}">
                            <div class="card-body d-flex flex-column flex-grow-1">
                                <h5>${proyectoTraducido.nombre}</h5>
                                <p class="descripcion">${proyectoTraducido.descripcion}</p>
                                <div class="d-flex justify-content-between align-items-center mt-auto">
                                    <p class="potencia">${translations[selectedLanguage].power}: ${proyecto.potencia}</p>
                                    <a href="proyectoDetalles.html?id=${id}&lang=${selectedLanguage}" class="verDetalles-productos">${translations[selectedLanguage].verDetalles}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
    } catch (error) {
        console.error('Error cargando los proyectos:', error);
    }
}

function updateContent(translations, selectedLanguage) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[selectedLanguage] && translations[selectedLanguage][key]) {
            const iconHTML = element.querySelector('i') ? element.querySelector('i').outerHTML : '';
            element.innerHTML = `${iconHTML} ${translations[selectedLanguage][key]}`;
        }
    });

    loadAndDisplayProducts(translations, selectedLanguage);
}

document.addEventListener('DOMContentLoaded', async function() {
    const translations = await loadTranslations();
    const languageSelector = document.querySelector('.language-selector select');
    
    languageSelector.addEventListener('change', function() {
        const selectedLanguage = this.value;
        saveSelectedLanguage(selectedLanguage);
        updateContent(translations, selectedLanguage);
    });

    const savedLanguage = localStorage.getItem('selectedLanguage') || 'es';
    languageSelector.value = savedLanguage;
    updateContent(translations, savedLanguage);
});
