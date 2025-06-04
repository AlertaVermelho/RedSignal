import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("jwtToken");
        const userId = await AsyncStorage.getItem("userId");
        const nome = await AsyncStorage.getItem("nome");
        const email = await AsyncStorage.getItem("email");

        if (token && userId) {
          setUser({
            token,
            userId: Number(userId),
            nome,
            email,
          });
        }
      } catch (error) {
        console.error("Erro ao carregar usuário do AsyncStorage:", error);
      } finally {
        setLoadingUser(false);
      }
    };

    loadUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
};
