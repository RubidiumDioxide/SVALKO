const { partials } = require("handlebars");
const Part = require("../models/part.js"); 
const sql = require("mssql"); 

const config = {
  user: 'sa',      
  password: '1234',   
  server: 'localhost',    
  database: 'svalko_DB',    
  options: {
      encrypt: false, 
      trustServerCertificate: true 
  }
};

async function ConnectAndQuery(config, query) {
  try {
      await sql.connect(config);
      const result = await sql.query(query);
      return result.recordset; 
  } catch (err) {
      return('SQL error ' + err);
  } finally {
      await sql.close();
  }
}

PartController = {} ;

//GET: get all parts
PartController.getParts = async function(req, res){
  var queryRes = await ConnectAndQuery(config, 
    "SELECT * FROM [PART]"); 

  res.send(queryRes);
  return
}

// GET: search for parts by Name, PartNumber, Manufacturer
PartController.searchParts = async function(req, res){
  const params = {
    name: (req.query.name != undefined)?req.query.name:"" , 
    partNumber: (req.query.partNumber)?req.query.partNumber:"", 
    manufacturer: (req.query.manufacturer)?req.query.manufacturer:""
  }

  console.log(`${params.name} ${params.partNumber} ${params.manufacturer}`);

  try{
    const queryRes = await ConnectAndQuery(config, 
      `SELECT * FROM [PART] 
        WHERE [Name] LIKE '%${params.name}%' 
          AND [PartNumber] LIKE '%${params.partNumber}%' 
          AND [Manufacturer] LIKE '%${params.manufacturer}%' `); 
    
    res.json(queryRes);
  }
  catch{
    console.error("Database query error:", error);
        res.status(500).json({ message: 'Server Error' });
  }
}

// POST: add a part
PartController.addPart = async function(req, res){
  const part = req.body; 

  console.log(req.body); 
  

  /*try{
    const queryRes = await ConnectAndQuery(config, 
      `SELECT * FROM [PART] 
        WHERE [Name] LIKE '%${params.name}%' 
          AND [PartNumber] LIKE '%${params.partNumber}%' 
          AND [Manufacturer] LIKE '%${params.manufacturer}%' `); 
    
    res.json(queryRes);
  }
  catch{
    console.error("Database query error:", error);
        res.status(500).json({ message: 'Server Error' });
  }*/
}


//GET: get one part by id. Don't know if it works or not yet. 
/*PartController.getPart = async function(req, res, id){
  var queryRes = await ConnectAndQuery(config, `SELECT * FROM [PART] WHERE [ID] = ${id}`); 

  res.send(queryRes);
  return
}*/


function hasEmptyOrNullValues(obj) {
  for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          if (value === "" || value === null || value === undefined) {
              return true; 
          }
      }
  }
  return false; 
}


module.exports = PartController; 