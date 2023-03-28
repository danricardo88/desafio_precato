const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const connection = require('./connection');

const app = express();
const port = 3000;

// Configura o middleware para o body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Endpoint para receber as inscrições
app.post('/inscricao', async (req, res) => {
  const { name, email, cpf, phone } = req.body;

  // Verificando se o e-mail é válido
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).send('E-mail inválido!');
  }

  // Inseri uma inscrição no banco de dados
  const createdAt = new Date();
  const formAnswer = { name, email, cpf, phone, created_at: createdAt };
  await connection.execute(`INSERT INTO forms_answers (name, email, cpf, phone) 
    VALUE ('${formAnswer.name}', '${formAnswer.email}', '${formAnswer.cpf}', '${formAnswer.phone}')`)

  return res.status(204).send('ok')

});

// Endpoint que busca as inscrições em um dado tempo 
app.get('/inscricoes', async (req, res) => {
  const { data_inicial, data_final } = req.query;

  // Busca inscrições dentro do período de tempo especificado
  await connection.execute('SELECT * FROM forms_answers WHERE created_at BETWEEN ? AND ?', [data_inicial, data_final], (err, results) => {
    if (err) {
      console.log('Erro ao buscar no banco de dados:', err);
      return res.status(500).send('Erro ao buscar inscrições!');
    }

    return res.json(results);
  });
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
