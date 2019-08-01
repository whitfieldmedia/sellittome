const IncomingForm = require('formidable').IncomingForm;
const nodemailer = require("nodemailer");

async function main() {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });

    let info = await transporter.sendMail({
        from: '"Spencer" <spencer@wemakeads.com>',
        to: "backmanspencer99@gmail.com",
        subject: 'Hello',
        text: "world",
        html: "<b>Hello world!</b>"
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s",
    nodemailer.getTestMessageUrl(info));
}
main().catch(console.error)

module.exports = function upload(req, res) {
    var form = new IncomingForm();
    form.on('file', (field, file) => {
        console.log(file.name)
    })
    form.on('end', () => {
        res.json();
    })
    form.parse(req);
}