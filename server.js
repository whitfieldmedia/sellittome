const express = require('express');
require("dotenv").config();
const path = require("path");
const port = process.env.PORT || 5800;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const nodemailer = require('nodemailer');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

var transporter = nodemailer.createTransport({
    server: 'smtp.office365.com',
    host: 'smtp.office365.com',
    port: 587,
    requireTLS: true,
    auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD
    }
})

app.use('/send', (req, res) => {
    var newFiles = req.body.files.map(file => {
        return (
            `<img src=${file} alt=${file} />`
        )
    })
    var message = {
        from: process.env.USERNAME,
        to: process.env.USERNAME,
        subject: 'Sell it to me',
        html: `<h2> Vehicle: </h2> <p> ${req.body.year} ${req.body.make} ${req.body.model} ${req.body.style} </p> 
        <p> VIN: ${req.body.vin} </p>
        <p> UVC: ${req.body.uvc} </p>
        <h2> Price range Customer Received </h2> 
        <h2> Low Price: </h2> <p> $${req.body.lowPrice} </p>
        <h2> High Price: </h2> <p> $${req.body.highPrice} </p>
        <h2> MILES: </h2> <p> ${req.body.miles} </p>
        <h2> Condition: </h2> <p>${req.body.condition}</p> 
        <br /> <h1> Customer Info </h1>
        <h2> Customer Name:</h2> <p>${req.body.name}</p> 
        <h2> ${req.body.name} email address:</h2> <p> ${req.body.from}</p> 
        <h2> PHONE NUMBER: </h2> <p> ${req.body.phone}</p> <br />
        <h2> Zip Code: </h2> <p> ${req.body.zip} </p>
        <div> ${newFiles} </div> `,
    };
    var message2 = {
        from: process.env.USERNAME,
        to: req.body.from,
        subject: "Sell It To Me",
        html: ` <h2> Thank you ${req.body.name} for using sellittome.com. </h2>
        <p> We are happy to be doing business with you. Your estimated vehicle value is $${req.body.lowPrice} - $${req.body.highPrice}. We will get back with you shortly with the actual offer for your ${req.body.year} ${req.body.make} ${req.body.model} ${req.body.style}. </p>`
    }
    transporter.sendMail(message, function(err) {
        if(err) { console.log('Unable to send message 1 ' + err)}
        console.log('EMAIL SENT.\n')
    })
    transporter.sendMail(message2, function(err) {
        if(err) { console.log('Unable to send message 2 ' + err)}
        console.log('EMAIL2 SENT.\n')
    })
})

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
