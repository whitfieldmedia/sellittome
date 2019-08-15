const express = require('express');
const path = require("path");
const port = process.env.PORT || 5800;
const cors = require('cors');
const bodyParser = require('body-parser');
let nodemailer = require('nodemailer');
const morgan = require('morgan');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(cors());
app.use(morgan('dev'));

const myEmail = 'backmanspencer99@gmail.com';

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: myEmail,
        pass: 'flyfish69'
    }
})

app.post('/send', (req, res) => {
    let newFiles = req.body.files.map(file => {
        return (
            `<img src=${file} alt=${file} /> <br /> <br />`
        )
    })
    const message = {
        from: myEmail,
        to: 'backmanspencer99@gmail.com',
        subject: 'MR. CASH $$$$$',
        html: ` <h2>NAME:</h2> <p>${req.body.name}</p> <br/> <h2>REPLY TO:</h2> <p> ${req.body.from}</p> <br/> <h2>PHONE NUMBER:</h2> <p> ${req.body.phone}</p> <br/> <h2>DESCRIPTION:</h2> <p>${req.body.description}</p> <div> ${newFiles} </div> `,
    };
    transporter.sendMail(message, function(err) {
        if(err) { console.log('Unable to send message ' + err)}
        console.log('EMAIL SENT.\n' )
    })
    array = [];
})

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
