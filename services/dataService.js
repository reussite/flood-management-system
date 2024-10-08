const fs = require("fs");
const path = require("path");

// Chemin vers le fichier JSON
const dataPath = path.join(__dirname, "../models/data.json");

const readData = () => {
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
};

const generateRandomValue = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(2); // Garder 2 décimales
};

// Mettre à jour les données avec des valeurs aléatoires pour les capteurs et la météo
const updateDataWithRandomValues = (data) => {
  data.localities.forEach((locality) => {
    // Mise à jour des capteurs
    locality.sensors.forEach((sensor) => {
      sensor.value = generateRandomValue(0.5, 2.0); // Exemple de bornes pour le niveau d'eau
      sensor.timestamp = new Date().toISOString(); // Met à jour l'horodatage
    });

    // Mise à jour des prévisions météo
    locality.weatherForecasts.forEach((weather) => {
      weather.temperature = generateRandomValue(25.0, 35.0); // Températures entre 25 et 35°C
      weather.timestamp = new Date().toISOString(); // Met à jour l'horodatage
    });
  });

  return data;
};

module.exports = {
  readData,
  writeData,
  updateDataWithRandomValues,
};
