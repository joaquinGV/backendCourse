const socket = io();
const input = document.getElementById("input");

input.addEventListener("click", (evt) => {
  const message = document.getElementById("textbox").value;
  const user = document.getElementById("user").value;

  if (user && message) {
    console.log("Se hizo click con los datos", user, message);
    const data = {
      user,
      message,
    };

    socket.emit("addMessage", data);

    const url = "/api/messages";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        // Manejar la respuesta del servidor
        console.log(data);
        // Puedes realizar acciones adicionales aquí según la respuesta del servidor
      })
      .catch((error) => console.error("Error:", error));
  }
});
