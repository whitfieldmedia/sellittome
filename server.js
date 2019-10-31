const express = require('express');
const app = express();
require("dotenv").config();
const path = require("path");
const port = process.env.PORT || 5800;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.static(path.join(__dirname, "client", "build", "index.html")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

app.use(cors());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use('/auth', require('./routes/auth'));
app.use('/vehicle', require('./routes/vehicleDatabase'));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err)  console.log(err)
    else {
        console.log(db)
        console.log('connected to db')
    }
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(port, () => console.log(`Listing on port ${port}`))
