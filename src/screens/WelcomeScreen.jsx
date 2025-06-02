import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";

function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Image
        source={require("../../assets/red_signal_light.png")}
        className="w-48 h-48 mb-8"
        resizeMode="contain"
      />

      <Text className="text-3xl font-bold text-black mb-2">Red Signal</Text>

      <Text className="text-center text-gray-500 mb-10">
        Alertas inteligentes para proteger quem você ama.
      </Text>

      <Button
        text="Cadastre-se"
        onPress={() => navigation.navigate("Register")}
        type="Primary"
        fullWidth
      />

      <View className="mt-6 flex-row">
        <Text className="text-sm text-gray-500">Já tem uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="text-sm text-green-600 font-semibold">Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default WelcomeScreen;
