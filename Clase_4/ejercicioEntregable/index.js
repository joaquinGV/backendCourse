const { productManager } = require("./ProductManager/ProductManager");

const manager = new productManager("./files/Usuarios.json");

const send = async () => {
  console.log(await manager.getProducts());
  await manager.addProduct("producto prueba","Este es un producto prueba", 200, "Sin imagen", "abd123", 25);
  console.log(await manager.getProducts());
  console.log(await manager.getProductById(1));
  console.log(await manager.getProductById(4));
  let obj = {
    title: "producto prueba",
    code:"abc1234",
    stock:25
  }
  console.log(await manager.updateProduct(1, obj));
  console.log(await manager.getProducts());
  console.log(await manager.deleteProduct(1));
  console.log(await manager.getProducts());



};

send();
