const http = require('http');
const { service } = require('../config');
const app = require('./config/express.config');

const server = http.createServer(app);

server.listen(service.port, () => console.log(`Server started on port ${service.port}`));
