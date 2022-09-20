const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require("mongoose");
const connectDB = require('./config/db')
const logger = require("morgan");
const mainRoutes = require('./routes/main')

// use .env file in config folder
dotenv.config({path: './config/.env'});

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Logging
app.use(logger("dev"));

app.use('/', mainRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}!`)
})
