const express = require('express');
const { flightsLib } = require('../../../db');
const api = express.Router();

api.route('/list-flights').get(async (req, res, next) => {
    const { page, pageSize, origin, destination } = req.query;
    let result = null;
    try {
        result = await flightsLib.listAllFlights({
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
api.route('/find-all').get(async (req, res, next) => {
    try {
        const { page, pageSize } = req.query;
        const results = await flightsLib.findAllFlights({
            page: parseInt(page),
            pageSize: parseInt(pageSize)
        });

        res.status(200).json(results);
    } catch (error) {
        console.error('Error al obtener todos los vuelos:', error);
        res.status(500).json({ error: 'Se produjo un error al obtener los vuelos' });
    }
});

api.route('/create-flight').post(async (req, res, next) => {
    const model = req.body;
    let result = null;
    try {
        result = await flightsLib.createOrUpdateFlight(model);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

api.route('/delete-flight').post( async (req, res, next) => {
    const model = req.body
    let result = null
    try {
        result = await flightsLib.deleteFlight(model)
    } catch (e) {
        return next(e)
    }
    res.send(result)
})






module.exports = api;

