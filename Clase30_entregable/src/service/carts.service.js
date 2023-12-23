import { Carts } from "../dao/factory.js";
import CartsRepository from "../repositories/carts.repository.js";

const CartsDao = new Carts();
const cartsRepository = new CartsRepository(CartsDao);

// Add one product quantity or update quantity
const addProduct = async (cid, pid, quantity = 0) => {
  try {
    const result =
      quantity === 0
        ? await cartsRepository.addOneProduct(cid, pid)
        : await cartsRepository.putQuantity(cid, pid, quantity);

    return result;
  } catch (error) {
    console.error("Error en service - ", error.message);
  }
};

export { addProduct };
