const express = require('express');
const route = express();
const controller = require('../controllers/inventoryController')
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

route.use(authMiddleware); 

route.post('/', controller.createItem);
route.put('/:id', controller.updateItem);
route.delete('/:id', controller.deleteItem);
route.get('/', controller.getAllItems);
route.get('/low-stock', controller.lowStockAlert);
route.post('/import', upload.single('file'), controller.importCSV);
route.get('/export', controller.exportCSV);

module.exports = route;
