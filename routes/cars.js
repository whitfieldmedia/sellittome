const express = require('express');
const carRouter = express.Router();
const Cars = require('../models/cars');

carRouter.get('/', (req, res) => {
    Cars.find((err, cars) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(cars);
    })
})

carRouter.post('/', (req, res) => {
    const newCar = new Cars(req.body);
    newCar.save((err, newCar) => {
        if (err) return res.status(500).send(err);
        return res.status(201).send(newCar);
    })
})

carRouter.get('/:id', (req, res) => {
    Cars.findOne({ _id: req.params.id }, (err, car) => {
        if (err) return res.status(500).send(err)
        if (!car) return res.status(404).send("No Car found.");
        return res.status(201).send(car);
    })
})

carRouter.delete('/:id', (req, res) => {
    Cars.findOneAndRemove(
        {_id: req.params.id}, (err, deletedCar) => {
            if (err) return res.status(500).send(err);
            return res.send({message: "car has been succesfully deleted", deletedCar})
        }
    )
})

module.exports = carRouter