const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vinSchema = new Schema({
    vin: {
        type: Number, 
        required: true
    },
    miles: {
        type: Number, 
        required: true
    },
    zip: {
        type: Number, 
        required: true
    },
})

module.exports = mongoose.model('Vin', vinSchema);