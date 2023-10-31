const { db } = require('../config');
const Sequelize = require('sequelize');
let sequelize = null

module.exports = {
    mainDB: () => {
        if (!sequelize) {
            sequelize = new Sequelize(db.main)
            sequelize.authenticate().then(console.log).catch(console.error)
        }
        return sequelize
    }
}
