const express = require("express");
const router = express.Router();
const dataService = require("../services/dataService");

// Obtenir toutes les prévisions météo
router.get("/", (req, res) => {
  const data = dataService.readData();
  res.json(data.weatherForecasts);
});

// Ajouter une nouvelle prévision météo
router.post("/", (req, res) => {
  const data = dataService.readData();
  const newForecast = req.body;
  newForecast.id = data.weatherForecasts.length + 1;
  data.weatherForecasts.push(newForecast);
  dataService.writeData(data);
  res.status(201).json(newForecast);
});

module.exports = router;
