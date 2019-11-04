const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/getMakes', (req, res) => {
    console.log(req.params.year)
    request(`https://service.blackbookcloud.com/UsedCarWs/UsedCarWs/Drilldown/ALL/${req.params.year}?drilldeep=true&getclass=false&customerid=getMakes`, function( error, response, body) {
        console.log('ERROR =' + error)
        console.log('RESPONSE =' + response)
        console.log("BODY" + body)
        res.send(response)
    })
})

module.exports = router;