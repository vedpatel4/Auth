const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateLogin, validateRegister } = require('../middlewares/userMiddleware');
// Login route
router.post('/login', validateLogin, (req, res) => {
    userController.login(req, res);
});

// Register route
router.post('/register', validateRegister, (req, res) => {
    userController.register(req, res);
});

module.exports = router;