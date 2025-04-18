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

async function ConnectAndQuery(query) {
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

module.exports = ConnectAndQuery; 