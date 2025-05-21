const API_URL = "http://localhost:3003/api/accesorios";

async function cargarAccesorios() {
    const res = await fetch(API_URL);
    const accesorios = await res.json();
    const list = document.getElementById('accesoriosList');
    list.innerHTML = '';
    accesorios.forEach(accesorio => {
        list.innerHTML += `
    <div class="col-12 col-sm-6 col-md-4 col-lg-4 d-flex align-items-stretch">
        <div class="card solar-card mb-4 w-100 shadow-lg border-0">
            <div class="img-container">
                <img src="/assets/${accesorio.imagen_url}" class="card-img-top" alt="${accesorio.codigo_producto}">
            </div>
            <div class="card-body d-flex flex-column">
                <h5 class="card-title nombre-placa fw-bold">${accesorio.codigo_producto}</h5>
                <p class="txt-desc flex-grow-1">${accesorio.descripcion}</p>
                <ul class="list-unstyled small mb-2">
                    <li><strong>Compatibilidad:</strong> ${accesorio.compatibilidad}</li>
                    <li><strong>Material:</strong> ${accesorio.material}</li>
                    <li><strong>Fabricante:</strong> ${accesorio.fabricante}</li>
                    <li><strong>Dimensiones:</strong> ${accesorio.dimensiones}</li>
                    <li><strong>Peso:</strong> ${accesorio.peso}</li>
                    <li><strong>Stock:</strong> ${accesorio.stock}</li>
                </ul>
                <span class="badge tipo-badge mb-2">€${accesorio.precio}</span>
            </div>
        </div>
    </div>`;
    });
}

document.addEventListener('DOMContentLoaded', cargarAccesorios);
