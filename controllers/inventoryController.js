const InventoryItem = require('../models/inventoryItemModel');
const Supplier = require('../models/supplierModel');
const fs = require('fs');
const csv = require('csv-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const createItem = async (req, res) => {
    const { name, quantity, supplier } = req.body;
    const item = new InventoryItem({ name, quantity, supplier });
    await item.save();
    res.status(201).json(item);
};

const updateItem = async (req, res) => {
    const { id } = req.params;
    const item = await InventoryItem.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(item);
};

const deleteItem = async (req, res) => {
    const { id } = req.params;
    await InventoryItem.findByIdAndDelete(id);
    res.status(204).send();
};

const getAllItems = async (req, res) => {
    const items = await InventoryItem.find().populate('supplier');
    res.status(200).json({items});
};

const lowStockAlert = async (req, res) => {
    const threshold = req.query.threshold || 5;
    const items = await InventoryItem.find({ quantity: { $lt: threshold } });
    res.status(200).json({items});
};

const importCSV = async (req, res) => {
    const results = [];
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            for (const item of results) {
                await InventoryItem.create(item);
            }
            res.status(200).json({ message: 'CSV data imported' });
        });
};

const exportCSV = async (req, res) => {
    const items = await InventoryItem.find().populate('supplier');
    const csvWriter = require('csv-writer').createObjectCsvWriter({
        path: 'uploads/inventory.csv',
        header: [
            { id: 'name', title: 'Name' },
            { id: 'quantity', title: 'Quantity' },
            { id: 'supplier', title: 'Supplier' },
        ]
    });
    await csvWriter.writeRecords({items});
    res.download('uploads/inventory.csv');
};

module.exports = { 
    createItem, 
    updateItem, 
    deleteItem, 
    getAllItems, 
    lowStockAlert, 
    importCSV, 
    exportCSV } 
