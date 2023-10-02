import { Router } from "express";
import { uploader } from "../utils.js";
import productManager from "../manager/product.manager.js";
import { __dirname } from "../utils.js";

const router = Router();

const manager = new productManager("../files/productos.json");

//Obtener el listado de mascotas
router.get("/", async (req, res) => {
  const limit = req.query.limit;
  const products = await manager.getProducts();

  if (limit == undefined) {
    res.send({ status: "success", payload: products }); // send all products
  } else {
    const limitedProducts = products.slice(0, limit);
    res.send({
      status: "success",
      payload: limitedProducts ? limitedProducts : [],
    });
  }
});

router.get("/:pid", async (req, res) => {
  const id = +req.params.pid;
  const product = await manager.getProductById(pid);

  if (product != null) {
    res.send({ status: "success", payload: product });
  } else {
    res.send({ status: "error", message: "Error: No se encontro el producto" });
  }
});

router.post("/", async (req, res) => {
  const product = req.body; //Obteniendo el objeto que vamos a insertar

  const {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    status,
    category,
  } = product;

  if (
    !title ||
    !description ||
    !price ||
    !status ||
    !code ||
    !stock ||
    !category
  ) {
    return res
      .status(400)
      .send({ status: "error", message: "incomplete product data" });
  } else {
    await manager.addProduct(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category
    );
    res.status(201).send({ status: "success", message: "product created" });
  }
});

router.put("/:pid", async (req, res) => {
  const productBody = req.body;
  const pid = Number(req.params.pid);

  const msg = await manager.updateProduct(pid, productBody);

  if (msg) {
    res.send({ status: "success", message: "product updated" });
  } else {
    res.status(404).send({ status: "error", error: "user not found" });
  }
});

export default router;
