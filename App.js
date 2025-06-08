import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";
import { UserProvider } from "./src/contexts/userContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <UserProvider>
      <SafeAreaView className="flex-1 bg-white">
        <NavigationContainer>
          <AppNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </SafeAreaView>
    </UserProvider>
  );
}
