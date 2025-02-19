const express = require('express');
const cors = require("cors");
const db = require('./config/db');
const connectCloudinary = require('./config/cloudinary');
const user_router = require('./routes/user_router');
const product_router = require('./routes/product_router');
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 4454;
db();
connectCloudinary()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api/user', user_router)
app.use('/api/product', product_router)

app.get("/", (req, res) => {
    res.send("Hello World! This is the backend server for the E-Commerce website.");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});