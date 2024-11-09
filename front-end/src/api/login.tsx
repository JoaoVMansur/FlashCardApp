import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL; // Vite env variable

interface User {
  userName: string;
  passWord: string;
}

async function Login(user: User) {
  try {
    const response = await axios.post(`${baseURL}/login`, user); // Remove JSON.stringify
    if (response.status !== 200) {
      console.error(
        `Error: Received unexpected status code ${response.status}`
      );
      return null;
    }
    document.cookie = `Authorization=${response.data}`;
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
}

export default Login;
