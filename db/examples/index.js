const { clientsLib, reservationsLib, flightsLib } = require('../index');
const {findAll} = require("../libs/flights-admin/flights.lib");
const models = require('../../db/models');
const { flightsModel } = models();



// const testDatabaseConnection = async () => {
//     try {
//         // Realiza una consulta simple para obtener algunos registros de tu base de datos
//         const results = await flightsModel.findAll({ limit: 5 });
//
//         // Imprime los resultados en la consola
//         console.log('Resultados de la consulta:', results);
//     } catch (error) {
//         // Maneja cualquier error que ocurra durante la consulta
//         console.error('Error al consultar la base de datos:', error);
//     }
// };
//
// // Llama a la función para probar la conexión a la base de datos
// testDatabaseConnection().then(r => console.log(r));


// flightsLib.findProcess().then(console.log)
// clientsLib.findAllClients().then(console.log)
// flightsLib.findAllAss().then(console.log)
flightsLib.createOrUpdateFlight({
    origin: 'Quito',
    destination: 'Bogota',
    departureTime: '2023-11-02 17:00:00',
    arrivalTime: '2023-11-03 17:00:00',
    price: 230.00,
    isAvailable: 1,
    createdAt: '2023-11-02 17:00:00',
}).then(console.log)
// usersLib.createOrUpdateUser({
//     id: 4,
//     fullName: 'Daniel Marroquin',
//     email: 'ejemplo@pruebas.com',
//     userName: 'demarroquin',
//     password: 'Danibrus111',
//     createdAt: '2023-09-25',
//     avatar: 'link.com.ec',
//     status: 1
// }).then(console.log)
// flightsLib.findAll({ where: 1, pageSize: 10, page: 1 }).then(console.log)
// clientsLib.findUserById(2).then(console.log)
// reservationsLib.findAllReservations().then(console.log)
// flightsLib.listAllFlights({where: 1, page: 1, pageSize: 10}).then(console.log)





