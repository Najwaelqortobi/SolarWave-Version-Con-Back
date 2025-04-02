const API_URL = "http://localhost:8080/api/faq";

async function buscarPregunta() {
  const query = document.getElementById("search").value.toLowerCase();
  
  if (!query) {
    document.getElementById("faq-container").innerHTML = "<p>Por favor, ingresa una palabra clave.</p>";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/buscar?q=${query}`); 
    
    /*${API_URL}/buscar?q=${query}:

    Es el URL al que se envía la solicitud.
    
    Usa template literals (las comillas invertidas ``) para construir dinámicamente la URL.
    
    API_URL es una constante que contiene la base del URL del servidor (por ejemplo, http://localhost:8000/api).
    
    /buscar es el endpoint o ruta en el servidor donde se realiza la búsqueda.
    
    ?q=${query} es un parámetro de consulta (query parameter) que se pasa al servidor. Aquí:
    
    q es el nombre del parámetro.
    
    ${query} es el valor dinámico del parámetro, que probablemente contiene la palabra clave que deseas buscar.
    
    */
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    
    const resultados = await response.json();
    const container = document.getElementById("faq-container");
    container.innerHTML = "";

    if (resultados.length === 0) {
      container.innerHTML = "<p>No se encontraron resultados.</p>";
      return;
    }

    resultados.forEach(pregunta => {
      const preguntaElemento = document.createElement("h4");
      preguntaElemento.textContent = pregunta.pregunta; /*esta frase se refiere a faq.js {
        pregunta: "¿Qué son las placas solares?",
        respuesta: "Transforman luz solar en electricidad."
      }
      es decir el elemento pregunta que es ("¿Qué son las placas solares?") del onjeto pregunta*/

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
