const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const login = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return null; // User not found
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return null; // Password does not match
        }
        return user; // Login successful
    } catch (err) {
        throw err; // Propagate error
    }
};

const register = async (email, password, username) => {
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            throw new Error('Username is already taken');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            username
        });
        await newUser.save();
        return newUser; // Registration successful
    } catch (err) {
        throw err; // Propagate error
    }
};

module.exports = {
    login,
    register
};