const API_URL = "http://localhost:8080/api/faq";

async function buscarPregunta() {
  const query = document.getElementById("search").value.toLowerCase();
  
  if (!query) {
    document.getElementById("faq-container").innerHTML = "<p>Por favor, ingresa una palabra clave.</p>";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/buscar?q=${query}`);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    
    const resultados = await response.json();
    const container = document.getElementById("faq-container");
    container.innerHTML = "";

    if (resultados.length === 0) {
      container.innerHTML = "<p>No se encontraron resultados.</p>";
      return;
    }

    resultados.forEach(pregunta => {
      const preguntaElemento = document.createElement("h3");
      preguntaElemento.textContent = pregunta.pregunta;

      const respuestaElemento = document.createElement("p");
      respuestaElemento.textContent = pregunta.respuesta;

      container.appendChild(preguntaElemento);
      container.appendChild(respuestaElemento);
    });
  } catch (error) {
    console.error("Error al buscar preguntas:", error);
    document.getElementById("faq-container").innerHTML = "<p>Error al buscar preguntas.</p>";
  }
}
