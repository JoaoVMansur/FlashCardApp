import { baseURL } from "../Globals";
import axios from "axios";
interface addCollectionRequest {
  CollectionName: string;
}

async function addCollection(name: addCollectionRequest) {
  try {
    const response = await axios.post(`${baseURL}/collection`, name, {
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

export default addCollection;
