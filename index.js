const express = require('express');
const app = express();
const db = require("mongoose");
const port = 3000;
require('dotenv').config()

app.use(express.json());

connectDB = async () => {
    try {
      await db.connect(process.env.MONGOURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Ligação MongoDB estabelecida.');
      console.log('Database atual:', db.connection.db.databaseName); // This line logs the current database name
    } catch (error) {
      console.error('Ligação MongoDB não estabelecida:', error);
      process.exit(1);
    }
  };

  connectDB();

  // const testes = require('./Controllers/restaurants')
  // testes(app);
  const restaurante = require('./Routes/restaurants')
  app.use('/testes', restaurante); // Usar o roteador

  app.listen(port, function(){
    console.log(`Servidor arrancado!`)
});