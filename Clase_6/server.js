const http = require('http');

// Voy a crear mi primer server backend
const server = http.createServer((req, res) =>{
    res.end('Mi primer hola mundo desde el backend');
});

// Tenemos que levantar el servidor en algun puerto en especifico
server.listen(8080,() => {
    console.log("Listening on port: 8080");
})
