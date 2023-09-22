import fs from "fs";
import crypto from "crypto";

export default class UserManager {
  // Constructor to obtain the path where users will be obtained
  constructor(path) {
    this.path = path;
  }

  // Method to return json file users from the path
  getUsers = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        const users = data != "" ? JSON.parse(data) : [];
        return users;
      } else {
        return [];
      }
    } catch (error) {
      console.error(`Error getting the data from ${this.path} | `, error);
    }
  };

  // Method to create new users in the path.
  createUser = async (user) => {
    try {
      // Obtain users from path
      const users = await this.getUsers();

      // auto increment new user id.
      if (users.length == 0) {
        user.id = 1;
      } else {
        user.id = users[users.length - 1].id + 1;
      }

      //Encriptar contraseña
      user.salt = crypto.randomBytes(128).toString("base64");
      user.password = crypto
        .createHmac("sha256", user.salt)
        .update(user.password)
        .digest("hex");

      // add user to the users array.
      users.push(user);
      // override the json file with updated users.
      await fs.promises.writeFile(this.path, JSON.stringify(users, null, "\t"));

      return user;
    } catch (error) {
      console.error(`Error in writing the data to ${this.path} | `, error);
    }
  };
}

