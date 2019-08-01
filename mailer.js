const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: 'godaddy',
    host: process.env.host,
    port: process.env.port,
    secure: true,
    auth: {
        user: process.env.username,
        pass: process.env.password
    }
})

var message = {
    from: 'spencer@wemakeads.com',
    to: 'backmanspencer99@gmail.com',
    subject: 'Hello World',
    text: 'Plain Message'
}

transporter.sendMail(message, function (error, info) {
    if(error) {
        console.log(error);

    } else {
        console.log('Email Sent: ' + info.response)
    }
})




// var path = require("path");
// var templatesDir = path.resolve(__dirname, "views/mailer");

// const mailjet = require("node-mailjet").connect(
//     process.env.MJ_APIKEY_PUBLIC,
//     process.env.MJ_APIKEY_PRIVATE
// )

// const sendEmail = (messageInfo, text, html) => {
//     return mailjet.post("send", {version: "v3.1"}).request({
//         Messages: [
//             {
//                 From: { Email: messageInfo.replyTo, Name: messageInfo.name },
//                 To: { Email: 'spencer@wemakeads.com' },
//                 Subject: messageInfo.subject,
//                 Attachments: messageInfo.attachments,
//                 TextPart: text,
//                 HTMLPart: html
//             }
//         ]
//     })
// }

// exports.sendOne = function(messageInfo, locals) {
//     const email = new Email({
//         views: { root: templatesDir, options: { extendsion: "ejs" } }
//     });

//     return Promise.all([
//         email.render(`/html`, locals),
//         email.render(`/text`, locals)
//     ])
//     .then(([html, text]) => {
//         return sendEmail(messageInfo, text, html);
//     })
//     .catch(console.error)
// }










// const mailjet = require("node-mailjet")
// .connect('39323e173c73a872134cbf085865a10b', '6f398cd2316b2e38f655766421b6796d');

// const request = mailjet
// .post("send", {'version': 'v3.1'})
// .request({
//     "Messages": [
//         {
//             "From": {
//                 "Email": "spencer@wemakeads.com",
//                 "Name": "Spencer"
//             },
//             "To": [
//                 {
//                     "Email": "spencer@wemakeads.com",
//                     "Name": "Spencer"
//                 }
//             ],
//             "Subject": "Greetings from Mailjet.",
//             "TextPart": "My first Mailjet email",
//             "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet/com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
//             "CustomID": "AppGettingStartedTest"
//         }
//     ]
// })
// request
//     .then((result) => {
//         console.log(result.body)
//     })
//     .catch(err => { console.log(err.statusCode) })