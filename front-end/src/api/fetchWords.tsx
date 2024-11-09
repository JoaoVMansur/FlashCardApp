import axios from "axios";
import { baseURL } from "../Globals";
async function featchWords() {
  try {
    const response = await axios.get(`${baseURL}/words`, {
      withCredentials: true,
    });
    const data = await response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("axios error: ", error.message);
    } else {
      console.log("Unexpected error: ", error);
    }
    throw error;
  }
}

export default featchWords;
