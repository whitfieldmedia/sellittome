const express = require('express');
require("dotenv").config();
const path = require("path");
const port = 5800;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const secret = process.env.SECRET || "secret key";
const expressJwt = require("express-jwt");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

app.use('/profile', expressJwt({ secret: secret }));

app.use('/profile', require('./routes/profile'));
app.use('/auth', require('./routes/auth'));
app.use('/vehicle', require('./routes/vehicleDatabase'));

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
