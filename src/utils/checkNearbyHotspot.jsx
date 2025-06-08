import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { calcDistanceKm } from "./calcDistanceKm";

export async function checkNearbyHotspots(hotspots, currentLocation) {
  try {
    const favoritosData = await AsyncStorage.getItem("locaisFavoritos");
    const favoritos = favoritosData ? JSON.parse(favoritosData) : [];

    const nearbyMatches = [];

    hotspots.forEach((hotspot) => {
      // Verifica proximidade com localização atual
      const distanceToUser = calcDistanceKm(
        currentLocation.latitude,
        currentLocation.longitude,
        hotspot.latitude,
        hotspot.longitude
      );

      if (distanceToUser <= 2) {
        nearbyMatches.push({
          ...hotspot,
          motivo: "Você está próximo a um hotspot.",
        });
      }

      // Verifica proximidade com locais salvos
      favoritos.forEach((local) => {
        const distanceToFav = calcDistanceKm(
          local.latitude,
          local.longitude,
          hotspot.latitude,
          hotspot.longitude
        );

        if (distanceToFav <= local.raioNotificacaoKm || distanceToFav <= 2) {
          nearbyMatches.push({
            ...hotspot,
            motivo: `Novo hotspot perto de ${local.nome || "um local salvo"}.`,
          });
        }
      });
    });

    // Envia notificações (uma por hotspot relevante)
    for (const match of nearbyMatches) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "⚠️ Alerta de risco próximo!",
          body: `${match.tipoIA} (${match.severidadeIA}) - ${match.motivo}`,
          data: match,
        },
        trigger: null, // Envia imediatamente
      });
    }
  } catch (error) {
    console.error("Erro ao verificar hotspots próximos:", error);
  }
}
