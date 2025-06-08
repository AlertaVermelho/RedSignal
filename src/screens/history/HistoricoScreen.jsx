import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

export default function HistoricoScreen() {
  const [historico, setHistorico] = useState([]);

  useFocusEffect(
    useCallback(() => {
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
    }, [])
  );

  const limparHistorico = async () => {
    Alert.alert(
      "Limpar histórico",
      "Tem certeza que deseja apagar todo o histórico?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sim, apagar",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("historicoAlertas");
            setHistorico([]);
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-4">Histórico de Alertas</Text>

      {historico.length > 0 && (
        <TouchableOpacity
          className="mb-4 bg-red-600 px-4 py-2 rounded"
          onPress={limparHistorico}
        >
          <Text className="text-white text-center font-semibold">
            Limpar Histórico
          </Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={historico}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          // Formata apenas data e hora do timestampCliente
          let dataHora = "";
          if (item.timestampCliente) {
            const date = new Date(item.timestampCliente);
            const dia = String(date.getDate()).padStart(2, "0");
            const mes = String(date.getMonth() + 1).padStart(2, "0");
            const ano = date.getFullYear();
            const horas = String(date.getHours()).padStart(2, "0");
            const minutos = String(date.getMinutes()).padStart(2, "0");
            dataHora = `${dia}/${mes}/${ano} ${horas}:${minutos}`;
          }
          return (
            <View className="mb-4 border p-3 rounded">
              <Text className="font-semibold text-lg">
                {item.descricaoTexto || "Sem descrição"}
              </Text>
              <Text className="text-gray-600 text-sm">
                Latitude: {item.latitude}, Longitude: {item.longitude}
              </Text>
              <Text className="text-gray-500 text-sm">{dataHora}</Text>
            </View>
          );
        }}
        ListEmptyComponent={
          <Text className="text-gray-500 text-center mt-6">
            Nenhum alerta registrado ainda.
          </Text>
        }
      />
    </View>
  );
}
