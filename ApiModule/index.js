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
  require('./Utils/checkBD')

  app.use(logging);
  app.use(antiVPN);
  //app.use(authenticate); -- TO DO descomentar quando a autenticação estiver pronta
  console.log('Middlewares carregados!');

  // Roteadores
  app.use(process.env.USER_ROUTE, require('./Routes/users'));
  app.use(process.env.ADMIN_ROUTE, require('./Routes/admin'));
  app.use(process.env.RESTAURANT_ROUTE, require('./Routes/restaurant')); 
  app.use(process.env.APP_ROUTE, require('./Routes/app')); 


  app.listen(port, function(){
    console.log(`Servidor arrancado!`)
});