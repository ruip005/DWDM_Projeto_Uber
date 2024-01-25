const express = require("express");
const app = express();
const db = require("mongoose");
const port = 9000;
require("dotenv").config();
const { authenticate, logging, antiVPN } = require("./Utils/middleware");
const { color } = require("console-log-colors");

app.use(require("cors")());
app.use(express.json());
app.use(require("body-parser").json());

connectDB = async () => {
  // Função para ligar à base de dados
  try {
    await db.connect(process.env.MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(color("Ligação MongoDB estabelecida.", "green"));
    console.log(
      color("Database atual:" + db.connection.db.databaseName, "green")
    );
  } catch (error) {
    console.error(color("Ligação MongoDB não estabelecida:", "red"), error);
    process.exit(1);
  }
};

// Iniciar a ligação à base de dados
connectDB();
require("./Utils/checkBD");

app.use(logging);
app.use(antiVPN);
//app.use(authenticate); -- TO DO descomentar quando a autenticação estiver pronta
console.log(color("Middlewares carregados!", "green"));

// Roteadores
app.use(process.env.USER_ROUTE, require("./Routes/users"));
app.use(process.env.ADMIN_ROUTE, require("./Routes/admin"));
app.use(process.env.RESTAURANT_ROUTE, require("./Routes/restaurant"));
app.use(process.env.APP_ROUTE, require("./Routes/app"));

app.listen(port, function () {
  console.log(color(`Servidor arrancado na porta ${port}!`, "green"));
});

setTimeout(() => {
  console.log("\n");
  console.log(color(`VAMOS AMIGO`, "green"));
  setTimeout(() => {
    console.log(color(`VAMOS AMIGO, FORÇA!`, "yellow"));
    setTimeout(() => {
      console.log(color(`CONTINUA SIM AMIGO!`, "orange"));
    }, 1000);
    setTimeout(() => {
      console.log(color(`OO MEU AMIGOOO`, "red"));
    }, 2000);
  }, 4000);
}, 4000);
