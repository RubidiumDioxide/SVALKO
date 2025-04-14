// controllers/userController.js
const partModel = require('../models/partModel'); 
const { executeQuery } = require('../DB');
const sql = require('mssql');
const config = {
    user: 'sa',
    password: '1234',
    server: 'localhost',
    database: 'mlcht_DB',
    options: {
        encrypt: false, 
        trustServerCertificate: true, 
    },
  };

const getParts = async (req, res) => {
    const parts = await executeQuery('SELECT * FROM [PART]'); 

    console.log(parts);

    res.status(200).json(parts.map(
        part => new partModel(part.ID, part.Name, part.PartNumber, part.Manufacturer, part.Price, part.Qunatity, part.Image))); 
  };

const getPart = async (req, res, id) => {
    const part = await executeQuery($`SELECT * FROM [PART] WHERE [ID] == id`); 

    res.status(200).json(new partModel(part.ID, part.Name, part.PartNumber, part.Manufacturer, part.Price, part.Qunatity, part.Image)); 
};

module.exports = {
    getParts,
    getPart,
};
