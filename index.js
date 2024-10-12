const express = require('express');
const mongoose = require('./database/db');
const userRoutes = require('./routes/userRoute');
const inventoryRoutes = require('./routes/inventoryRoute');
const supplierRoutes = require('./routes/supplierRoute');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/', userRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/suppliers', supplierRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
