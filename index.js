const express = require('express');
const app = express();
const db = require("mongoose");
const port = 3000;
require('dotenv').config()
const { authenticate, logging, antiVPN } = require('./Utils/middleware');

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

  app.use(logging);
  app.use(antiVPN);
  //app.use(authenticate); -- TO DO descomentar quando a autenticação estiver pronta
  console.log('Middlewares carregados!');

  const userAPI = require('./Routes/users');
  const adminAPI = require('./Routes/admin');
  const restaurantAPI = require('./Routes/restaurant');
  app.use(process.env.USER_ROUTE, userAPI); // Usar o roteador
  app.use(process.env.ADMIN_ROUTE, adminAPI); // Usar o roteador
  app.use(proccess.env.RESTAURANT_ROUTE, restaurantAPI); // Usar o roteador

  app.listen(port, function(){
    console.log(`Servidor arrancado!`)
});