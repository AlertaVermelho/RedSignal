import apiJava from "../../../services/javaApi";

export const listarHotspots = ({ currentLat, currentLon, radiusKm = 10 }) =>
  apiJava.get("/mapdata", {
    params: {
      currentLat,
      currentLon,
      radiusKm,
    },
  });

export const criarHotspot = (dados) => apiJava.post("/alerts", dados);
