const {Op, Sequelize} = require('sequelize');
const dayjs = require('dayjs');
const {map} = require('underscore')
const models = require('../../models');
const { clientsModel } = models();

module.exports = {
    findAll: async (where) => {
        return await clientsModel.findAll({
            where: { ...where }
        })
    },

    findAllClients: async () => {
        try {
            const data = await clientsModel.findAll();
            const page = 1;
            const pageSize = 10;
            const offset = (page - 1) * pageSize;
            const paginatedData = data.slice(offset, offset + pageSize);
            return paginatedData.map(flight => flight.dataValues);
        } catch (error) {
            console.error('Error al obtener los datos de vuelo:', error);
            throw error;
        }
    },


    deleteClients: async (model) => {
        return new Promise(async (resolve, reject) => {
            return clientsModel.update({
                updatedAt: dayjs().format('YYYY-MM-DD hh:mm:ss'),
                status: 0
            }, {
                where: {
                    id: model.id
                },
                raw: true
            }).then(result => {
                if ( result ) {
                    resolve(result)
                } else {
                    resolve(null)
                }
            }).catch(err => reject(err))
        })
    },

    createOrUpdateClient: async (model) => {
        try {
            return new Promise(async (resolve, reject) => {
                const expenseModel = model.id ? await clientsModel.findByPk(model.id) : null;
                if (expenseModel) {
                    model.updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
                    expenseModel.update(model)
                        .then(() => resolve({ ...expenseModel, ...model }))
                        .catch((err) => {
                            if (err instanceof Sequelize.UniqueConstraintError) {
                                err.message = 'Id must be unique update';
                            }
                            reject(err);
                        });
                } else {
                    model.createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
                    clientsModel.create(model)
                        .then((result) => resolve(result))
                        .catch((err) => {
                            if (err instanceof Sequelize.UniqueConstraintError) {
                                err.message = 'Id must be unique create';
                            }
                            reject(err);
                        });
                }
            });
        } catch (error) {
            throw error;
        }
    },


}
