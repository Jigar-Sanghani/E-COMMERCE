const express = require("express");
const { getusercart, addtocart, updatecart } = require("../controllers/cart_controller");

const cart_router = express.Router();

cart_router.post("/add", addtocart);
cart_router.post("/update", updatecart);
cart_router.get("/get", getusercart);

module.exports = cart_router;
