// controllers/floodController.js
const { updateFloodRisk } = require("../services/floodRiskService");
const data = require("../data/localities.json"); // Charger le fichier JSON

// Récupérer les données et appliquer la logique de calcul
const getUpdatedLocalities = (req, res) => {
  const updatedData = updateFloodRisk(data.localities);
  res.json(updatedData); // Renvoie les données mises à jour au frontend
};

module.exports = { getUpdatedLocalities };
