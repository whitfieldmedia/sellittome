const express = require('express');
const carVinRouter = express.Router();
const CarVins = require('../models/vins');

carVinRouter.get('/', (req, res) => {
    CarVins.find((err, cars) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(cars);
    })
})

carVinRouter.post('/', (req, res) => {
    const newCar = new CarVins(req.body);
    newCar.save((err, newCar) => {
        if (err) return res.status(500).send(err);
        return res.status(201).send(newCar);
    })
})

carVinRouter.get('/:id', (req, res) => {
    CarVins.findOne({ _id: req.params.id }, (err, car) => {
        if (err) return res.status(500).send(err)
        if (!car) return res.status(404).send("No Car found.");
        return res.status(201).send(car);
    })
})

carVinRouter.delete('/:id', (req, res) => {
    CarVins.findOneAndRemove(
        {_id: req.params.id}, (err, deletedCar) => {
            if (err) return res.status(500).send(err);
            return res.send({message: "car has been succesfully deleted", deletedCar})
        }
    )
})

module.exports = carVinRouter;