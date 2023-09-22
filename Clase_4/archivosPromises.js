const fs = require("fs");

const operacionesArchivosAsincrono = async () => {
  try {
    await fs.promises.writeFile("./fp.txt", "Hola mundo desde las promesas");

    let resultado = await fs.promises.readFile("./fp.txt", "utf-8");

    console.log(resultado);

    await fs.promises.appendFile("./fp.txt", "\nMucho mas contenido");
    resultado = await fs.promises.readFile("./fp.txt", "utf-8");
    console.log(resultado);

    await fs.promises.unlink("./fp.txt");
  } catch (error) {
    console.log("El error fue ", error);
  }
};

operacionesArchivosAsincrono();
