const { check, validationResult } = require('express-validator');

//error handler
const errorHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validation and sanitization for login
const validateLogin = [
    check('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),
    check('password').not().isEmpty().trim().escape(),
    errorHandler
];

// Validation and sanitization for registration
const validateRegister = [
    check('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').trim().escape(),
    check('username').not().isEmpty().withMessage('Username is required').matches(/^[a-zA-Z0-9]+$/).withMessage('Username must not contain spaces or special characters').trim().escape(),
    errorHandler
];

module.exports = {
    validateLogin,
    validateRegister
};