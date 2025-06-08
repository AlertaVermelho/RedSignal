import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import EditModal from "../../components/EditModal";
import CustomModal from "../../components/Modal";

export default function FavoritosScreen() {
  const [favoritos, setFavoritos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [localTemp, setLocalTemp] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editNome, setEditNome] = useState("");

  useEffect(() => {
    loadFavoritos();
  }, []);

  const loadFavoritos = async () => {
    const data = await AsyncStorage.getItem("locaisFavoritos");
    if (data) setFavoritos(JSON.parse(data));
  };

  const salvarLocalAtual = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão negada", "Habilite a localização.");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocalTemp({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
    setModalVisible(true);
  };

  const excluirFavorito = async (index) => {
    const atualizados = [...favoritos];
    atualizados.splice(index, 1);
    await AsyncStorage.setItem("locaisFavoritos", JSON.stringify(atualizados));
    setFavoritos(atualizados);
  };

  const editarFavorito = (index) => {
    setEditIndex(index);
    setEditNome(favoritos[index].nome);
    setEditModalVisible(true);
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-4">Locais Favoritos</Text>

      <FlatList
        data={favoritos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View className="mb-4 border p-3 rounded bg-gray-100">
            <Text className="font-semibold text-blue-600">{item.nome}</Text>
            <Text className="text-gray-500 text-sm">
              Lat: {item.latitude.toFixed(4)} | Lon: {item.longitude.toFixed(4)}
            </Text>
            <View className="flex-row gap-4 mt-2">
              <TouchableOpacity
                onPress={() => editarFavorito(index)}
                className="bg-yellow-500 px-3 py-1 rounded"
              >
                <Text className="text-white">Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => excluirFavorito(index)}
                className="bg-red-500 px-3 py-1 rounded"
              >
                <Text className="text-white">Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-400 mt-10">
            Nenhum local salvo ainda.
          </Text>
        }
      />

      {/* Botão flutuante */}
      <TouchableOpacity
        onPress={salvarLocalAtual}
        className="absolute bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-lg"
      >
        <Ionicons name="bookmark-outline" size={28} color="#FFF" />
      </TouchableOpacity>

      {/* Modal de confirmação */}
      <CustomModal
        visible={modalVisible}
        onConfirm={async (nome) => {
          if (!localTemp) return;

          const novo = {
            nome,
            latitude: localTemp.latitude,
            longitude: localTemp.longitude,
          };

          const novos = [...favoritos, novo];
          await AsyncStorage.setItem("locaisFavoritos", JSON.stringify(novos));
          setFavoritos(novos);
          setModalVisible(false);
          setLocalTemp(null);
        }}
        onCancel={() => {
          setModalVisible(false);
          setLocalTemp(null);
        }}
      />

      <EditModal
        visible={editModalVisible}
        initialValue={editNome}
        onConfirm={async (nomeNovo) => {
          const atualizados = [...favoritos];
          atualizados[editIndex].nome = nomeNovo;
          await AsyncStorage.setItem(
            "locaisFavoritos",
            JSON.stringify(atualizados)
          );
          setFavoritos(atualizados);
          setEditModalVisible(false);
        }}
        onCancel={() => setEditModalVisible(false)}
      />
    </View>
  );
}
