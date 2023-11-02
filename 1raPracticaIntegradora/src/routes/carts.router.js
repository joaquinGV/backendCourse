import { Router } from "express";
import Carts from "../dao/dbManagers/carts.manager.js";

const router = Router();
const cartsManager = new Carts();

router.get("/", async (req, res) => {
  try {
    const carts = cartsManager.getAll();
    res.send({ status: "success", payload: carts });
  } catch (error) {
    res.status(500).send({ status: "errror", message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { id, products } = req.body;
    if (!id || !products) {
      return res
        .status(400)
        .send({ status: "error", message: "incomplete data" });
    }

    const result = await cartsManager.save({
      id,
      products,
    });

    res.status(201).send({ status: "success", payload: result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

router.put("/:cid", async (req, res) => {
  try {
    const { id, products } = req.body;
    const { cid } = req.params;
    if (!id || !products) {
      return res
        .status(400)
        .send({ status: "error", message: "incomplete data" });
    }

    const result = await cartsManager.update(cid, {
      id,
      products,
    });

    res.send({ status: "success", payload: result });
  } catch (error) {
    res.status(500).send({ status: "errror", message: error.message });
  }
});

export default router;
