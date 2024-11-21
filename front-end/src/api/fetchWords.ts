import axios from "axios";
import { baseURL } from "../Globals";

async function fetchCollection(id: number) {
  try {
    const response = await axios.get(`${baseURL}/collection/${id}`, {
      withCredentials: true,
    });
    const data = await response.data;
    return data.collection;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("axios error: ", error.message);
    } else {
      console.log("Unexpected error: ", error);
    }
    throw error;
  }
}

export default fetchCollection;
