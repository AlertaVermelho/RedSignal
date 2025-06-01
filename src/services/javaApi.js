import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const javaApi = axios.create({
  baseURL: "http://localhost:8080", // Altere para sua URL real
});

javaApi.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("jwtToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (email, senha) =>
  javaApi.post("/auth/login", { email, senha });

export const register = (nome, email, senha) =>
  javaApi.post("/auth/register", { nome, email, senha });

export const getProfile = () => javaApi.get("/users/me");

export const updateProfile = (data) => javaApi.put("/users/me", data);

export const updateNotificationToken = (notificationToken) =>
  javaApi.put("/users/me/notification-token", { notificationToken });

// Alertas
export const createAlert = (alert) => javaApi.post("/alerts", alert);

export const getMapData = (lat, lon, radiusKm) =>
  javaApi.get("/mapdata", {
    params: { currentLat: lat, currentLon: lon, radiusKm },
  });

export default javaApi;
