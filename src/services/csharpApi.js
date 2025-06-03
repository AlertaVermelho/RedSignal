import { API_CSHARP_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const apiCSharp = axios.create({
  baseURL: API_CSHARP_URL,
});

apiCSharp.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Listar locais monitorados de um usuário
export const getMonitoredLocations = (userId) =>
  apiCSharp.get(`/api/v1/users/${userId}/monitored-locations`);

// Cadastrar novo local monitorado
export const createMonitoredLocation = (userId, locationData) =>
  apiCSharp.post(`/api/v1/users/${userId}/monitored-locations`, locationData);

// Obter detalhes de um local monitorado específico
export const getMonitoredLocationById = (userId, locationId) =>
  apiCSharp.get(`/api/v1/users/${userId}/monitored-locations/${locationId}`);

// Atualizar local monitorado
export const updateMonitoredLocation = (userId, locationId, locationData) =>
  apiCSharp.put(
    `/api/v1/users/${userId}/monitored-locations/${locationId}`,
    locationData
  );

// Deletar local monitorado
export const deleteMonitoredLocation = (userId, locationId) =>
  apiCSharp.delete(`/api/v1/users/${userId}/monitored-locations/${locationId}`);

export default apiCSharp;
