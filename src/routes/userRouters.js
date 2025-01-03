const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateLogin, validateRegister } = require('../middlewares/userMiddleware');

// Login route
router.post('/login', validateLogin, userController.login);

// Register route
router.post('/register', validateRegister, userController.register);

module.exports = router;