import express from "express";
import viewsRouter from "./routes/views.router.js";
import sessionsRouter from "./routes/session.router.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { __dirname } from "./utils.js";
import { initializePassport } from "./config/passport.config.js";
import passport from "passport";

const app = express();

try {
  await mongoose.connect(
    "mongodb+srv://joaquinagv99:Joaquin99@cluster5575jg.grqsebz.mongodb.net/ecommerce?retryWrites=true&w=majority"
  );
  console.log("DB connected");
} catch (error) {
  console.log(error.message);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(
  session({
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      ttl: 3600,
    }),
    secret: "Coder5575Secret",
    resave: true, //nos sirve para poder refrescar o actualizar la sesión luego de un de inactivadad
    saveUninitialized: true, //nos sirve para desactivar el almacenamiento de la session si el usuario aún no se ha identificado o aún no a iniciado sesión
    // cookie: {
    //     maxAge: 30000
    // }
  })
);

//Passport config
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/", viewsRouter);

app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use("/api/sessions", sessionsRouter);

app.listen(8080, () => console.log("Server running"));
