const dataService = require("./dataService");

let counter = 0;
const maxUpdates = 10; // Limite du nombre de mises à jour

const updateData = () => {
  if (counter >= maxUpdates) return; // Si la limite est atteinte, arrêter les mises à jour

  let data = dataService.readData();

  data.localities.forEach((locality) => {
    locality.waterLevel = (Math.random() * 2).toFixed(2); // Générer une nouvelle valeur aléatoire
    locality.floodRisk =
      locality.waterLevel > 1.5
        ? "high"
        : locality.waterLevel > 1
        ? "medium"
        : "low";
  });

  data.weatherForecasts.forEach((weather) => {
    weather.temperature = (Math.random() * (35 - 25) + 25).toFixed(1); // Température entre 25 et 35 degrés
  });

  dataService.writeData(data);
  counter++;
  console.log(`Données mises à jour (${counter}/${maxUpdates})`);
};

// Appeler la fonction updateData toutes les 60 secondes
setInterval(updateData, 60000); // 60 000 ms = 1 min

module.exports = {
  updateData,
};
