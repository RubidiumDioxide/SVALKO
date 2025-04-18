const ConnectAndQuery = require("../db/DB.js"); 
PartController = {} ;

//GET: get all parts
PartController.getParts = async function(req, res){
  var queryRes = await ConnectAndQuery( 
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
    const queryRes = await ConnectAndQuery(
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

// GET: sort parts by provided column 
PartController.sortParts = async function(req, res){
  const column = req.params.column; 

  console.log(column); 

  try{
    const queryRes = await ConnectAndQuery(
      `SELECT * FROM [PART]
      ORDER BY [${column}]`); 
    
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
    const queryRes = await ConnectAndQuery(
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
    const queryRes = await ConnectAndQuery(
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
    const queryRes = await ConnectAndQuery(
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