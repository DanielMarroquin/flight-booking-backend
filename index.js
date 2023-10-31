const http = require('http');

const server = http.createServer((req, res) => {
    // Configura el encabezado de la respuesta HTTP
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Envía la respuesta al cliente
    res.end('¡Hola, este es mi servidor HTTP en Node.js!\n');
});

// Define el puerto en el que el servidor escuchará las solicitudes
const port = 3000;

// Inicia el servidor y escucha en el puerto especificado
server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}/`);
});
