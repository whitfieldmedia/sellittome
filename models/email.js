const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    from: {
        type: String, 
        required: true
    },
    phone: {
        type: String, 
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    series: {
        type: String,
        required: false
    },
    style: {
        type: String, 
        required: false
    },
    vin: {
        type: String,
        required: true
    },
    uvc: {
        type: String, 
        required: false
    },
    files: {
        type: Array, 
        required: false
    },
    miles: {
        type: String, 
        required: true
    },
    condition: {
        type: String, 
        required: false
    },
    lowPrice: {
        type: String,
        required: false
    },
    highPrice: {
        type: String,
        required: false
    },
    zip: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Email', emailSchema);