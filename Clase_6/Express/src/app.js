import express from "express";

// creando el servido http
const app = express();

// users
const users = [
  { id: 1, nombre: "Alex", apellido: "Pinaida", edad: 28, genero: "M" },
  { id: 2, nombre: "Alejandro", apellido: "Resk", edad: 25, genero: "M" },
  { id: 3, nombre: "Nora", apellido: "Saucedo", edad: 22, genero: "F" },
];

// Vamos a construir nuestro primer endopoint o servicio
// Vamos a hacer la peticion http de tipo GET
app.get("/saludo", (req, res) => {
  res.send("Hola, este es mi primer endopoint desde express");
});

app.get("/bienvenido", (req, res) => {
  res.send(`<h1 style="color:blue"> Bienvenidos al curso de Express.js </h1>`);
});

//Servicio usando path param
app.get("/unparametro/:nombre", (req, res) => {
  res.send(`<h1>Bienvenido ${req.params.nombre} </h1>`);
});

app.get("/  /:nombre/:apellido", (req, res) => {
  res.send(`<h1>Bienvenido ${req.params.nombre} ${req.params.apellido} </h1>`);
});

// Debemos construir un servicio que me permita obtener un usuario por su id
// el identificador del usuario que vamos a buscar los obtenemos mediante un path param
// todo lo que enviemos como path param siempre es una cadena de texto
app.get("/user/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find((u) => {
    u.id === userId;
  });
  if (!user) return res.send({ error: "Usuario no encontrado" });
  res.send(user);
});

app.get("/uquery", (req, res) => {
  const queryparams = req.query;
  res.send(queryparams);
});

app.get("/ubusqueda", (req, res) => {
  //obtenemos el genero del query param
  const genero = req.query.genero;
  // siempre hacer validaciones
  if (!genero || (genero !== "M" && genero !== "F")) return res.send(users);
  const filterUsers = users.filter((user) => user.genero === genero);
  return res.send({ usuarios: filterUsers });
});

app.listen(8080, () => {
  console.log("Listening in port 8080");
});
