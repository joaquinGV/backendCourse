import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import realtimeproductsRouter from "./routes/realTimeProducts.router.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Servidor archivos estáticos
app.use(express.static(`${__dirname}/public`));

//Motor de plantillas
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

//Routes
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use("/", viewsRouter);
app.use("/realtimeproducts", realtimeproductsRouter);

const server = app.listen(8080, () => console.log("Server running"));

//Socket io
const socketServer = new Server(server);

const logs = [];

socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");
});

socketServer.on("connection2", (socket) => {
  console.log("Nuevo cliente conectado en realtime");
});
