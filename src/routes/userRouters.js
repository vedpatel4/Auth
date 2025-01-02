const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check, validationResult } = require('express-validator');

// Validation and sanitization for login
const validateLogin = [
    check('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),
    check('password').not().isEmpty().trim().escape()
];

// Validation and sanitization for registration
const validateRegister = [
    check('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').trim().escape(),
    check('username').not().isEmpty().withMessage('Username is required').matches(/^[a-zA-Z0-9]+$/).withMessage('Username must not contain spaces or special characters').trim().escape()
];

// Login route
router.post('/login', validateLogin, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    userController.login(req, res);
});

// Register route
router.post('/register', validateRegister, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    userController.register(req, res);
});

module.exports = router;