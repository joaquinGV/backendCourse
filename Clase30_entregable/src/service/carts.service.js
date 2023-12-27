import { Carts, Products } from "../dao/factory.js";
import CartsRepository from "../repositories/carts.repository.js";
import ProductsRepository from "../repositories/products.repository.js";
import * as ticketsService from "./tickets.service.js";
import mongoose from "mongoose";

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
// const purchase = async (cid, user) => {
//   let session;
//   try {
//     //Transacciones
//     session = await mongoose.startSession();
//     session.startTransaction();

//     // Contador de cantidad total y de productos sin stock.
//     let amount = 0;
//     const outStock = [];

//     const cart = await cartsRepository.getOne(cid);
//     cart.products.forEach(async ({ product, quantity }) => {
//       const productData = await productsRepository.getOneProduct(product);
//       if (productData.stock >= quantity) {
//         productData.stock -= quantity;
//         //utilizar el repository de carritos para poder actualizar el stock del los productos
//         console.log(productData);
//         await productsRepository.updateProduct(product, productData.stock);
//         amount += quantity * productData.price;
//       } else {
//         outStock.push({ product, quantity });
//       }
//     });

//     const ticket = await ticketsService.generatePurchase(user, amount);

//     //actulizar el carrito con el nuevo arreglo de productos que no pudieron comprarse

//     await cartsRepository.putProducts(cid, outStock);
//     await session.commitTransaction();

//     return ticket;
//   } catch (error) {
//     await session.abortTransaction();
//     console.error("Error en service - ", error.message);
//   } finally {
//     session.endSession();
//   }
// };

// Process to purchase the cart of the user,
const purchase = async (cid, user) => {
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const cart = await cartsRepository.getOne(cid);

    if (!cart || !cart.products || cart.products.length === 0) {
      console.error("Error en Carts service - Carrito no encontrado o vacío");
      return;
    }

    console.log("products funcionando");

    const operations = await Promise.all(
      cart.products.map(async ({ product, quantity }) => {
        console.log(
          `Processing product: ${product} with quantity: ${quantity}`
        );

        try {
          const productData = await productsRepository.getOneProduct(product);
          // console.log("Product data:", productData);

          if (productData.stock >= quantity) {
            productData.stock -= quantity;
            await productsRepository.updateProduct(product, {
              stock: productData.stock,
            });
            return quantity * productData.price;
          } else {
            return { product, quantity };
          }
        } catch (error) {
          console.error("Error processing product:", error.message);
          throw error; // Propagar el error para identificar la causa raíz.
        }
      })
    );

    console.log("Iniciando proceso de amount");
    const amount = operations
      .filter((result) => typeof result === "number")
      .reduce((acc, value) => acc + value, 0);
    const outStock = operations.filter((result) => typeof result !== "number");

    const ticket = await ticketsService.generatePurchase(user, amount);

    console.log("Iniciando proceso de update cart");
    await cartsRepository.putProducts(cid, outStock);
    await session.commitTransaction();

    return ticket;
  } catch (error) {
    await session?.abortTransaction();
    console.error("Error en Carts service - ", error.message);
  } finally {
    session?.endSession();
  }
};

export { addProduct, purchase };
