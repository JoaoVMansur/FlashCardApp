import axios from "axios";
import { baseURL } from "../Globals";

export default async function deleteCollection(collectionId: number) {
  await axios.delete(`${baseURL}/collection/${collectionId}`,
    { withCredentials: true }
  );
  
}
