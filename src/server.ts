import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mysql, { Connection } from 'mysql';

interface FormAnswer {
  id?: number;
  name: string;
  email: string;
  cpf: number;
  phone: number;
  created_at: Date;
}

const app = express();
const port = 3000;

// Configura o middleware para o body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configura o banco de dados
const connection: Connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'minhasenha',
  database: 'minhadatabase'
});

// Conecta ao banco
connection.connect((err) => {
  if (err) {
    console.log('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados com sucesso!');
  }
});

// Endpoint para receber as inscrições
app.post('/inscricao', (req: Request, res: Response) => {
  const { name, email, cpf, phone } = req.body;

  // Verificando se o e-mail é válido
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).send('E-mail inválido!');
  }

  // Verifica se já existe no banco esse email.
  connection.query('SELECT * FROM forms_answers WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.log('Erro ao buscar no banco de dados:', err);
      return res.status(500).send('Erro ao realizar inscrição!');
    }

    if (results.length > 0) {
      return res.status(400).send('Já existe uma inscrição com este e-mail!');
    }

    // Inseri uma inscrição no banco de dados
    const createdAt = new Date();
    const formAnswer: FormAnswer = { name, email, cpf, phone, created_at: createdAt };
    connection.query('INSERT INTO forms_answers SET ?', formAnswer, (err) => {
      if (err) {
        console.log('Erro ao inserir no banco de dados:', err);
        return res.status(500).send('Erro ao realizar inscrição!');
      }

      return res.status(201).send('Inscrição realizada com sucesso!');
    });
  });
});

// Endpoint que busca as inscrições em um dado tempo 
app.get('/inscricoes', (req: Request, res: Response) => {
  const { data_inicial, data_final } = req.query;

  // Busca inscrições dentro do período de tempo especificado
  connection.query('SELECT * FROM forms_answers WHERE created_at BETWEEN ? AND ?', [data_inicial, data_final], (err, results) => {
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
