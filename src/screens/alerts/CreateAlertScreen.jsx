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
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "Localização é necessária para criar um alerta."
        );
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  const handleSubmit = async () => {
    if (!descricao.trim()) {
      Alert.alert("Erro", "Por favor, preencha a descrição.");
      return;
    }

    if (!location) {
      Alert.alert("Erro", "Localização ainda não carregada.");
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
      await createAlert(payload);
      Alert.alert("Sucesso", "Alerta criado com sucesso!");
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao criar alerta.");
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
        maxLength={100}
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
