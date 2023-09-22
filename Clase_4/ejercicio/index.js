const { UserManager } = require("./Managers/UserManager");

const manager = new UserManager("./files/Usuarios.json");

const send = async () => {
  const users = await manager.getUsers();
  console.log(users);
  
  const user = {
      nombre: "Joaquin",
      apellido: "Gonzalez",
      edad: "24",
      curso: "Backend"
    }
    
    await manager.createUser(user);
    
    const usersFinal = await manager.getUsers();
    console.log(usersFinal);

};

send();
