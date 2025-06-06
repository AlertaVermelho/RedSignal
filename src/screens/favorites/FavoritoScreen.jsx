import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";

export default function FavoritosScreen() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const loadFavoritos = async () => {
      try {
        const data = await AsyncStorage.getItem("locaisFavoritos");
        if (data) {
          setFavoritos(JSON.parse(data));
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os favoritos.");
      }
    };
    loadFavoritos();
  }, []);

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-4">Locais Favoritos</Text>
      <FlatList
        data={favoritos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="mb-4 border p-3 rounded">
            <Text className="font-semibold">{item.nome || "Local salvo"}</Text>
            <Text className="text-gray-500 text-sm">
              Latitude: {item.latitude}, Longitude: {item.longitude}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-gray-500 text-center mt-6">
            Nenhum local salvo ainda.
          </Text>
        }
      />
    </View>
  );
}
