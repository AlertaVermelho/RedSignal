import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Button from "../components/Button";
import { listarHotspots } from "./hotspotService";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [hotspots, setHotspots] = useState([]);

  useEffect(() => {
    const carregarHotspots = async () => {
      try {
        const response = await listarHotspots();
        const dados = response.data?.content || [];
        setHotspots(dados);
      } catch (error) {
        console.error("Erro ao buscar hotspots:", error);
        Alert.alert("Erro", "Não foi possível carregar os alertas do mapa.");
      }
    };

    carregarHotspots();
  }, []);

  return (
    <View className="flex-1">
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: -23.559616,
          longitude: -46.652201,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {hotspots.map((item) => (
          <Marker
            key={item.alertId}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            title={item.tipoIA}
            description={item.descricaoTexto}
          />
        ))}
      </MapView>

      <View className="absolute bottom-6 left-0 right-0 px-4 space-y-3">
        <Button
          text="Criar novo alerta"
          onPress={() => navigation.navigate("CriarAlerta")}
          icon="add-circle-outline"
          type="Primary"
          fullWidth
        />
        <Button
          text="Histórico de alertas"
          onPress={() => navigation.navigate("HistoricoAlertas")}
          icon="time-outline"
          type="Secondary"
          fullWidth
        />
        <Button
          text="Locais Favoritos"
          onPress={() => navigation.navigate("Favoritos")}
          icon="heart-outline"
          type="Secondary"
          fullWidth
        />
      </View>
    </View>
  );
}
