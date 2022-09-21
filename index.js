const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require("mongoose");
const connectDB = require('./config/db')
const logger = require("morgan");
const passport = require('passport');
const session = require('express-session');
const MongoStore = require("connect-mongo");

const mainRoutes = require('./routes/main');
const authRoutes = require('./routes/auth');
const postRoutes = require("./routes/posts");

// use .env file in config folder
dotenv.config({path: './config/.env'});

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

// Session middleware
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}),
    })
  ) 

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


//Static Folder
app.use(express.static("public"));

//Logging
app.use(logger("dev"));

app.use('/', mainRoutes)
app.use('/auth', authRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}!`)
})
