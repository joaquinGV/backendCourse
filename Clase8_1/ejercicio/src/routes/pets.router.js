import { Router } from "express";
import { uploader } from "../utils";

const router = Router();
const pets = [];

//Obtener listado de mascotas
router.get("/", (req, res) => {
  res.send({ status: "success", payload: pets });
});
 
router.post("/2", uploader.single('thumbnail'), (req, res) => {
    //validamos que obligatoriamente el usuario deberia enviar un archivo
  const pet = req.body; // obteniendo el objeto a retornar
  if (!pet.name ) {
    return res.status(400).send({ status: "error", error: "Incomplete values" });
  }
  pet.thumbnail = `http:localhost:8080/img/pets/${filename}`
  pets.push(pet);
  res.send({ status: "success", payload: pet });
});

export default router;