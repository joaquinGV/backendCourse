import { Router } from "express";
import Carts from "../dao/dbManagers/carts.manager.js";
import { productsModel } from "../dao/dbManagers/models/products.model.js";

const router = Router();

const cartsManager = new Carts();

router.get("/products", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } =
      await productsModel.paginate({}, { limit, page, lean: true });

    res
      .render("products", {
        products: docs,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage,
        page,
        totalPages,
      })
      .send({
        status: "success",
        payload: docs,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink: `/products-view?page=${prevPage}`,
        nextLink: `/products-view?page=${nextPage}`,
      });
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/carts/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const carts = await cartsManager.getOne(cid);
    const products = carts.products;
    console.dir(carts);
    res.render("carts", { carts });
  } catch (error) {
    console.error(error.message);
  }
});

export default router;
