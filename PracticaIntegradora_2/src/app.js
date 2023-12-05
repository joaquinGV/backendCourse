import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import { __dirname } from "./utils.js";
import initializePassport from "./config/passport.js";
import passport from "passport";
import ViewsRouter from "./routes/views.router.js";
import UsersRouter from "./routes/users.router.js";
import ProductsRouter from "./routes/products.router.js";
import CartsRouter from "./routes/carts.router.js";

const app = express();

const viewsRouter = new ViewsRouter();
const usersRouter = new UsersRouter();
const productsRouter = new ProductsRouter();
const cartsRouter = new CartsRouter();

initializePassport();
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

try {
  await mongoose.connect(
    "mongodb+srv://joaquinagv99:Joaquin99@cluster5575jg.grqsebz.mongodb.net/ecommerce?retryWrites=true&w=majority"
  );
  console.log("DB connected");
} catch (error) {
  console.log(error.message);
}

try {
  app.use("/", viewsRouter.getRouter());
  app.use("/api/carts", cartsRouter.getRouter() );
  app.use("/api/products", productsRouter.getRouter());
  app.use("/api/users", usersRouter.getRouter());
  
} catch (error) {
  console.log(error.message)
}

app.listen(8080, () => console.log("Server running"));
