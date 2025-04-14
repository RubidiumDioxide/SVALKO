// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const partRoutes = require('./routes/partRoutes');
require('dotenv').config(); 

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(
  '/jsfolder', 
  express.static(`${__dirname}/public/js`) 
); 

// Pages routes
app.use('/parts', express.static(__dirname + '/views/parts')); 
app.use("/", express.static(__dirname + '/views')); 

// Controller routes
app.use('/api/parts', partRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
