const mysql = require('mysql2/promise')

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  user: 'root',
  password: '123456',
  database: 'database_development',
});

module.exports = connection;
