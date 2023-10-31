const DataTypes = require('sequelize').DataTypes;
const { mainDB } = require('../sequelize.config');

/** MODELS **/
const _flights = require('./flights-admin/flights_model');
const _reservations = require('./reservations-admin/reservations_model');
const _clients = require('./clients-admin/clients_model');

function index () {
    const sequelizeMain = mainDB();
    /** Models **/
    const flightsModel = _flights(sequelizeMain, DataTypes);
    const reservationsModel = _reservations(sequelizeMain, DataTypes);
    const clientsModel = _clients(sequelizeMain, DataTypes);

    /** Relations Models **/
    // clientsModel.belongsTo(clientsModel, { foreignKey: 'createdUserId', as: 'userToUser' });
    // usersModel.belongsTo(usersModel, { foreignKey: 'updatedUserId', as: 'userToUserUpdate' });

    return {
        flightsModel,
        reservationsModel,
        clientsModel
    }
}

module.exports = index;
