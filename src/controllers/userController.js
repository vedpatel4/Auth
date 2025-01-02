const userService = require('../services/userService');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.login(email, password);
        if (user) {
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const register = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const user = await userService.register(email, password, username);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    login,
    register
};