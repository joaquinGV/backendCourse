import express from "express";
import productsRouter from "./routes/products.router.js";
import messagesRouter from "./routes/messages.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import __dirname from "./utils.js";
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Servidor archivos estáticos
app.use(express.static(`${__dirname}/public`));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/messages", messagesRouter);

try {
  await mongoose.connect(
    "mongodb+srv://joaquinagv99:Joaquin99@cluster5575jg.grqsebz.mongodb.net/ecommerce?retryWrites=true&w=majority"
  );
  console.log("DB connected");
} catch (error) {
  console.log(error.message);
}

const server = app.listen(8080, () => console.log("Server running"));

// Socket io
const socketServer = new Server(server);

socketServer.on("connection", (socket) => {
  socket.on("addMessage", (data) => {
    console.log("Mensaje añadido", data);
  });
});
