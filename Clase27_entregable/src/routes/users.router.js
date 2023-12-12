import Router from "./router.js";
import Users from "../dao/dbManagers/users.manager.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { createHash, generateToken, isValidPassword } from "../utils.js";
import {
  register,
  login,
  githubCallback,
  logout,
} from "../controllers/users.controller.js";

export default class UsersRouter extends Router {
  constructor() {
    super();
    this.usersManager = new Users();
  }

  init() {
    this.get(
      "/",
      [accessRolesEnum.PUBLIC],
      passportStrategiesEnum.NOTHING,
      async (req, res) => {
        res.sendSuccess("get working");
      }
    );
    this.post(
      "/login",
      [accessRolesEnum.PUBLIC],
      passportStrategiesEnum.NOTHING,
      login
    );
    this.post(
      "/register",
      [accessRolesEnum.PUBLIC],
      passportStrategiesEnum.NOTHING,
      register
    );
    this.get(
      "/github",
      [accessRolesEnum.PUBLIC],
      passportStrategiesEnum.GITHUB,
      async (req, res) => {
        res.sendSuccess("Logged with github");
      }
    );

    // Login with Github
    this.get(
      "/github-callback",
      [accessRolesEnum.PUBLIC],
      passportStrategiesEnum.GITHUB,
      githubCallback
    );
    // Logout with passport
    this.get(
      "/logout",
      [accessRolesEnum.PUBLIC],
      passportStrategiesEnum.GITHUB,
      logout
    );
  }
}
