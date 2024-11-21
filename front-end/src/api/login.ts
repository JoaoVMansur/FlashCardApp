import axios from "axios";
import { baseURL } from "../Globals";

interface User {
  userName: string;
  passWord: string;
}

async function Login(user: User) {
  try {
    const response = await axios.post(`${baseURL}/login`, user, {
      withCredentials: true,
    });
    if (response.status !== 200) {
      console.error(
        `Error: Received unexpected status code ${response.status}`
      );
      return null;
    }
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
}

export default Login;
