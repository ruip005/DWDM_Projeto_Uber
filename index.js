const express = require('express');
const app = express();
const db = require("mongoose");
const port = 3000;

const test = require('./routes/test')
app.use(express.json());

connectDB = async () => {
    try {
      await db.connect('mongodb+srv://ruirodrigues:lWZHRWASAcDi5Ocv@uber.krhvbku.mongodb.net/', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Ligação MongoDB estabelecida.');
    } catch (error) {
      console.error('Ligação MongoDB não estabelecida:', error);
      process.exit(1);
    }
  };

  connectDB();

  test(app);

  app.listen(port, function(){
    console.log(`Servidor arrancado!`)
});