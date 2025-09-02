// api/stats.js
import { getStatistics } from "weathercloud-js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Metodo non consentito" });

  try {
    const stationId = process.env.STATION_ID;
    if (!stationId) return res.status(500).json({ error: "STATION_ID mancante" });

    const stats = await getStatistics(stationId);

    // Cache più lunga (15 minuti)
    res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=120");

    return res.status(200).json({ ok: true, stationId, stats });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err?.message || err) });
  }
}
