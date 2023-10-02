import { Router } from "express";
import testManager from "../manager/test.manager.js";
import { __dirname } from "../utils.js";

const router = Router();

// const manager = new testManager("../files/productos.json");

//Obtener el listado de mascotas
router.get("/", async (req, res) => {
  const limit = req.query.limit;

  if (limit == undefined) {
    res.send({ status: "success", message: "Hola" }); // send all products
  } else {
    res.send({
      status: "success",
      payload: [],
    });
  }
});

export default router;
