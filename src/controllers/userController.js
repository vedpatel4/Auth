const userService = require('../services/userService');

const login = (req, res) => {
    const login = userService.login();
    res.send('Login');
}

const register = (req, res) => {
    const register = userService.register();
    res.send('Register');
}

module.exports = {
    login,
    register
};