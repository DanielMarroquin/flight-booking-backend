const { Sequelize, where, Op} = require('sequelize');
const dayjs = require('dayjs');
const {map} = require('underscore');
const models = require('../../models');
const { flightsModel } = models();

module.exports = {

    flights: async () => {
        return await flightsModel.findAll()
    },

    findAllFlights: async () => {
        try {
            const data = await flightsModel.findAll({
                attributes: [
                    'id',
                    'origin',
                    'destination',
                    'departureTime',
                    'arrivalTime',
                    'price',
                    'isAvailable',
                    'createdAt',
                ]
            });
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


    findAll: async ({ where, page, pageSize }) => {
        const offset = pageSize * page;
        const limit =  pageSize;
        let whereQuery = {};
        map(where, (value, key) => {
            if (value) {
                whereQuery[key] = { [Op.like]: `%${value}%` };
            }
        });

        const result = await flightsModel.findAndCountAll({
            where: { ...whereQuery },
            offset,
            limit
        });

        const data = result.rows.map(flight => flight.dataValues); // Aquí obtienes los dataValues de cada objeto flights

        return {
            count: result.count,
            rows: data
        };
    },


    listAllFlights: async ({ where, page, pageSize }) => {
        try {
            const offset = pageSize * (page - 1);
            const limit = pageSize;
            let whereQuery = {};
            Object.keys(where).forEach((key) => {
                if (where[key]) {
                    whereQuery[key] = { [Op.like]: `${where[key]}%` };
                }
            });

            const attributes = [
                'id',
                'origin',
                'destination',
                'departureTime',
                'arrivalTime',
                'price',
                'isAvailable',
                'createdAt',
            ];

            const { count, rows } = await flightsModel.findAndCountAll({
                attributes,
                where: { ...whereQuery },
                offset,
                limit,
                raw: true,
            });

            return { count, flights: rows };
        } catch (error) {
            console.error(error, 'Error in list flights');
            throw new Error('Error occurred.');
        }
    },


    createOrUpdateFlight: async (model) => {
        try {
            return new Promise(async (resolve, reject) => {
                const expenseModel = model.id ? await flightsModel.findByPk(model.id) : null;
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
                    flightsModel.create(model)
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


    deleteFlight: async (idFlight) => {
        try {
            return await flightsModel.update(
                {
                    updatedAt: dayjs().format('YYYY-MM-DD hh:mm:ss'),
                    status: 0
                },
                {
                    where: {
                        id: idFlight
                    }
                }
            )
        } catch (err) {
            throw err;
        }
    }
}
