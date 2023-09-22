class TicketManager {
  #precioGanancia = 0.15;
  constructor() {
    this.events = [];
  }

  getEventos = () => {
    return this.events;
  };

  agregarEventos = (
    nombre,
    lugar,
    precio,
    capacidad = 50,
    fecha = new Date().toDateString()
  ) => {
    const event = {
      nombre,
      lugar,
      precio: precio + precio * this.#precioGanancia,
      capacidad,
      fecha: new Date(fecha).toDateString(),
      participantes: [],
    };
    if (this.events.length === 0) {
      event.id = 1;
    } else {
      event.id = this.events[this.events.length - 1].id + 1;
    }
    this.events.push(event);
  };

  agregarUsuario = (eventId, userId) => {
    const eventExist = this.events.findIndex((e) => e.id === eventId);
    if (eventExist == -1) {
      console.log("El evento no existe");
      return;
    }
    const userExist = this.events[eventExist].participantes.includes(userId);

    if (userExist) {
      console.log(`El usuario con ID: ${userId} con ya esta registrado`);
      return;
    } else {
      this.events[eventExist].participantes.push(userId);
    }
  };

  ponerEventoEnGira(eventId, newLocalidad, newDate) {
    const evento = this.events.findIndex((e) => e.id === eventId);
    if (evento != -1) {
    //   console.log(this.events[evento]);
      const newEvento = {
        ...this.events[evento],
        lugar: newLocalidad,
        fecha: newDate,
        participantes: [],
      };
      this.agregarEventos(
        newEvento.nombre,
        newEvento.lugar,
        newEvento.precio,
        newEvento.capacidad,
        newEvento.fecha
      );
    }
  }
}

//Instancia de la clase TicketManager
const manejadorEventos = new TicketManager();

//Agregar eventos con el manjeador de eventos
manejadorEventos.agregarEventos(
  "Evento 1",
  "Chiapas",
  10,
  60,
  new Date(2023, 11, 20)
);
manejadorEventos.agregarEventos("Evento 2", "GDL", 25, 100);
manejadorEventos.agregarEventos("Evento 3", "Colima", 80, 200);

//Agregar Usuarios
manejadorEventos.agregarUsuario(1, 25);
manejadorEventos.agregarUsuario(1, 25);
manejadorEventos.agregarUsuario(2, 24);
manejadorEventos.agregarUsuario(3, 20);

//Poner Evento en Gira
manejadorEventos.ponerEventoEnGira(2, "Sinaloa", new Date(2024, 0, 9));

//Llamar metodo para mostrar todos los eventos
console.log(manejadorEventos.getEventos());
