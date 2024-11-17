const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota de login
router.post('/login', authController.login);

// Rota para descriptografar a session-id
router.post('/decrypt/:sessionid', authController.decrypt);

module.exports = router;
