import { Router } from "express";
import Products from "../dao/dbManagers/products.manager.js";
import Carts from "../dao/dbManagers/carts.manager.js";

const router = Router();

const productsManager = new Products();
const cartsManager = new Carts();

router.get("/products-view", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.params;
    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } =
      await studentsModel.paginate({}, { limit, page, lean: true });
    // const products = await productsManager.getAll();
    res.render("products", {
      products: docs,
      hasPrevPage,
      hasNextPage,
      nextPage,
      prevPage,
    });
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/carts-view", async (req, res) => {
  try {
    const carts = await cartsManager.getAll();
    res.render("carts", { carts });
  } catch (error) {
    console.error(error.message);
  }
});

export default router;
