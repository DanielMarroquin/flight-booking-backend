module.exports = function(sequelize, DataTypes) {
    return sequelize.define('clients', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        firstName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'last_name'
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'email'
        },
        phoneNumber: {
            type: DataTypes.STRING(20),
            allowNull: true,
            field: 'phone_number'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('current_timestamp'),
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'updated_at'
        }
    }, {
        tableName: 'clients',
        timestamps: false
    });
};
