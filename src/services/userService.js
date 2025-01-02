const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const login = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return null;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return null;
        }
        return user;
    } catch (err) {
        throw err;
    }
};

const register = async (email, password, name) => {
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            name
        });
        await newUser.save();
        return newUser;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    login,
    register
};