const API_URL = "http://localhost:3001/api/placas";

async function cargarPlacas() {
    const res = await fetch(API_URL);
    const placas = await res.json();
    const list = document.getElementById('placasList');
    list.innerHTML = '';
    placas.forEach(placa => {
        list.innerHTML += `
            <div class="card mb-4">
                <img src="${placa.imagen_url}" class="card-img-top" alt="${placa.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${placa.nombre}</h5>
                    <p class="card-text">${placa.descripcion}</p>
                    <span class="badge bg-info">${placa.tipo}</span>
                </div>
            </div>
        `;
    });
}
document.addEventListener('DOMContentLoaded', cargarPlacas);
