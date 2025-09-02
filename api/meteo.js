// api/meteo.js
import { getWeather } from "weathercloud-js";

export default async function handler(req, res) {
  const stationId = "2772110721"; // 👈 il tuo ID stazione
  try {
    const data = await getWeather(stationId);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Errore nel recupero dati", details: err.message });
  }
}
