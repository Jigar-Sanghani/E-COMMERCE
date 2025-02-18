const User = require("../models/user_models");
const validator = require('validator');


const register_User = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        user = await User.create({ name, email, password, avatar });

        const token = user.getJWTToken();

        res.status(201).json({ success: true, user, token });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const login_User = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const token = user.getJWTToken();

        res.status(200).json({ success: true, user, token });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const admin_Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await User.findOne({ email, role: "admin" }).select("+password");
        if (!admin) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const token = admin.getJWTToken();

        res.status(200).json({ success: true, user: admin, token });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


module.exports = { register_User, login_User, admin_Login };