# Formulário de Inscrição

Este é um projeto de uma aplicação Node.js que permite aos usuários enviar inscrições através de um formulário. A aplicação verifica se as informações são válidas e armazena as inscrições no banco de dados MySQL. Além disso, a aplicação possui uma API REST que permite aos usuários pesquisar as inscrições dentro de um determinado período de tempo.

## Como executar o projeto

Para executar o projeto localmente, é necessário ter o Node.js e o MySQL instalados na máquina. Depois de clonar o repositório, siga os passos abaixo:

1. Instale as dependências:
```
npm install
```

2. Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:
```
DB_HOST=localhost 
DB_USER=root 
DB_PASSWORD=sua-senha 
DB_DATABASE=minhadatabase
```

3. Crie a tabela no banco de dados:
```
npm run migrate
```

4. Inicie a aplicação:
```
npm start
```

5. Acesse `http://localhost:3000` no navegador para acessar a página do formulário.

## Como usar a API REST

A aplicação possui uma API REST que permite aos usuários pesquisar as inscrições dentro de um determinado período de tempo. A rota `/inscricoes` aceita solicitações GET com os parâmetros `data_inicial` e `data_final` no formato `YYYY-MM-DD`. 
Exemplo de solicitação:
```
GET /inscricoes?data_inicial=2022-01-01&data_final=2022-12-31
```

A resposta é uma lista de objetos JSON contendo informações sobre as inscrições realizadas dentro do período especificado. Cada objeto contém os seguintes campos:

- `id` (opcional): o ID da inscrição no banco de dados
- `name`: o nome do usuário que realizou a inscrição
- `email`: o endereço de e-mail do usuário que realizou a inscrição
- `cpf`: o número de CPF do usuário que realizou a inscrição
- `phone`: o número de telefone do usuário que realizou a inscrição
- `created_at`: a data e hora em que a inscrição foi realizada

Exemplo de resposta:

```json
[
  {
    "id": 1,
    "name": "João da Silva",
    "email": "joao.silva@example.com",
    "cpf": 12345678900,
    "phone": 11987654321,
    "created_at": "2022-03-28T14:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Maria Souza",
    "email": "maria.souza@example.com",
    "cpf": 98765432100,
    "phone": 11987654321,
    "created_at": "2022-03-28T14:30:00.000Z"
  }
]
```
## Tecnologias utilizadas

- Node.js
- Express.js
- MySQL
- body-parser
- express-validator


## Contribuindo
Este é um projeto de código aberto e contribuições são bem-vindas! Se você gostaria de contribuir, por favor faça um fork do repositório e envie um pull request com suas alterações.

## Licença
Este projeto está disponível sob a licença MIT. Consulte o arquivo LICENSE para obter mais informações.
