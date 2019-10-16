const nodemailer = require('nodemailer');

module.exports = function(app, dbs) {

    app.get('/vehicles', (req, res) => {
        dbs.database.collection('vehicles').find({}).toArray((err, res) => {
            if(err) {
                console.log(err)
                return res.error(err)
            }
            return res.status(200).send(res);
        })
    })

}