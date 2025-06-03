import { API_JAVA_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const apiJava = axios.create({
  baseURL: API_JAVA_URL,
});

apiJava.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const registerUser = (nome, email, senha) =>
  apiJava.post("/auth/register", { nome, email, senha });

export const login = (email, senha) =>
  apiJava.post("/auth/login", { email, senha });

export const getUserProfile = () => apiJava.get("/users/me");

export const updateNotificationToken = (notificationToken) =>
  apiJava.put("/users/me/notification-token", { notificationToken });

export const createAlert = (alertData) => apiJava.post("/alerts", alertData);

export const listAlerts = (params) => apiJava.get("/alerts", { params });

export default apiJava;
