const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController');

// Rota para obter contratos
router.get('/:empresa/:inicio/:sessionid', contractController.getContracts);

module.exports = router;
