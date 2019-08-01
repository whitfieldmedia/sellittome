const express = require('express');
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const cors = require('cors');
// const upload = require('./routes/upload');

app.post('/send', function(req, res, next) {
    const transporter = nodemailer.createTransport({
        service: 'godaddy',
        auth: {
            user: 'spencer@wemakeads.com',
            pass: 'gintonic24'
        }
    })
    const mailOptions = {
        from: `${req.body.email}`,
        to: 'backmanspencer99@gmail.com',
        subject: `${req.body.name}`,
        text: `${req.body.message}`,
        replyTo: `${req.body.email}`
    }
    transporter.sendMail(mailOptions, function(err, res) {
        if (err) { console.log(err) }
        else { console.log('here is the res: ', res) 
        }
    })
})

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));


// app.post('/upload', upload);

app.use(express.json());

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
