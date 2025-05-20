const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});

// Endpoint para obtener todas las placas solares
app.get('/api/placas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM paneles.placa_solar ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener placas solares', detalle: err.message });
    }
});

app.listen(3001, () => console.log('Servidor escuchando en http://localhost:3001'));
