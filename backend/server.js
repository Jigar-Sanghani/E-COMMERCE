const express = require('express');
const cors = require("cors");
const db = require('./config/db');
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World! This is the backend server for the E-Commerce website.");
})

const PORT = process.env.PORT || 4454;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    db();
});