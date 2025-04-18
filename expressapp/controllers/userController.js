const ConnectAndQuery = require("../db/DB.js"); 
UserController = {} ;

//GET: get a single user by name
UserController.getUserByName = async function(req, res){
  const name = req.params.name; 
  
  var queryRes = await ConnectAndQuery( 
    `SELECT TOP 1 * FROM [USER]
      WHERE [Name] = '${name}'`); 

  if(queryRes.length == 0){
    res.status(404).json("no user with such name")
  }

  res.send(queryRes);
  return
} 

module.exports = UserController; 