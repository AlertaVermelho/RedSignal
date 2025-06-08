import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../../components/Button";
import { registerUser } from "../../screens/auth/services/authService";

export default function RegisterScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      await registerUser(nome, email, senha);
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      navigation.replace("Login");
    } catch (error) {
      if (error.response && error.response.data) {
        const data = error.response.data;

        // Caso seja um erro de validação (lista de erros)
        if (data.errors && Array.isArray(data.errors)) {
          const mensagens = data.errors.map((err) => err.message).join("\n");
          Alert.alert("Erro de validação", mensagens);
        } else if (data.message) {
          // Caso seja erro com mensagem única (ex: email já cadastrado)
          Alert.alert("Erro", data.message);
        } else {
          Alert.alert("Erro", "Erro desconhecido ao registrar.");
        }
      } else {
        Alert.alert("Erro", "Erro de conexão com o servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold text-black mb-1">Red Signal</Text>
      <Text className="text-base text-gray-500 mb-6">Criar Conta</Text>

      <TextInput
        placeholder="Nome"
        className="w-full border border-gray-300 rounded-md p-3 mb-4"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Email"
        className="w-full border border-gray-300 rounded-md p-3 mb-4"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        className="w-full border border-gray-300 rounded-md p-3 mb-4"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {loading ? (
        <View className="w-full mb-4 py-3 rounded-full bg-green-600">
          <ActivityIndicator color="#fff" />
        </View>
      ) : (
        <Button
          text="Cadastrar"
          onPress={handleRegister}
          icon="person-add-outline"
          type="Primary"
          fullWidth
        />
      )}

      <View className="mt-6">
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="text-sm text-gray-500">
            Já possui uma conta?{" "}
            <Text className="text-green-600 font-semibold">Entrar</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
