import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import { listAlerts } from "../alerts/services/alertService";
import { listarHotspots } from "./services/hotspotService";

export default function HomeScreen() {
  const [hotspots, setHotspots] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
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
            zoomLevel: 40,
          }),
          listAlerts(),
        ]);

        console.log("🔥 Hotspots recebidos:", hotspotsRes.data?.hotspots);
        console.log("🟢 Alertas recebidos:", alertsRes.data);

        setHotspots(
          Array.isArray(hotspotsRes.data?.hotspots)
            ? hotspotsRes.data.hotspots
            : []
        );
        setAlerts(
          Array.isArray(alertsRes.data?.content) ? alertsRes.data.content : []
        );

        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };
        setRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        Alert.alert("Erro", "Não foi possível carregar o mapa.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function calcularOffsetCircular(index, total, distancia = 0.0001) {
    const angulo = (2 * Math.PI * index) / total;
    return {
      offsetLat: Math.sin(angulo) * distancia,
      offsetLon: Math.cos(angulo) * distancia,
    };
  }

  return (
    <View className="flex-1">
      {loading || !region ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#00aa00" />
          <Text className="mt-4 text-gray-500">Carregando mapa...</Text>
        </View>
      ) : (
        <MapView ref={mapRef} style={{ flex: 1 }} region={region}>
          {/* Hotspots com círculos vermelhos */}
          {hotspots.map((hotspot) => {
            const lat = parseFloat(hotspot.centroidLat);
            const lon = parseFloat(hotspot.centroidLon);
            return (
              <React.Fragment key={`hotspot-${hotspot.hotspotId}`}>
                <Marker
                  coordinate={{ latitude: lat, longitude: lon }}
                  title={`[HOTSPOT] ${hotspot.dominantType}`}
                  description={hotspot.publicSummary}
                  pinColor="red"
                />
                {/* Círculo interno (mais escuro) */}
                <Circle
                  center={{ latitude: lat, longitude: lon }}
                  radius={300}
                  strokeWidth={2}
                  strokeColor="rgba(255,0,0,1)"
                  fillColor="rgba(255,0,0,0.5)"
                />
                {/* Círculo externo (mais translúcido) */}
                <Circle
                  center={{ latitude: lat, longitude: lon }}
                  radius={800}
                  strokeWidth={2}
                  strokeColor="rgba(255,0,0,0.7)"
                  fillColor="rgba(255,0,0,0.15)"
                />
              </React.Fragment>
            );
          })}

          {/* Alertas com ícones coloridos */}
          {alerts.map((alerta, index) => {
            const { offsetLat, offsetLon } = calcularOffsetCircular(
              index,
              alerts.length
            );

            return (
              <Marker
                key={`alert-${alerta.alertId}`}
                coordinate={{
                  latitude: alerta.latitude + offsetLat,
                  longitude: alerta.longitude + offsetLon,
                }}
                title={`[Alerta] ${alerta.tipoIA || "Manual"}`}
                description={alerta.descricaoTexto}
                pinColor={
                  alerta.statusAlerta === "PROCESSADO_CLUSTER_COM_HOTSPOT"
                    ? "red"
                    : alerta.severidadeIA === "ALTA"
                    ? "orange"
                    : alerta.severidadeIA === "MEDIA"
                    ? "yellow"
                    : "green"
                }
              />
            );
          })}
        </MapView>
      )}

      {/* Legenda */}
      <View className="absolute top-6 left-4 bg-white rounded-md p-2 shadow-md z-10">
        <Text className="font-bold text-black mb-1">Legenda:</Text>
        <Text className="text-green-600">🟢 Alerta leve</Text>
        <Text className="text-yellow-600">🟡 Alerta médio</Text>
        <Text className="text-orange-600">🟠 Alerta grave</Text>
        <Text className="text-red-600">🔴 Hotspot</Text>
      </View>

      {/* Botão Criar Alerta */}
      <TouchableOpacity
        onPress={() => navigation.navigate("CriarAlerta")}
        className="absolute bottom-6 right-6 bg-green-600 p-4 rounded-full shadow-lg"
      >
        <Ionicons name="add" size={28} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}
