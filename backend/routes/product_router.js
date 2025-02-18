const express = require("express");
const { listproducts, removeproducts, addproducts, singleproducts } = require("../controllers/product_controller");
const upload = require("../middlewares/multer");

const product_router = express.Router();

product_router.post("/add", upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), addproducts);
product_router.delete("/remove", removeproducts);
product_router.post("/single", singleproducts);
product_router.get("/list", listproducts);

module.exports = product_router;
