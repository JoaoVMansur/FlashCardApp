import axios from "axios";

interface SignUpData {
  userName: string;
  Email: string;
  Password: string;
}

export const signUp = async (formData: SignUpData) => {
  const response = await axios.post("http://localhost:8080/signup", formData);
  
  return response;
};
