import express, { json } from 'express';
import cors from 'cors';
import 'dotenv/config'
import db from './config/db.js';

const app = express();

const PORT = process.env.PORT || 4454;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World! This is the backend server for the E-Commerce website.");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    db()
});