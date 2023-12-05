import dotenv from "dotenv"
import { Command } from "commander"

const program = new Command();

program.option("--mode <modo>", "variable de ambiente");
program.parse();

// development or production
const environment = program.opts().mode;

dotenv.config({
    path: (environment === "DEVELOPMENT") ? "./.env.development" : "./.env.production"
});

const configs = {
    port: process.env.PORT,
    mongoURL: process.env.MONGO_URL
}

export default configs;