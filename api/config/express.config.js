const expressConfig = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { service: { logs } } = require('../../config');
const error = require('../middlewares/error.middleware');

const app = expressConfig()
app.use(morgan(logs))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors())

app.use(error.converter)

app.use(error.notFound)

app.use(error.handler)

module.exports = app
