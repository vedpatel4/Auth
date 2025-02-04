const userService = require('../services/userService');
const {matchedData} = require('express-validator');

const login = async (req, res) => {
    try {
        const validatedData = matchedData(req);
        const { email, password } = validatedData;
        const user = await userService.login(email, password);
        res.status(200).json({message: 'Login successful', user});

    } catch (err) {
        if (err.message === 'User not found' || err.message === 'Invalid credentials') {
            res.status(401).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

const register = async (req, res) => {
    try {
        const validatedData = matchedData(req);
        const { email, password, username } = validatedData;
        const user = await userService.register(email, password, username);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        if (err.message === 'User already exists' || err.message === 'Username is already taken') {
            res.status(400).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = {
    login,
    register
};