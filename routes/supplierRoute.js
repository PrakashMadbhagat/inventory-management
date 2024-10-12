const express = require('express');
const route = express();
const controller = require('../controllers/supplierController')

route.post('/', controller.createSupplier);
route.get('/', controller.getAllSuppliers);

module.exports = route;
