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

  if(hasEmptyOrNullValues(part)){
    res.status(400).json({ message: 'Sent an empty form' });
  }

  try{
    const queryRes = await ConnectAndQuery(config, 
      `INSERT INTO [PART] VALUES
	      ('${part.name}', '${part.manufacturer}', '${part.partNumber}','${part.category}', ${Number(part.price)}, ${Number(part.quantity)}, null) `); 
        
    res.status(200).json("ok");
  }
  catch(error){
    console.error("Database query error:", error);
        res.status(500).json({ message: 'Server Error' });
  }
}

// DELETE: delete a part
PartController.deletePart = async function(req, res){
  const id = req.params.id; 
  
  try{
    const queryRes = await ConnectAndQuery(config, 
      `DELETE FROM [PART] 
	      WHERE [ID] = ${Number(id)}`); 

    res.status(200).json("ok");
  }
  catch(error){
    console.error("Database query error:", error);
        res.status(500).json({ message: 'Server Error' });
  }
}

// PUT: edit a part 
PartController.editPart = async function(req, res){
  const id = req.params.id; 
  const part = req.body; 

  try{
    const queryRes = await ConnectAndQuery(config, 
      `UPDATE [PART] 
	      SET 
          [Name] = '${part.Name}',
          [Manufacturer] = '${part.Manufacturer}',
          [PartNumber] = '${part.PartNumber}',
          [Category] = '${part.Category}',
          [Price] = ${Number(part.Price)},
          [Quantity] = ${Number(part.Quantity)}
	      WHERE [ID] =  ${Number(id)}`); 

    res.status(200).json("ok");
  }
  catch(error){
    console.error("Database query error:", error);
        res.status(500).json({ message: 'Server Error' });
  }
} 


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