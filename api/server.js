const http = require('http');
const express = require('express');
const cors = require('cors');
const { service } = require('../config');
const app = express();

/** All Routes **/
const flightRoute = require('../api/routes/admin-flights/flights.route');
const clientRoute = require('../api/routes/admin-clients/clients.route');
const bookingRoute = require('../api/routes/admin-reservation/booking.route');

app.use(cors());
app.use(express.json());
app.use('/flight', flightRoute);
app.use('/booking', bookingRoute);
app.use('/clients', clientRoute);

const server = http.createServer(app);

server.listen(service.port, () => console.log(`Server started on port ${service.port}`));

module.exports = server;
