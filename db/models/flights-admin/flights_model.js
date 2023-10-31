module.exports = function(sequelize, DataTypes) {
    return sequelize.define('flights', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        origin: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'origin'
        },
        destination: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'destination'
        },
        departureTime: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'departure_time'
        },
        arrivalTime: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'arrival_time'
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            field: 'price'
        },
        isAvailable: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '1',
            field: 'is_available'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('current_timestamp'),
            field: 'created_at'
        }
    }, {
        tableName: 'flights',
        timestamps: false
    });
};
