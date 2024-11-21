import { baseURL } from "../Globals";
import axios from "axios";
interface addCardRequest {
  front: string;
  verse: string;
}

async function addCard(newCard: addCardRequest) {
  try {
    const response = await axios.post(`${baseURL}/card`, newCard, {
      withCredentials: true,
    });
    const data = await response.data;
    return data;
  } catch (error: any) {
    if (error.status == 406) {
      console.error("axios error: ", error.message);
      return null;
    } else {
      console.error("unexpected error: ", error);
    }
    throw error;
  }
}

export default addCard;
