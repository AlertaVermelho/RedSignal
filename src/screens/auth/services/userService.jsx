import apiJava from "./apiJava";

export const getUserProfile = () => apiJava.get("/users/me");

export const updateUserProfile = (dadosAtualizados) =>
  apiJava.put("/users/me", dadosAtualizados);

export const updateNotificationToken = (notificationToken) =>
  apiJava.put("/users/me/notification-token", { notificationToken });
