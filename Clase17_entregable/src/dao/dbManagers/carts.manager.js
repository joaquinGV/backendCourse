import { cartsModel } from "../dbManagers/models/carts.model.js";

export default class Carts {
  constructor() {
    console.log("Working carts with DB");
  }

  getAll = async () => {
    const carts = await cartsModel.find().populate("products.product");
    return carts;
  };

  getOne = async (id) => {
    const carts = await cartsModel.find({ _id: id });
    return carts;
  };

  save = async (productId) => {
    const result = await cartsModel.create(productId);
    return result;
  };

  updateProducts = async (id, products) => {
    const productsToAdd = products.map((key) => ({ _id: key }));
    const result = await cartsModel.updateOne(
      { _id: id },
      {
        $addToSet: { products: { $each: productsToAdd } },
      }
    );
    return result;
  };

  clearCart = async (id) => {
    const result = await cartsModel.updateOne(
      { _id: id },
      { $set: { products: [] } }
    );
    return result;
  };

  updateOneProduct = async (id, pid, quantity) => {
    const result = await cartsModel.updateOne(
      { _id: id, "products._id": pid }, // Encuentra el carrito y el producto
      {
        $set: { "products.$.quantity": quantity }, // Actualiza la cantidad
      }
    );
    return result;
  };

  deleteCartProduct = async (id, pid) => {
    const cart = await cartsModel.findOne({ _id: id }); // find cart
    cart.products.pull({ _id: pid });
    const result = await cart.save();
    return result;
  };

  deleteCart = async (id) => {
    const result = await cartsModel.deleteOne({ _id: id });
    return result;
  };
}
