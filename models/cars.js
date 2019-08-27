const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
    year: {
        type: String,
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
    trim: {
        type: String, 
        required: true
    },
    condition: {
        type: String, 
        required: true
    },
    zip: {
        type: Number, 
        required: true
    },
    miles: {
        type: Number, 
        required: true
    }
})

module.exports = mongoose.model('Car', carSchema);