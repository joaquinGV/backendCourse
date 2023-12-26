import { Carts, Products } from "../dao/factory.js";
import CartsRepository from "../repositories/carts.repository.js";
import ProductsRepository from "../repositories/products.repository.js";
import * as ticketsService from "./tickets.service";

const CartsDao = new Carts();
const cartsRepository = new CartsRepository(CartsDao);
const ProductsDao = new Products();
const productsRepository = new ProductsRepository(ProductsDao);

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

// Process to purchase the cart of the user,
const purchase = async (cid, user) => {
  try {
    //Transacciones
    const session = await mongoose.startSession();
    session.startTransaction();

    // Contador de cantidad total y de productos sin stock.
    let amount = 0;
    const outStock = [];

    const cart = cartsRepository.getOne(cid);
    cart.product.forEach(async ({ product, quantity }) => {
      const productData = await productsRepository.getOneProduct(product);
      if (productData.stock >= quantity) {
        productData.stock -= quantity;
        //utilizar el repository de carritos para poder actualizar el stock del los productos
        await productsRepository.updateProduct(product, productData);
        amount += quantity * productData.price;
      } else {
        outStock.push({ product, quantity });
      }
    });

    const ticket = await ticketsService.generatePurchase(user, amount);

    //actulizar el carrito con el nuevo arreglo de productos que no pudieron comprarse

    await cartsRepository.putProducts(cid, outStock);
    await session.commitTransaction();

    return "Compra realizada con exito";
  } catch (error) {
    await session.abortTransaction();
    console.error("Error en service - ", error.message);
  } finally {
    session.endSession();
  }
};

export { addProduct, purchase };
