const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos de la carpeta assets que está un nivel arriba
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});

// Endpoint para obtener todas las placas solares
app.get('/api/accesorios', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM accesorios.accesorios ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener accesoriosww', detalle: err.message });
    }
});

app.listen(3003, () => console.log('Servidor escuchando en http://localhost:3003'));
