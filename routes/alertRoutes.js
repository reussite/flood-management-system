const express = require("express");
const router = express.Router();
const dataService = require("../services/dataService");

// Obtenir toutes les alertes
router.get("/", (req, res) => {
  const data = dataService.readData();
  res.json(data.alerts);
});

// Créer une nouvelle alerte
router.post("/", (req, res) => {
  const data = dataService.readData();
  const newAlert = req.body;
  newAlert.id = data.alerts.length + 1;
  data.alerts.push(newAlert);
  dataService.writeData(data);
  res.status(201).json(newAlert);
});

module.exports = router;
