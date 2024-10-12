const mongoose = require('mongoose');

const InventoryItemSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true 
    },
    supplier: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Supplier' 
},
});

const InventoryItem = mongoose.model('InventoryItem', InventoryItemSchema);
module.exports = InventoryItem;