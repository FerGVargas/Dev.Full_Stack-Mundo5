const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para obter todos os usuários
router.get('/:sessionid', userController.getUsers);

module.exports = router;
