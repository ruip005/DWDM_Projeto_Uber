const express = require('express');
const app = express();
const db = require("mongoose");
const port = 3000;
require('dotenv').config()
const { authenticate, middlewareLogging, antiVPN } = require('./middleware');

app.use(express.json());

connectDB = async () => { // Função para ligar à base de dados
    try {
      await db.connect(process.env.MONGOURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Ligação MongoDB estabelecida.');
      console.log('Database atual:', db.connection.db.databaseName);
    } catch (error) {
      console.error('Ligação MongoDB não estabelecida:', error);
      process.exit(1);
    }
  };

  // Iniciar a ligação à base de dados
  connectDB();

  app.use(middlewareLogging);
  app.use(antiVPN);
  app.use(authenticate);
  console.log('Middlewares carregados!');

  // Rota para testar o servidor
  const restaurante = require('./Routes/restaurants');
  app.use('/testes', restaurante); // Usar o roteador

  app.listen(port, function(){
    console.log(`Servidor arrancado!`)
});