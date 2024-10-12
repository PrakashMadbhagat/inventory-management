const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    contactInfo: { 
        type: String, 
        required: true 
    },
});

const Supplier = mongoose.model('Supplier', SupplierSchema);
module.exports = Supplier;