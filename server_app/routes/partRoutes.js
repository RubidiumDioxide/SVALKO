// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const partController = require('../controllers/partController');

router.get('/', partController.getParts);
router.get('/:id', partController.getPart);

module.exports = router;
