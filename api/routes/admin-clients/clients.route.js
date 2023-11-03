const express = require('express');
const { clientsLib, reservationsLib, flightsLib} = require('../../../db');
const api = express.Router();

api.route('/list-clients').get(async (req, res, next) => {
    const { page, pageSize, origin, destination } = req.query;
    let result = null;
    try {
        result = await clientsLib.findAllClients({
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

api.route('/create-client').post(async (req, res, next) => {
    const model = req.body;
    let result = null;
    try {
        result = await clientsLib.createOrUpdateClient(model);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

api.route('/delete-client').post( async (req, res, next) => {
    const model = req.body
    let result = null
    try {
        result = await clientsLib.deleteClients(model)
    } catch (e) {
        return next(e)
    }
    res.send(result)
})



module.exports = api;
