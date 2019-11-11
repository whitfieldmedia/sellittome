const express = require('express');
const vehicleRouter = express.Router();
const nodemailer = require('nodemailer');
const Vehicle = require('../models/vehicles');

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    post: 587,
    sendMail: true,
    secure: false,
    auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD
    },
    dkim: {
        keys: [
            {
                domainName: 'sellittome.com',
                keySelector: 'selector1._domainkey',
                privateKey: 'selector1-sellittome-com._domainkey.netorg5537947.onmicrosoft.com'
            }, {
                domainName: 'sellittome.com',
                keySelector: 'selector2._domainkey',
                privateKey: 'selector2-sellittome-com._domainkey.netorg5537947.onmicrosoft.com'
            }
        ],
        cacheDir: false
    },
    tls: {
        rejectUnauthorized: false
    }
})

vehicleRouter.get('/', (req, res) => {
    Vehicle.find((err, vehicles) => {
        if(err) return res.status(500).send(err);
        return res.status(200).send(vehicles);
    })
})

vehicleRouter.get("/:id", (req, res) => {
    Vehicle.findOne({_id: req.params.id}, (err, vehicle) => {
        if(err) return res.status(500).send(err)
        if(!vehicle) return res.status(404).send("No vehicle found")
        return res.status(201).send(vehicle)
    })
})

vehicleRouter.post('/', (req, res) => {
    var newFiles = req.body.files.map(file => {
        return (
            `<img src=${file} alt=${file} />`
        )
    })
    const message = {
        from: 'mrcash@sellittome.com',
        to: 'mrcash@sellittome.com,trucksellr2007@gmail.com',
        subject: 'Sell it to me',
        html: `<h2> Vehicle: </h2> <p> ${req.body.year} ${req.body.make} ${req.body.model} ${req.body.style} </p> <p> VIN: ${req.body.vin} </p> <p> UVC: ${req.body.uvc} </p> <h2> Price range Customer Received </h2>  <h2> Low Price: </h2> <p> $${req.body.lowPrice} </p> <h2> High Price: </h2> <p> $${req.body.highPrice} </p> <h2> MILES: </h2> <p> ${req.body.miles} </p> <h2> Condition: </h2> <p>${req.body.condition}</p> <br /> <h1> Customer Info </h1> <h2> Customer Name:</h2> <p>${req.body.name}</p> <h2> ${req.body.name} email address:</h2> <p> ${req.body.from}</p> <h2> PHONE NUMBER: </h2> <p> ${req.body.phone}</p> <br /> <h2> Zip Code: </h2> <p> ${req.body.zip} </p> <div> ${newFiles} </div> `
    };
    const message2 = {
        from: 'mrcash@sellittome.com',
        to: `${req.body.from}`,
        subject: "Thank you for using sellittome.com",
        html: `<h2> Thank you ${req.body.name} for using sellittome.com. </h2> <p> We are happy to be doing business with you. Your estimated vehicle value is $${req.body.lowPrice} - $${req.body.highPrice}. We will get back with you shortly with the final offer for your ${req.body.year} ${req.body.make} ${req.body.model} ${req.body.style}. </p> <p> We will need your vin number and various information about your vehicle to give you a cash offer. </p> <p> If you didn't upload pictures please send pictures of your vehicle to mrcash@sellittome.com. So we can give you the best offer possible. </p> <p> All offers are dependent upon an in person inspection of the vehicle. </p>`
    }
    transporter.sendMail(message, (error, info) => {
        if(error) { 
            console.log('Unable to send message 1 ' + error); 
            res.status(400).send({success: false})
        } else {
            console.log('EMAIL SENT.\n' + info.response)
            res.status(200).send({success: true})
        }
    })
    transporter.sendMail(message2, (error, info) => {
        if(error) { 
            console.log('UNABLE TO SEND MESSAGE 2 ' + error); 
            res.status(200).send({success: true})
        } else {
            console.log('EMAIL2 SENT.\n' + info.response)
            res.status(200).send({success: true})
        }
    })
    var newVehicle = new Vehicle(req.body)
    newVehicle.save((err, newVehicle) => {
        if(err) return res.status(500).send(err)
        return res.status(201).send(newVehicle)
    })
})

module.exports = vehicleRouter;