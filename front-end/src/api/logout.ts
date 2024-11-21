import axios from "axios";
import { baseURL } from "../Globals";

interface LogoutResponse {
  success: boolean;
  error?: string;
}

export async function logoutCall(): Promise<LogoutResponse> {
  try {
    await axios.post(`${baseURL}/logout`, {}, { withCredentials: true });
    return { success: true };
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    return {
      success: false,
      error: "Falha ao fazer logout"
    };
  }
}

