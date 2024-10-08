// services/floodRiskService.js

const updateFloodRisk = (localities) => {
  localities.forEach((locality) => {
    locality.waterLevel = (Math.random() * 2).toFixed(2); // Génère un niveau d'eau aléatoire
    locality.floodRisk =
      locality.waterLevel > 1.5
        ? "high"
        : locality.waterLevel > 1
        ? "medium"
        : "low";

    // Mise à jour des capteurs
    locality.sensors.forEach((sensor) => {
      if (sensor.type === "water_level") {
        sensor.value = locality.waterLevel; // Mise à jour du niveau d'eau
      } else if (sensor.type === "humidity") {
        sensor.value = Math.random() * 100; // Génération de l'humidité aléatoire
      }
      sensor.timestamp = new Date().toISOString(); // Mise à jour du timestamp
    });

    // Mise à jour de la prévision météo
    locality.weatherForecast.temperature = (
      Math.random() * (35 - 25) +
      25
    ).toFixed(1);
    locality.weatherForecast.precipitation = (Math.random() * 50).toFixed(1);
    locality.weatherForecast.timestamp = new Date().toISOString();
  });
  return localities;
};

module.exports = { updateFloodRisk };
