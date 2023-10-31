const {Op, Sequelize} = require('sequelize');
const dayjs = require('dayjs');
const {map} = require('underscore')
const models = require('../../models');
const { clientsModel } = models();

module.exports = {
    findAllClients: async (where) => {
        return clientsModel.findAll({
            where: { ...where }
        })
    },
    findUserByUserName: async (username) => {
        return new Promise ((resolve, reject) => {
            clientsModel.findOne({
                attributes: ['id', 'fullName', 'email', 'userName', 'password', 'createdAt', 'avatar', 'updatedAt', 'status'],
                where: {
                    userName: username,
                    status: 1
                },
                raw: true
            }).then(async result => {
                resolve(result)
            }).catch(err => reject(err))
        })
    },

    listUsers: async ({ where, page, pageSize }) => {
        const offset = pageSize * page;
        const limit = pageSize;
        let whereQuery = {}
        map(where, (value, key) => {
            if (value) {
                whereQuery[key] = {[Op.like]: `${value}`}
            }
        })
        return clientsModel.findAndCountAll({
            attributes: [
                `id`,
                `fullName`,
                `email`,
                `userName`,
                `createdAt`,
                `avatar`,
                `updatedAt`,
                `status`
            ],
            where: {...whereQuery},
            offset,
            limit,
            include: [{
                model: clientsModel
            }],
            raw: true
        })
    },

    createOrUpdateUser: async (model) => {
        return new Promise(async (resolve, reject) => {
            try {
                const instanceModel = model.id
                    ? await clientsModel.findOne({ where: { id: model.id } })
                    : null;

                if (instanceModel) {
                    model.updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
                    await instanceModel.update(model);
                    resolve({ ...instanceModel.toJSON(), ...model });
                } else {
                    model.createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
                    const newUser = await clientsModel.create(model);
                    resolve(newUser.toJSON());
                }
            } catch (error) {
                if (error instanceof Sequelize.UniqueConstraintError) {
                    error.message = model.id
                        ? 'Email must be unique update'
                        : 'Email must be unique create';
                }
                reject(error);
            }
        });
    },


    findUserById: (id) => {
        return new Promise((resolve, reject) => {
            clientsModel.findOne({
                attributes: [ 'id', 'fullName', 'email', 'userName', 'userName', 'avatar' ],
                where: {
                    id: id
                }
            }).then(result => resolve(result)).catch(err => reject(err));
        })
    },

    deleteUsers: async (model) => {
        return new Promise(async (resolve, reject) => {
            return usersModel.update({
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
