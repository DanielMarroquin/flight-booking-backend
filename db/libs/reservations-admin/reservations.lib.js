const {Op, Sequelize, where} = require('sequelize');
const models = require('../../models');
const dayjs = require("dayjs");
const { reservationsModel } = models();

module.exports = {
    findAllReservations: async (where) => {
        return reservationsModel.findAll({
            where: { ...where }
        })
    },

    findAllBookings: async () => {
        try {
            const data = await reservationsModel.findAll();
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

    createOrUpdateBooking: async (model) => {
        try {
            return new Promise(async (resolve, reject) => {
                const categoryExpense = model.id ? await reservationsModel.findByPk(model.id) : null;
                if (categoryExpense) {
                    model.updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
                    categoryExpense.update(model)
                        .then(() => resolve({ ...categoryExpense, ...model }))
                        .catch((err) => {
                            if (err instanceof Sequelize.UniqueConstraintError) {
                                err.message = 'Id must be unique update';
                            }
                            reject(err);
                        });
                } else {
                    model.createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
                    reservationsModel.create(model)
                        .then((result) => resolve(result))
                        .catch((err) => {
                            if (err instanceof Sequelize.UniqueConstraintError) {
                                err.message = 'Id must be unique create';
                            }
                            reject(err);
                        });
                }

            })
        } catch (error) {
            throw error;
        }

    },

    deleteCategoryExpense: async (model) => {
        return new Promise(async (resolve, reject) => {
            return reservationsModel.update({
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
    }
}
