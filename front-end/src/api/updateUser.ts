import axios from "axios";
import { baseURL } from "../Globals";
interface User {
  ID: number;
  UserName?: string;
  Email?: string;
  PassWord?: string;
}

const updateUser = async (user: User) => {
  const response = await axios.post(`${baseURL}/update-user`, user, {
    withCredentials: true,
  });
  return response;
};

export default updateUser;
