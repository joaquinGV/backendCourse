import fs from "fs";

export default class productManager {
  constructor(path) {
    this.path = path;
  }
  getProducts = async () => {
    try {
      return [];
    } catch (err) {
      console.log(`Error obteniendo los datos de ${this.path} | `, err);
    }
  };
}
