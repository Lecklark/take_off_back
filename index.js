require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/index');
const jsonServer = require('json-server');
const jsonRouter = jsonServer.router('db.json');
const authMiddleware = require('./middleware/auth_middleware');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", router);
app.use("/api/",authMiddleware,jsonRouter)

const start = async () => {
    try{
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT,()=>console.log(`server started on port ${PORT}`))
    } catch(e) {
        console.log(e)
    }
}

start();