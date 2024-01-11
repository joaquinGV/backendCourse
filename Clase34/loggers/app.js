import express from "express";
import { addLogger } from "./utils/loggers.js";

const app = express();

app.use(addLogger);

app.use("/", (req, res) => {
  //niveles por defecto
  req.logger.error(e.message);
  req.logger.warn("Prueba warn");
  req.logger.info("Prueba info");
  req.logger.http("Prueba http");
  req.logger.verbose("Prueba verbose");
  req.logger.debug("Prueba debug");
  req.logger.silly("Prueba silly");

  res.send({ result: "hola" });
});

app.listen(8080);
