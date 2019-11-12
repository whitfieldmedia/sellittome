const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new Schema ({
    lowPrice: String,
    highPrice: String,
    name: String,
    from: String,
    phone: String,
    year: String,
    make: String,
    model: String,
    style: String,
    uvc: String,
    vin: String,
    zip: String,
    condition: String,
    miles: String,
    files: Array
})

module.exports = mongoose.model("Vehicles", vehicleSchema)