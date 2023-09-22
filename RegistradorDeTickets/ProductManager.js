class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts = () => {
    return this.products;
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {
    const codeExist = this.products.find((p) => p.code === code);
    if (codeExist) {
      console.log("El codigo ya existe repita denuevo");
      return;
    }
    const product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    product.id =
      this.products.length === 0
        ? 1
        : this.products[this.products.length - 1].id + 1;
    this.products.push(product);
  };

  getProductById = (productID) => {
    const productSearch = this.products.findIndex(
      (prod) => prod.id === productID
    );
    // console.log("\t" + productSearch)
    // console.log(this.products[productSearch])
    if (productSearch === -1) {
        console.error("Not Found");
        return null; 
    } else {
      return this.products[productSearch];
    }
  };
}


// Test Cases
//Instancia de la clase ProductManager
const pm = new ProductManager();

//Get products empty []
console.log(pm.getProducts());

//Add product
pm.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

//Repeat previous code
console.log(pm.getProducts());
pm.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

console.log(pm.getProductById(1));
console.log(pm.getProductById(1000));
