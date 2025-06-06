import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { listarHotspots } from "./services/hotspotService";
import { listAlerts } from "../alerts/services/alertService";

export default function HomeScreen() {
  const [hotspots, setHotspots] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState(null);
  const mapRef = useRef(null);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      const fetchData = async () => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            Alert.alert("Permissão negada", "A localização é necessária.");
            return;
          }

          const loc = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
          });

          const { latitude, longitude } = loc.coords;

          const [hotspotsRes, alertsRes] = await Promise.all([
            listarHotspots({
              currentLat: latitude,
              currentLon: longitude,
              radiusKm: 50,
            }),
            listAlerts(),
          ]);

          console.log("🔥 Hotspots recebidos:", hotspotsRes.data?.hotspots);
          console.log("🟢 Alertas recebidos:", alertsRes.data);

          if (isMounted) {
            setHotspots(
              Array.isArray(hotspotsRes.data?.hotspots)
                ? hotspotsRes.data.hotspots
                : []
            );
            setAlerts(
              Array.isArray(alertsRes.data?.content)
                ? alertsRes.data.content
                : []
            );

            const newRegion = {
              latitude,
              longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            };
            setRegion(newRegion);
            mapRef.current?.animateToRegion(newRegion);
            console.log("🗺️ Região centralizada:", newRegion);
          }
        } catch (error) {
          console.error("Erro ao carregar dados:", error);
          if (isMounted) {
            Alert.alert("Erro", "Não foi possível carregar o mapa.");
          }
        } finally {
          if (isMounted) setLoading(false);
        }
      };

      fetchData();
      return () => {
        isMounted = false;
      };
    }, [])
  );

  return (
    <View className="flex-1">
      {loading || !region ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#00aa00" />
          <Text className="mt-4 text-gray-500">Carregando mapa...</Text>
        </View>
      ) : (
        <MapView ref={mapRef} style={{ flex: 1 }} region={region}>
          {hotspots.map((hotspot) => (
            <Marker
              key={`hotspot-${hotspot.hotspotId}`}
              coordinate={{
                latitude: parseFloat(hotspot.centroidLat),
                longitude: parseFloat(hotspot.centroidLon),
              }}
              pinColor="red"
              title={`[HOTSPOT] ${hotspot.dominantType}`}
              description={hotspot.publicSummary}
            />
          ))}

          {alerts.map((alerta) => (
            <Marker
              key={`alert-${alerta.alertId}`}
              coordinate={{
                latitude: alerta.latitude,
                longitude: alerta.longitude,
              }}
              title={`[Alerta] ${alerta.tipoIA || "Manual"}`}
              description={alerta.descricaoTexto}
              pinColor={
                alerta.statusAlerta === "PROCESSADO_CLUSTER_COM_HOTSPOT"
                  ? "orange"
                  : "green"
              }
            />
          ))}
        </MapView>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate("CriarAlerta")}
        className="absolute bottom-6 right-6 bg-green-600 p-4 rounded-full shadow-lg"
      >
        <Ionicons name="add" size={28} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}
