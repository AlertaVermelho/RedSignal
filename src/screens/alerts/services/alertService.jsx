import apiJava from "../../../services/javaApi";

export const createAlert = (alertData) => apiJava.post("/alerts", alertData);

export const listAlerts = (params) => apiJava.get("/alerts", { params });
