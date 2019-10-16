const express = require('express');
const vehicleRouter = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://spencer:${process.env.MongoPassword}@sellittome-ghedz.mongodb.net/test?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const nodemailer = require('nodemailer');

vehicleRouter.get('/', (req, res) => {
    return client.connect((err, db) => {
        if(err) {
            res.status(500).send(err);
            throw err;
        }         
        console.log('connected to db')
        var dbo = db.db('sellittome');
        dbo.collection('vehicles').find({}).toArray((err, result) => {
            if(err) {
                res.status(500).send(err)
                throw err;
            }
            console.log('connected to collection', result)
            return res.status(200).send(result);
        })
    })
})

vehicleRouter.get("/:id", (req, res) => {
    return client.connect((err, db) => {
        if(err) {
            res.status(500).send(err);
            throw err;
        }        
        console.log('connected to db')
        var dbo = db.db('sellittome');
        dbo.collection('vehicles').findOne({_id: req.params.id}, (err, vehicle) => {
            if(err) {
                res.status(500).send(err)
                throw err;
            }
            if(!vehicle) return res.status(404).send("No Vehicle Found")
            return res.status(200).send(vehicle)
        })
    })
})

vehicleRouter.post('/', (req, res) => {
    client.connect((err, db) => {
        if(err) {
            res.status(500).send(err)
            throw err;
        }
        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            post: 587,
            sendMail: true,
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
            }
        })
        var newFiles = req.body.files.map(file => {
            return (
                `<img src=${file} alt=${file} />`
            )
        })
        const message = {
            from: 'Mr. Cash <mrcash@sellittome.com>',
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
        const message2 = {
            from: 'Mr. Cash <mrcash@sellittome.com',
            to: req.body.from,
            subject: "Thank you for using sellittome.com",
            html: ` <h2> Thank you ${req.body.name} for using sellittome.com. </h2>
            <p> We are happy to be doing business with you. Your estimated vehicle value is $${req.body.lowPrice} - $${req.body.highPrice}. We will get back with you shortly with the final offer for your ${req.body.year} ${req.body.make} ${req.body.model} ${req.body.style}. </p>
            <p> We will need your vin number and various information about your vehicle to give you a cash offer. </p>
            <p> If you didn't upload pictures please send pictures of your vehicle to mrcash@sellittome.com. So we can give you the best offer possible. </p>
            <p> All offers are dependent upon an in person inspection of the vehicle. </p>`
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
        transporter.close();
        var dbo = db.db('sellittome')
        var newVehicle = req.body
        console.log(newVehicle);
        dbo.collection('vehicles').insertOne(newVehicle, (err, res) => {
            if(err) {
                res.status(500).send(err)
                throw err;
            }
            console.log('Vehicle Inserted')
            db.close()
        })
    })
})

vehicleRouter.delete('/:id', (req, res) => {
    return client.connect((err, db) => {
        if(err) {
            res.status(500).send(err)
            throw err;
        }
        console.log('connected to db')
        var dbo = db.db('sellittome');
        dbo.collection('vehicles').findOneAndRemove({_id: req.params.id}, (err, deletedVehicle) => {
            if(err) {
                res.status(500).send(err)
                throw err;
            }
            return res.send({message: "vehicle has been successfully removed", deletedVehicle})
        })
    })
})

module.exports = vehicleRouter;