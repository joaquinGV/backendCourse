import UserManager from "./managers/UserManager.js";
const manager = new UserManager("./files/Usuarios.json");

const send = async () => {
  const users = await manager.getUsers();
  console.log(users);
  
  const user = {
      nombre: "Joaquin",
      apellido: "Gonzalez",
      usuario: "joacosxd",
      contraseña: "Backend99"
    }
    
    await manager.createUser(user);
    
    const usersFinal = await manager.getUsers();
    console.log(usersFinal);

};

send();
