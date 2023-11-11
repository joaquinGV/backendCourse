import express from "express";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import __dirname from "./utils.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewsRouter);

app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);

try {
  await mongoose.connect(
    "mongodb+srv://joaquinagv99:Joaquin99@cluster5575jg.grqsebz.mongodb.net/ecommerce?retryWrites=true&w=majority"
  );
  console.log("DB connected");

} catch (error) {
  console.log(error.message);
}

app.listen(8080, () => console.log("Server running"));
