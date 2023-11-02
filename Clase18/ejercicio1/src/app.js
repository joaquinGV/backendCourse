import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setear nuestro middleware de cookie parser a nivel de app
app.use(cookieParser("Coder5575secret"));

// Setear una cookie
app.get("/cookies", (req, res) => {
  res
    .cookie("coderCookie", "Esta es una cookie muy poderosa xd", {
      maxAge: 30000,
    })
    .send("Cookie configurada correctamente");
});

app.get("/all-cookies", (req, res) => {
  res.send(req.cookies);
});

app.get("/delete-cookies", (req, res) => {
  res.clearCookie("coderCookie").send(console.log("Cookie Borrada"));
});

app.get("/set-signed-cookie", (req, res) => {
  res
    .cookie("CoderSignedCookie", "Esta es un cookie firmada", {
      maxAge: 30000,
      signed: true,
    })
    .send(console.log("Cookie firmada correctamente"));
});

app.get("/all-signed-cookies", (req, res) => {
  res.send(req.signedCookies);
});
app.listen(8080, () => {
  console.log("Server running");
});
