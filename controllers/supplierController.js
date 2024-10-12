const Supplier = require('../models/supplierModel');

const createSupplier = async (req, res) => {
    const { name, contactInfo } = req.body;
    const supplier = new Supplier({ 
        name, 
        contactInfo 
    });
    await supplier.save();
    res.status(201).json({supplier});
};

const getAllSuppliers = async (req, res) => {
    const suppliers = await Supplier.find();
    res.status(200).json({suppliers});
};

module.exports = {createSupplier , getAllSuppliers}