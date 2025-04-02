const express = require("express");
const cors = require("cors");
const faqs = require("./faq");

const app = express();
app.use(cors());

app.get("/api/faq/buscar", (req, res) => {
  const query = req.query.q.toLowerCase();
  const resultados = []; 
  
  faqs.forEach(categoria => {
    categoria.preguntas.forEach(pregunta => {
      if (
        pregunta.pregunta.toLowerCase().includes(query) ||
        pregunta.respuesta.toLowerCase().includes(query)
      ) {
        resultados.push(pregunta);
      }
    });
  });

  res.json(resultados);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
