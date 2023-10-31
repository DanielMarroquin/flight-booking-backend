module.exports = function(sequelize, DataTypes) {
    return sequelize.define('reservations', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        flightId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'flight_id'
        },
        seatsBooked: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'seats_booked'
        },
        totalPrice: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            field: 'total_price'
        },
        reservationTime: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'reservation_time'
        },
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'client_id'
        }
    }, {
        tableName: 'reservations',
        timestamps: false
    });
};
