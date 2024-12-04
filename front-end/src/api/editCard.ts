import axios from "axios";
import { baseURL } from "../Globals";

interface Card{
    ID:number;
    Front:string;
    Verse:string;
    CollectionID:number;
}

async function EditCard(card: Card){

    const response = await axios.put(`${baseURL}/card/${card.ID}`, card,{
        withCredentials: true
    })
    return response;
}



export default EditCard