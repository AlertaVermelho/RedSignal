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

export default function HomeScreen() {
  const [hotspots, setHotspots] = useState([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      const fetchHotspots = async () => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            Alert.alert("Permissão negada", "A localização é necessária.");
            return;
          }

          const loc = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = loc.coords;

          const response = await listarHotspots({
            currentLat: latitude,
            currentLon: longitude,
            radiusKm: 5,
          });

          if (isMounted) {
            const dados = Array.isArray(response.data?.hotspots)
              ? response.data.hotspots
              : [];
            setHotspots(dados);

            mapRef.current?.animateToRegion({
              latitude,
              longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            });
          }
        } catch (error) {
          console.error("Erro ao buscar hotspots:", error);
          if (isMounted) {
            Alert.alert("Erro", "Não foi possível carregar os hotspots.");
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };

      fetchHotspots();

      return () => {
        isMounted = false;
      };
    }, [])
  );

  return (
    <View className="flex-1">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#00aa00" />
          <Text className="mt-4 text-gray-500">Carregando mapa...</Text>
        </View>
      ) : (
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: -23.55,
            longitude: -46.63,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {hotspots.map((hotspot) => (
            <Marker
              key={hotspot.hotspotId}
              coordinate={{
                latitude: hotspot.centroidLat,
                longitude: hotspot.centroidLon,
              }}
              title={hotspot.dominantType}
              description={hotspot.publicSummary}
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
