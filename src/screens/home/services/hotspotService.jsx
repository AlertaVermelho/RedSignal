import apiJava from "../../../services/javaApi";

export const listarHotspots = ({
  currentLat,
  currentLon,
  radiusKm = 10,
  zoomLevel = 15,
}) =>
  apiJava.get("/mapdata", {
    params: {
      currentLat,
      currentLon,
      radiusKm,
      zoomLevel,
    },
  });

export const criarHotspot = (dados) => apiJava.post("/alerts", dados);
