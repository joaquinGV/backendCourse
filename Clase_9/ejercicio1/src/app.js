import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
const app = express();

//Configurar nuestro motor de plantillas handlebars
//motor de plantillas a utilizar
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  const testUser = {
    name: "Luciano",
  };

  res.render("index", testUser);
});

app.listen(8080, () => {
  console.log("server running");
});
