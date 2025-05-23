const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Conexão com o PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Teste de API
app.get('/', (req, res) => {
  res.send('API de Biblioteca com PostgreSQL e Express!');
});

// Teste de conexão com o banco
app.get('/ping', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.send('Banco conectado com sucesso!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao conectar com o banco');
  }
});

// Listar categorias
app.get('/categorias', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categoria');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar categorias');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
