import dotenv from "dotenv";
// import { Command } from "commander";

// const program = new Command();

// program.option("--mode <modo>", "variable de ambiente");
// program.parse();

// //DEVELOPMENT, PRODUCTION
// const environment = program.opts().mode;

dotenv
  .config
  //     {
  //   path:
  //     environment === "PRODUCTION" ? "./.env.production" : "./.env.development",
  // }
  ();

const configs = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  privateKeyJWT: process.env.PRIVATE_KEY_JWT,
  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubSecret: process.env.GITHUB_SECRET,
};

console.log(configs);

export default configs;
