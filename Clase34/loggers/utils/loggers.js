import winston from "winston";


const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "info",
    }),
    new winston.transports.File({
      level: "warn",
      filename: "logs/dev.log",
    }),
  ],
});

export const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.info(`${req.method} en ${req.url} - ${new Date()}`);
  next();
};
