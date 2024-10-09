const express = require("express");
const router = express.Router();
const dataService = require("../services/dataService");

// Obtenir toutes les localités de façon aléatoire
router.get("/", (req, res) => {
  const data = dataService.readData();
  const shuffledLocalities = dataService.shuffleArray(data.localities); // Mélanger les localités
  res.json(shuffledLocalities); // Retourner les localités mélangées
});

router.get("/alerts/critical", (req, res) => {
  const data = dataService.readData();
  const { threshold = 1.3 } = req.query; // Seuil par défaut de 1.3 ou fourni via les paramètres de requête

  // Filtrer les localités qui ont des capteurs avec des valeurs au-dessus du seuil
  const criticalLocalities = data.localities
    .map((locality) => {
      // Filtrer les capteurs dépassant le seuil dans chaque localité
      const criticalSensors = locality.sensors.filter(
        (sensor) => sensor.value > Number(threshold)
      );

      // Retourner la localité avec ses capteurs critiques (si elle en a)
      if (criticalSensors.length > 0) {
        return {
          id: locality.id,
          name: locality.name,
          criticalSensors,
        };
      }
    })
    .filter((locality) => locality); // Supprimer les localités sans capteurs critiques

  // Si aucune localité n'a de capteurs critiques
  if (criticalLocalities.length === 0) {
    return res
      .status(200)
      .json({ message: "Aucune localité n'a de capteurs dépassant le seuil." });
  }

  // Retourner les localités avec les capteurs critiques
  res.json(criticalLocalities);
});

router.get("/random-data", (req, res) => {
  let data = dataService.readData();

  // Mettre à jour les données avec des valeurs aléatoires
  data = dataService.updateDataWithRandomValues(data);

  res.json(data.localities.find((locality) => locality.name === "Cotonou")); // Retourne les données de Cotonou
});

// Ajouter une nouvelle localité
//router.post('/', (req, res) => {
//  const data = dataService.readData();
//  const newLocality = req.body;
//  newLocality.id = data.localities.length + 1;
//  data.localities.push(newLocality);
//  dataService.writeData(data);
//  res.status(201).json(newLocality);
//});//

module.exports = router;
