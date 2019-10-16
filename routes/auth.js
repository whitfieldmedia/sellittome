const express = require('express');
const User = require('../models/user');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://spencer:${process.env.MongoPassword}@sellittome-ghedz.mongodb.net/test?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

authRouter.post("/signup", (req, res) => {
    client.connect((err, db) => {
        if(err) { 
            res.status(500).send({ success: false, err }) 
            throw err;
        }
        console.log('connected to signup database')
        var dbo = db.db('sellittome')
        var user = dbo.collection('users').findOne({ username: req.body.username }, (err, existingUser) => {
            if(err) {
                res.status(500).send({ success: false, err })
                throw err;
            }
            if(existingUser !== null) {
                return res.status(400).send({ success: false, message: "Username already exists." })
            }
        })
        if(!user) {
            const newUser = new User(req.body);
            dbo.collection('users').insertOne(newUser, (err, user) => {
                if(err) {
                    res.status(500).send({ success: false, err })
                    throw err;
                }
                const token = jwt.sign(user, process.env.SECRET)
                return res.status(201).send({ success: true, user: user, token })
            })
        }
    })
    // User.findOne({ username: req.body.username }, (err, existingUser) => {
    //     if(err) return res.status(500).send({success: false, err});
    //     if (existingUser !== null) {
    //         return res.status(400).send({success: false, message: "Username already exists."})
    //     }
    //     const newUser = new User(req.body)
    //     newUser.save((err, user) => {
    //         if (err) return res.status(500).send({ success: false, err});
    //         const token = jwt.sign(user.toObject(), process.env.SECRET);
    //         return res.status(201).send({ success: true, user: user.toObject(), token })
    //     })
    // })
})

authRouter.post("/login", (req, res) => {
    client.connect((err, db) => {
        if(err) { 
            res.status(500).send({ success: false, err })
            throw err;
        }
        console.log("Connected to db")
        var dbo = db.db('sellittome')
        dbo.collection('users').findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
            if(err) { 
                res.status(500).send(err);
                throw err;
            }
            if(!user) {
                return res.status(401).send({ success: false, message: "Username not found." })
            }
            if(user.password === req.body.password) {
                const token = jwt.sign(user, process.env.SECRET, { expiresIn: "24h" });
                return res.send({ token: token, user: user, success: true, message: "Here's your token!" })
            }
            user.methods.comparePassword(req.body.password, (err, match) => {
                if(err) throw err;
                if(!match) res.status(401).send({ success: false, message: "You entered a incorrect password." })
                const token = jwt.sign(user.toObject(), process.env.SECRET, { expiresIn: "24h" });
                return res.send({ token: token, user: user.withoutPassword(), success: true, message: "Here's your token!" })
            })
        })
    })
})

module.exports = authRouter;