const express = require('express');
const http = require('http');
const authMiddleware = require('../middlewares/auth.middleware');
const cors = require('cors');
const asyncify = require('express-asyncify');
const app = asyncify(express());


const server = http.createServer(app)
/** All Routes **/
const authRoute = require('./admin-flights/auth.route');


const router = express.Router();

router.use(cors());

router.use('/auth', authRoute);



module.exports = router;
