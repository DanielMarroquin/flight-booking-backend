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

    createOrUpdateCategoryExpense: async (model) => {
        try {
            return new Promise(async (resolve, reject) => {
                const categoryExpense = model.id ? await categoryExpensesModel.findByPk(model.id) : null;
                if (categoryExpense) {
                    // Actualizar el registro existente
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
                    // Crear un nuevo registro
                    model.createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
                    categoryExpensesModel.create(model)
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

    // createOrUpdateCategoryExpense: async (model) => {
    //     return new Promise( async (resolve, reject) => {
    //         const instanceModel = model.id ? await categoryExpensesModel.findOne(
    //             { where: { id: model.id }}).catch(reject): null;
    //         if (instanceModel) {
    //             model.updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
    //             categoryExpensesModel.update(model, { where: { id: instanceModel } })
    //                 .then(() => resolve ({...instanceModel, model}))
    //                 .catch((e = new Sequelize.UniqueConstraintError) => {
    //                     e.message = 'Email must be unique update'
    //                     reject(e)
    //                 }).catch(err => reject(err))
    //         } else {
    //             model.createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
    //             categoryExpensesModel.create(model).then(result => resolve(result))
    //                 .catch((e = new Sequelize.UniqueConstraintError) => {
    //                     e.message = 'Email must be unique create'
    //                     reject(e)
    //                 }).catch(err => reject(err))
    //         }
    //     })
    // },
    findCategoryExpenseByUser: async (idUser) => {
        try {
            return await categoryExpensesModel.findAll({
                where: {
                    idCreatorUser: idUser,
                    status: {[Op.in]: [1]},
                },
                raw: true,
            })
        } catch (err) {
            throw err;
        }
    },
    deleteCategoryExpense: async (model) => {
        return new Promise(async (resolve, reject) => {
            return categoryExpensesModel.update({
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
