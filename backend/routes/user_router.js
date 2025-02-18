const express = require("express");
const { register_User, login_User, admin_Login } = require("../controllers/user_controller");

const user_router = express.Router();

user_router.post("/register", register_User);
user_router.post("/login", login_User);
user_router.post("/admin", admin_Login);

module.exports = user_router;
