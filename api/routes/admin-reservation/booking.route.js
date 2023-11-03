const express = require('express');
const { reservationsLib, flightsLib} = require('../../../db');
const api = express.Router();

api.route('/list-bookings').get(async (req, res, next) => {
    const { page, pageSize, origin, destination } = req.query;
    let result = null;
    try {
        result = await reservationsLib.findAllBookings({
            where: {
                origin,
                destination
            },
            pageSize: parseInt(pageSize),
            page: parseInt(page)
        });
    } catch (e) {
        return next(e);
    }
    res.send(result);
});

api.route('/create-booking').post(async (req, res, next) => {
    const model = req.body;
    let result = null;
    try {
        result = await reservationsLib.createOrUpdateBooking(model);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

api.route('/delete-booking').post( async (req, res, next) => {
    const model = req.body
    let result = null
    try {
        result = await flightsLib.deleteFlight(model)
    } catch (e) {
        return next(e)
    }
    res.send(result)
})
api.route('/find-all-reservations').get(async (req, res, next) => {
    const { where } = req.query;
    let result = null;
    try {
        result = await reservationsLib.findAllReservations(where);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});





module.exports = api;
