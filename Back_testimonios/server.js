const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión con PostgreSQL
const pool = new Pool({
    user: 'postgres',           // Tu usuario de PostgreSQL
    host: 'localhost',
    database: 'postgres',     // Nombre exacto de tu base de datos
    password: 'postgres', // Tu contraseña
    port: 5432,                  // Puerto configurado en PostgreSQL
});

// Obtener testimonios
app.get('/api/testimonios', async (req, res) => {
    console.log('GET /api/testimonios llamado');
    try {
    const result = await pool.query('SELECT * FROM testimonios.testimonios ORDER BY fecha DESC');
        console.log('Testimonios obtenidos:', result.rows.length); // Muestra cuántos registros hay
        res.json(result.rows);
    } catch (err) {
        console.error('Error al obtener testimonios:', err); // Muestra el error real en consola
        res.status(500).json({ error: 'Error al obtener testimonios', detalle: err.message });
    }
});

// Agregar nuevo testimonio
app.post('/api/testimonios', async (req, res) => {
    console.log('POST /api/testimonios llamado. Body recibido:', req.body);
    const { nombre, comentario } = req.body;
    if (!nombre || !comentario) {
        console.warn('Faltan campos en el body:', req.body);
        return res.status(400).json({ error: 'Faltan campos nombre o comentario' });
    }
    try {
        const result = await pool.query(
            'INSERT INTO testimonios.testimonios (nombre, comentario) VALUES ($1, $2) RETURNING *',
            [nombre, comentario]
        );
        console.log('Testimonio guardado:', result.rows[0]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error al guardar testimonio:', err); // Muestra el error real en consola
        res.status(500).json({ error: 'Error al guardar el testimonio', detalle: err.message });
    }
});

app.listen(3000, () => console.log('Servidor escuchando en http://localhost:3000'));