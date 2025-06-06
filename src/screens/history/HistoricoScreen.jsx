import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";

export default function HistoricoScreen() {
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const loadHistorico = async () => {
      try {
        const data = await AsyncStorage.getItem("historicoAlertas");
        if (data) {
          setHistorico(JSON.parse(data));
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar o histórico.");
      }
    };
    loadHistorico();
  }, []);

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-4">Histórico de Alertas</Text>
      <FlatList
        data={historico}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="mb-4 border p-3 rounded">
            <Text className="font-semibold">{item.descricaoTexto}</Text>
            <Text className="text-gray-500 text-sm">
              Latitude: {item.latitude}, Longitude: {item.longitude}
            </Text>
            <Text className="text-gray-500 text-sm">
              {item.timestampCliente}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-gray-500 text-center mt-6">
            Nenhum alerta registrado ainda.
          </Text>
        }
      />
    </View>
  );
}
