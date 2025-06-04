import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useUser } from "../../contexts/userContext";
import { createAlert } from "./services/alertService";

export default function CriarAlertaScreen() {
  const navigation = useNavigation();
  const { user } = useUser();

  const [descricaoTexto, setDescricaoTexto] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [tipoIA, setTipoIA] = useState("RISCO_DESLIZAMENTO");

  const handleSubmit = async () => {
    if (!descricaoTexto || !latitude || !longitude) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    if (!user?.userId) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    try {
      const alerta = {
        descricaoTexto,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        tipoIA,
        timestampCliente: new Date().toISOString(),
      };

      await createAlert(alerta);

      Alert.alert("Sucesso", "Alerta criado com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível criar o alerta.");
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-xl font-bold mb-4">Criar Novo Alerta</Text>

      <Text className="text-base font-medium mt-2">Descrição do Alerta</Text>
      <TextInput
        className="border border-gray-300 rounded px-4 py-2 mt-1"
        placeholder="Ex: Rachaduras no morro, risco médio."
        multiline
        value={descricaoTexto}
        onChangeText={setDescricaoTexto}
      />

      <Text className="text-base font-medium mt-4">Latitude</Text>
      <TextInput
        className="border border-gray-300 rounded px-4 py-2 mt-1"
        keyboardType="numeric"
        placeholder="Ex: -23.558"
        value={latitude}
        onChangeText={setLatitude}
      />

      <Text className="text-base font-medium mt-4">Longitude</Text>
      <TextInput
        className="border border-gray-300 rounded px-4 py-2 mt-1"
        keyboardType="numeric"
        placeholder="Ex: -46.652"
        value={longitude}
        onChangeText={setLongitude}
      />

      <TouchableOpacity
        className="bg-red-600 mt-6 py-3 rounded"
        onPress={handleSubmit}
      >
        <Text className="text-white text-center font-bold">Enviar Alerta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
