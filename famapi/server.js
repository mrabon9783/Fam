'use strict';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const pug = require('pug');
//const express = require('express');
//const MongoClient = require('mongodb').MongoClient;

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
// Constants
const port = 8001;
const HOST = '0.0.0.0';
var isProduction = true;
//app.use(bodyParser.urlencoded({ extended: true }));

//Configure our app
app.use(cors());
//app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));



if(!isProduction) {
  app.use(errorHandler());
}


var dburl = db.url;

var ddebug = false;


if(ddebug==true){
  dburl = "mongodb://localhost:27018";
}

//Configure Mongoose
mongoose.connect(dburl + '/passport-tutorial');
mongoose.set('debug', true);

//db = database.db("note-api")
//MongoClient.connect(dburl);

//Models & routes
require('./app/models/Users');
require('./app/models/Notes');
require('./app/config/passport');

//pp.use(passport.session());
app.set('view engine', 'pug');
app.use(require('./app/routes'));


//Error handlers & middlewares



if(!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});


app.listen(port, HOST);
console.log(`Running on http://${HOST}:${port}`);