const express = require('express');
const route = express();
const controller = require('../controllers/userController')

route.post('/register', controller.register);
route.post('/login', controller.login);

module.exports = route;
