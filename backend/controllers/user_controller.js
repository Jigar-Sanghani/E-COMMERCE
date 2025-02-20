const User = require("../models/user_models");
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require("dotenv").config(); 

const createtoken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY)
}

const register_User = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let isexist = await User.findOne({ email });
        if (isexist) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email format" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10)

        const hasspassword = await bcrypt.hash(password, salt)

        const newuser = new User({
            name,
            email,
            password: hasspassword
        })

        const user = await newuser.save()

        const token = createtoken(user._id)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message });
    }
};

const login_User = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User Not Exists" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {

            const token = createtoken(user._id)
            return res.json({ success: true, token });
        }

        else {
            res.json({ success: false, message: "Invalid credential" })
        }

    } catch (error) {
        res.json({ success: false, error: error.message });
    }
};

const admin_Login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET_KEY)
            res.json({success: true, token})
        }

    } catch (error) {
            res.json({success: false, error})
    }

};


module.exports = { register_User, login_User, admin_Login };