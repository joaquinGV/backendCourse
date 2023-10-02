import express from "express";
import productsRouter from "../src/routes/products.router.js";
// import cartsRouter from "./routes/carts.router.js";
// import { __dirname } from "./utils.js";

const app = express();

app.use(express.json);
// app.use(express.urlencoded({ extended: true }));

//Agregar configuracion para archivos estaticos
// console.log(__dirname);

app.use("/api/products", productsRouter);
// app.use("/api/carts", cartsRouter);

app.get("/test", (req, res) => {
  console.log("Test");
  res.send({ message: "test aprobado" });
});

app.listen(8080, () => {
  console.log("Listening in port 8080");
});
