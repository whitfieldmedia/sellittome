const express = require('express');
const router = express.Router();
let nodemailer = require('nodemailer');
const multer = require('multer');
const fs = require('fs');
let UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/` });
const crypto = require('crypto');

let myEmail = 'backmanspencer99@gmail.com';

let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: myEmail,
        pass: 'flyfish69'
    }
})

router.post('/email', upload.array('photos', 20), async (req, res) => {
    try {
        let images = [];
        let name = req.name;
        let subject = req.message;
        let replyTo = req.replyTo;
        let phone = req.phone;
        const storage = multer.diskStorage({
            destination: images,
            filename: function(req, file, callback) {
                crypto.pseudoRandomBytes(16, function(err, raw) {
                    if(err) {return callback(err)}
                    images.push(raw.toString('hex') + path.extname(file.originalname));
                })
            }
        })
        let message = {
            from: myEmail,
            to: 'spencer@wemakeads.com',
            subject: subject,
            text: `Reply To: ${replyTo}`,
            attachments: images
        }
        transport.sendMail(message, function(err) {
            if(err) {
                console.log('unable to send email '+ err);
            } 
            console.log("Email sent.\n")
        })
    } catch(err){
        console.log(err);
    }
})



// let message = {
//     from: myEmail,
//     to: 'spencer@wemakeads.com',
//     subject: 'Nodemailer Message',
//     text: 'This is a test'
// };

// transport.sendMail(message, function(err) {
//     if(err) {
//         console.log('Failed to send email.\n');
//         return
//     }
//     console.log("Email sent.\n")
// })

module.exports = router;