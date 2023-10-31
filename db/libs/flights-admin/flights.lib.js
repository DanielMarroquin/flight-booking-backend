const { Sequelize, where, Op} = require('sequelize');
const dayjs = require('dayjs');
const models = require('../../models');
const { expensesModel } = models();

module.exports = {
    findAllExpense: async (where) => {
        return expensesModel.findAll({
            where: { ... where }
        })
    },
    createOrUpdateExpenseByUser: async (model) => {
        try {
            return new Promise(async (resolve, reject) => {
                const expenseModel = model.id ? await expensesModel.findByPk(model.id) : null;
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
                    expensesModel.create(model)
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

    findExpensesByIdUser: async (userId) => {
        try {
            const expenses = await expensesModel.findAll({
                where: {
                    user_id: userId,
                    status: { [Op.in]: [1] },
                },
                raw: true,
            });

            const totalAmount = expenses.reduce((total, expense) => {
                return total + parseFloat(expense.amount);
            }, 0);

            return {
                expenses,
                totalAmount,
            };
        } catch (err) {
            throw err;
        }
    },


    deleteExpenseByUser: async (idExpense) => {
        try {
            const result = await expensesModel.update(
                {
                    updatedAt: dayjs().format('YYYY-MM-DD hh:mm:ss'),
                    status: 0
                },
                {
                    where: {
                        id: idExpense
                    }
                }
            );
            return result
        } catch (err) {
            throw err;
        }
    }
}
