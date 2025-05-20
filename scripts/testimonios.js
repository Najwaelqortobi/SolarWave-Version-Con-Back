const API_URL = "http://localhost:3000/api/testimonios"; //este puerto es donde se esta escuchando el servidor express para que se connecta front con backend

// Mostrar testimonios
async function cargarTestimonios() {
    try {
        const res = await fetch(API_URL);
        const testimonios = await res.json();
        const list = document.getElementById('testimonialsList');
        list.innerHTML = '';
        testimonios.forEach(t => {
            list.innerHTML += `
                <div class="testimonial-card">
                    <div class="d-flex justify-content-between">
                        <span class="author">${t.nombre}</span>
                        <span class="date">${new Date(t.fecha).toLocaleDateString()}</span>
                    </div>
                    <p class="mt-2 mb-1 colorin">${t.comentario}</p>
                </div>
            `;
        });
    } catch {
        document.getElementById('testimonialsList').innerHTML = "<div class='alert alert-danger'>No se pudieron cargar los testimonios.</div>";
    }
}
cargarTestimonios();

// Enviar nuevo testimonio
document.getElementById('testimonialForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const comentario = document.getElementById('comentario').value.trim();
    if(nombre && comentario) {
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, comentario })
            });
            if(res.ok) {
                cargarTestimonios();
                this.reset();
            } else {
                alert("Error al guardar el testimonio.");
            }
        } catch {
            alert("Error de conexión.");
        }
    }
});