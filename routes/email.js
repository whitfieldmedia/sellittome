const express = require('express');
const emailRouter = express.Router();
const Email = require('../models/email');
const nodemailer = require('nodemailer');
require("dotenv").config();

let transporter = nodemailer.createTransport({
    service: 'Godaddy',
    host: 'smtpout.secureserver.net',
    secure: true,
    port: 465,
    auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD
    }
})

emailRouter.post('/', (req, res) => {
    let newFiles = req.body.files.map(file => {
        return (
            `<img src=${file} alt=${file} /> <br /> <br />`
        )
    })
    const message = {
        from: 'mrcash@sellittome.com',
        to: 'mrcash@sellittome.com',
        subject: 'MR. CASH $$$$$',
        html: `<h2> Vehicle: </h2> <p> ${req.body.year} ${req.body.make} ${req.body.model} ${req.body.series} ${req.body.style} </p> 
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
    const message2 = {
        from: 'mrcash@sellittome.com',
        to: req.body.from,
        subject: "Sell It To Me",
        html: ` <h2> Thank you ${req.body.name} for using sellittome.com. </h2>
        <p> We are happy to be doing business with you. Your estimated vehicle value is $${req.body.lowPrice} - $${req.body.highPrice}. We will get back with you shortly with the actual offer for your ${req.body.year} ${req.body.make} ${req.body.model} ${req.body.series} ${req.body.style}. </p>`
    }
    const newEmail = new Email(req.body);
    newEmail.save((err, newEmail) => {
        if (err) return res.status(500).send(err);
        transporter.sendMail(message, function(err) {
            if(err) { console.log('Unable to send message ' + err)}
            console.log('EMAIL SENT.\n' )
        })
        transporter.sendMail(message2, function(err) {
            if(err) { console.log('Unable to send MESSAGE2 ' + err)}
            console.log("EMAIL 2 SENT!!!!!\n")
        })
        return res.status(201).send(newEmail);
    })

})

module.exports = emailRouter;