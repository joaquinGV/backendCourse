import {
  getAll as getAllCarts,
  getOne as getOneCart,
  save as saveCart,
  putProducts as updateCartProducts,
  putQuantity as updateOneProduct,
  deleteCart as clearCart,
  deleteProduct as deleteCartProduct,
} from "../service/carts.service.js";

import Products from "../dao/dbManagers/products.manager.js";

const productsManager = new Products();

const getAll = async (req, res) => {
  try {
    const cart = getAllCarts();
    res.sendSuccess(cart);
  } catch (error) {
    res.sendServerError(error.message);
  }
};
const getOne = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = getOneCart(cid);
    res.sendSuccess(cart);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

const save = async (req, res) => {
  try {
    const result = saveCart();
    res.sendSucessNewResource(result);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

// Update the cart with products
const putProducts = async (req, res) => {
  try {
    const products = req.body;
    const { cid } = req.params;
    if (!products) {
      res.sendClientError("No products received");
    }
    const result = updateCartProducts(cid, products);
    res.sendSucessNewResource(result);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

// Update one cart product quantity
const putQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = getOneCart(cid);
    const product = await productsManager.getOne(pid);

    if (!quantity || !cart || !product) {
      res.sendClientError("Cart or product not found");
    }
    const result = updateOneProduct(cid, pid, quantity);
    res.sendSuccess(result);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

// Delete an specific product of a cart
const deleteProduct = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = getOneCart(cid);
    const product = await productsManager.getOne(pid);
    if (!cart || !product) {
      res.sendClientError("Cart or Product not found");
    }
    const result = deleteCartProduct(cid, pid);
    res.sendSuccess(result);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

//Delete all products of the cart
const deleteCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const result = clearCart(cid);
    res.sendSuccess(result);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export {
  getAll,
  getOne,
  save,
  putProducts,
  putQuantity,
  deleteProduct,
  deleteCart,
};
