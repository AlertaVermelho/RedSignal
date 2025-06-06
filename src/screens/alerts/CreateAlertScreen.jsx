import { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Button from "../../components/Button";
import * as Location from "expo-location";
import { createAlert } from "./services/alertService";
import { useNavigation } from "@react-navigation/native";

export default function CreateAlertScreen() {
  const [descricao, setDescricao] = useState("");
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permissão negada", "A localização é necessária.");
          return;
        }

        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });

        setLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });

        console.log("📍 Localização real:", coords);
      } catch (error) {
        console.error("Erro ao obter localização:", error);
        Alert.alert("Erro", "Não foi possível obter a localização.");
      }
    })();
  }, []);

  const handleSubmit = async () => {
    if (!descricao.trim()) {
      Alert.alert("Erro", "Preencha a descrição do alerta.");
      return;
    }

    if (!location) {
      Alert.alert("Aguarde", "A localização ainda não foi carregada.");
      return;
    }

    const payload = {
      descricaoTexto: descricao.trim(),
      latitude: location.latitude,
      longitude: location.longitude,
      timestampCliente: new Date().toISOString(),
    };

    try {
      setLoading(true);
      const response = await createAlert(payload);

      console.log("🔔 Alerta criado:", response.data);

      Alert.alert("Sucesso", "Alerta criado com sucesso!");
      navigation.navigate("Home");
    } catch (error) {
      console.error(
        "❌ Erro ao criar alerta:",
        error?.response?.data || error.message
      );
      Alert.alert("Erro", "Falha ao criar o alerta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 justify-center items-center bg-white px-6"
    >
      <Text className="text-xl font-semibold text-black mb-6">
        Criar novo alerta
      </Text>

      <TextInput
        placeholder="Descreva o que está acontecendo (máx 50 caracteres)"
        maxLength={50}
        className="w-full border border-gray-300 rounded-md p-3 mb-6"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Button
        text="Enviar alerta"
        onPress={handleSubmit}
        icon="alert-circle-outline"
        type="Primary"
        fullWidth
        loading={loading}
      />
    </KeyboardAvoidingView>
  );
}
