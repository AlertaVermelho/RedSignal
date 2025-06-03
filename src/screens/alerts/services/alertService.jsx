import apiJava from "./apiJava";

export const createAlert = (alertData) => apiJava.post("/alerts", alertData);

export const listAlerts = (params) => apiJava.get("/alerts", { params });
