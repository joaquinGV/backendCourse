import Router from "./router.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import {
  register,
  login,
  getEmail,
  updateRole,
  githubCallback,
  logout,
  checkAndSend,
  updatePassword,
  updateDocuments,
  getAllUsers,
  deleteNoActive,
  deleteUser,
  updateUser,
} from "../controllers/users.controller.js";
import { uploader } from "../utils.js";

export default class UsersRouter extends Router {
  constructor() {
    super();
  }

  init() {
    this.get(
      "/",
      [accessRolesEnum.PUBLIC],
      passportStrategiesEnum.NOTHING,
      async (req, res) => {
        res.sendSuccess("get Users working");
      }
    );
    this.get(
      "/email",
      [accessRolesEnum.USER, accessRolesEnum.PREMIUM, accessRolesEnum.ADMIN],
      passportStrategiesEnum.JWT,
      getEmail
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
    this.post(
      "/:uid/documents",
      [accessRolesEnum.USER, accessRolesEnum.PREMIUM],
      passportStrategiesEnum.JWT,
      // uploader.single("thumbnail"),
      uploader.fields([
        { name: "identificacion", maxCount: 1 },
        { name: "cuenta", maxCount: 1 },
        { name: "domicilio", maxCount: 1 },
        { name: "perfil", maxCount: 1 },
        { name: "products", maxCount: 1 },
      ]),
      updateDocuments
    );

    this.get(
      "/premium/:uid",
      [accessRolesEnum.USER, accessRolesEnum.PREMIUM],
      passportStrategiesEnum.JWT,
      updateRole
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

    this.post(
      "/pass-recovery",
      [accessRolesEnum.PUBLIC],
      passportStrategiesEnum.NOTHING,
      checkAndSend
    );

    this.post(
      "/pass-update",
      [accessRolesEnum.PUBLIC],
      passportStrategiesEnum.NOTHING,
      updatePassword
    );

    this.get(
      "/all-users",
      [accessRolesEnum.ADMIN],
      passportStrategiesEnum.JWT,
      getAllUsers
    );

    this.put(
      "/update-role",
      [accessRolesEnum.ADMIN],
      passportStrategiesEnum.JWT,
      updateUser
    );
    this.delete(
      "/delete-user/:email",
      [accessRolesEnum.ADMIN],
      passportStrategiesEnum.JWT,
      deleteUser
    );
    this.delete(
      "/no-active",
      [accessRolesEnum.ADMIN],
      passportStrategiesEnum.JWT,
      deleteNoActive
    );
  }
}
