import apiJava from "../../../services/javaApi";

export const createAlert = (payload) => apiJava.post("/alerts", payload);

export const listAlerts = (params) => apiJava.get("/alerts", { params });
