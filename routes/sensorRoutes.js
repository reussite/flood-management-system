const express = require("express");
const router = express.Router();
const dataService = require("../services/dataService");

// Obtenir toutes les données des capteurs
router.get("/", (req, res) => {
  const data = dataService.readData();
  res.json(data.sensors);
});

// Ajouter un nouveau capteur
router.post("/", (req, res) => {
  const data = dataService.readData();
  const newSensor = req.body;
  newSensor.id = data.sensors.length + 1;
  data.sensors.push(newSensor);
  dataService.writeData(data);
  res.status(201).json(newSensor);
});

module.exports = router;
