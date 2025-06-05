import apiJava from "../../../services/javaApi";

export const login = (email, senha) => {
  return apiJava.post("/auth/login", { email, senha });
};

export const registerUser = (nome, email, senha) =>
  apiJava.post("/auth/register", { nome, email, senha });
