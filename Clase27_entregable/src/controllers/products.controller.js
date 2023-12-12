import {
  getAllProducts,
  createProduct,
  updateProductData,
} from "../service/products.service.js";
// Get all products
const getAll = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.sendSuccess(products);
  } catch (error) {
    res.sendServerError(error.message);
  }
};
// Create a new product
const newProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.body;
    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !status ||
      !stock ||
      !category
    ) {
      res.sendClientError("Incomplete data");
    }

    const result = await createProduct({
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    });

    res.sendSuccess(result);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

// Update a product data
const updateProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.body;
    const { pid } = req.params;
    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !status ||
      !stock ||
      !category
    ) {
      res.sendClientError("Imcomplete data");
    }
    const result = await updateProductData(pid, {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    });

    res.sendSuccess(result);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export { getAll, newProduct, updateProduct };
