import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const csharpApi = axios.create({
  baseURL: "http://localhost:5001", // Altere para sua URL real
});

csharpApi.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("jwtToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Locais Monitorados
export const createLocation = (userId, location) =>
  csharpApi.post(`/api/v1/users/${userId}/monitored-locations`, location);

export const listLocations = (userId) =>
  csharpApi.get(`/api/v1/users/${userId}/monitored-locations`);

export const updateLocation = (userId, locationId, data) =>
  csharpApi.put(
    `/api/v1/users/${userId}/monitored-locations/${locationId}`,
    data
  );

export const deleteLocation = (userId, locationId) =>
  csharpApi.delete(`/api/v1/users/${userId}/monitored-locations/${locationId}`);

export default csharpApi;
