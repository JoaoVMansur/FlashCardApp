import axios from "axios";
import { baseURL } from "../Globals";

interface Collection{
    ID:number;
    CollectionName:string;
}

async function EditCollectionName(collection: Collection){

    const response = await axios.put(`${baseURL}/collection/${collection.ID}`, collection,{
        withCredentials: true
    })
    return response;
}



export default EditCollectionName