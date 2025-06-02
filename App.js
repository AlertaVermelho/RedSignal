import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppNavigator />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
