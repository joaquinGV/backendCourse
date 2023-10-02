import express from "express";
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import { __dirname } from "./utils.js";

const app = express();

app.use(express.json);
app.use(express.urlencoded({ extended: true }));

//Agregar configuracion para archivos estaticos
console.log(__dirname);
//Prefijo virtual
// app.use(express.static(`${__dirname}/public`));
app.use("/static-files", express.static(`${__dirname}/public`));

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);

app.listen(8080, () => {
  console.log("Server running ");
});
