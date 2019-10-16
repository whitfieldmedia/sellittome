const express = require('express');
require("dotenv").config();
const path = require("path");
const port = process.env.PORT || 5800;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

app.use('/auth', require('./routes/auth'));
app.use('/vehicle', require('./routes/vehicleDatabase'));

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
