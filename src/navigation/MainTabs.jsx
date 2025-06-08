import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CriarAlertaScreen from "../screens/alerts/CreateAlertScreen";
import FavoritosScreen from "../screens/favorites/FavoritoScreen";
import HistoricoScreen from "../screens/history/HistoricoScreen";
import HomeScreen from "../screens/home/HomeScreen";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#22c55e",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;
            case "Favoritos":
              iconName = "heart-outline";
              break;
            case "Histórico":
              iconName = "time-outline";
              break;
            case "Criar Alerta":
              iconName = "add-circle-outline";
              break;
            default:
              iconName = "ellipse-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favoritos" component={FavoritosScreen} />
      <Tab.Screen name="Histórico" component={HistoricoScreen} />
      <Tab.Screen name="CriarAlerta" component={CriarAlertaScreen} />
    </Tab.Navigator>
  );
}
