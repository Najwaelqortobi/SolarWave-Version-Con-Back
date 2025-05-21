const API_URL = "http://localhost:3001/api/placas";

async function cargarPlacas() {
    const res = await fetch(API_URL);
    const placas = await res.json();
    const list = document.getElementById('placasList');
    list.innerHTML = '';
    placas.forEach(placa => {
        list.innerHTML += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-4 d-flex align-items-stretch">
                <div class="card solar-card mb-4 w-100 shadow-lg border-0">
                    <div class="img-container">
                        <img src="/assets/${placa.imagen_url}" class="card-img-top" alt="${placa.nombre}">
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title nombre-placa fw-bold">${placa.nombre}</h5>
                        <p class=" txt-desc flex-grow-1">${placa.descripcion}</p>
                        <span class="badge tipo-badge mb-2">${placa.tipo}</span>
                    </div>
                </div>
            </div>
        `;
    });
}

document.addEventListener('DOMContentLoaded', cargarPlacas);
