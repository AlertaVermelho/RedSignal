import apiJava from "../services/javaApi";

export const listarHotspots = () => apiJava.get("/alerts");

export const criarHotspot = (dados) => apiJava.post("/alerts", dados);
