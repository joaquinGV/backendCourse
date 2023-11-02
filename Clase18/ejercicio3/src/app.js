import express from "express";
import session from "express-session";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "Coder5575secret",
    resave: true, // nos sirve para refrescar o actualizar la sesion o refrescar la session luego de inactividad
    saveUninitialized: true, // sirve para desactivar el almacenamiento de la session si el usuario aun no se a identificado o iniciado session.
    // cookie: {
    //   maxAge: 30000,
    // },
  })
);

function auth(req, res, next){
    if(req.session?.user === "Joaquin" && req.session?.admin){
        return next();
    }
    return res.status(401).send("Error de inicio de session")
}

app.get("/session", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`Se ha visitado el sitio ${req.session.counter}`);
  } else {
    req.session.counter = 1;
    res.send("Bienvenido ");
  }
});

app.get("/private" , (req,res) => {

})

app.get("/login", (req, res) => {
    const {username, password} = req.query;

    if(username !== "Joaquin" || password !== "joapass"){
        return res.status(201)
    }
    req.session.user = username;
    req.session.password = password;
    res.send("Login Exitoso")
});

app.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (!error) res.send("Logout Exitoso");
    else res.send({ status: "Sucess", message: error.message });
  });
});

app.listen(8080, () => {
  console.log("Server Running");
});
