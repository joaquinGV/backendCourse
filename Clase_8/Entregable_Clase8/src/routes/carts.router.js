import { Router } from "express";
import cartManager from "../manager/cart.manager.js";
import { __dirname } from "../utils.js";
import productManager from "../manager/product.manager.js";

const router = Router();
const productManage = new productManager("../files/productos.json");

const manager = new cartManager("../files/cart.json");

router.get("/:cid", async (req, res) => {
  const id = +req.params.cid;
  const cart = await manager.getCartById(id);

  if (cart != null) {
    res.send({ status: "success", payload: cart });
  } else {
    res.send({ status: "error", message: "Error: No se encontro el carto" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cid = +req.params.cid;
  const pid = +req.params.pid;

  const carts = await manager.getCarts();
  const cartById = carts.find((cart) => cart.id === cid);

  const indexProductInCart = cartById.findIndex(
    (product) => product.id === pid
  );

  if (indexProductInCart != -1) {
    cartById.products[indexProductInCart] = cartById.products[
      indexProductInCart
    ]++;
  } else {
    const product = await productManage.getProductById(pid);
    cartById.products.push({ ...product });
  }
  await cartManager.saveCart(carts);
  res.send({ status: "success", payload: cartById });
});

export default router;
