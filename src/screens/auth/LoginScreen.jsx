import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { login } from "../../screens/auth/services/authService";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha o email e a senha.");
      return;
    }

    setLoading(true);
    try {
      const response = await login(email, senha);
      const { token, userId, nome, email: emailRetornado } = response.data;

      await AsyncStorage.setItem("jwtToken", token);
      await AsyncStorage.setItem("userId", String(userId));
      await AsyncStorage.setItem("nome", nome);
      await AsyncStorage.setItem("email", emailRetornado);

      navigation.replace("Home");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro ao entrar", "Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold text-black mb-1">Red Signal</Text>
      <Text className="text-base text-gray-500 mb-6">Login</Text>

      <TextInput
        placeholder="Email"
        className="w-full border border-gray-300 rounded-md p-3 mb-4"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        className="w-full border border-gray-300 rounded-md p-3 mb-4"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {loading ? (
        <View className="w-full mb-4 py-3 rounded-full bg-primary">
          <ActivityIndicator color="#FFF" />
        </View>
      ) : (
        <Button
          text="Login"
          onPress={handleLogin}
          icon="log-in-outline"
          type="Primary"
          fullWidth
        />
      )}

      <Text className="text-gray-400 text-sm my-4">ou</Text>

      <Button
        text="Continue com o Google"
        onPress={() => Alert.alert("Google Login")}
        icon="logo-google"
        type="Secondary"
        fullWidth
      />

      <View className="h-2" />

      <Button
        text="Continue com o Facebook"
        onPress={() => Alert.alert("Facebook Login")}
        icon="logo-facebook"
        type="Secondary"
        fullWidth
      />

      <View className="mt-6">
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text className="text-sm text-gray-500">
            Novo no Red Signal?{" "}
            <Text className="text-green-600 font-semibold">Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
