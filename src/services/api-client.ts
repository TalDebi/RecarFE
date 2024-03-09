import axios, { CanceledError } from "axios";


const accessToken: string =
    JSON.parse(localStorage.getItem("tokens") ?? "{}")?.accessToken ?? "";


export { CanceledError }
const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers:{ Authorization: 'Bearer ' + accessToken}
});

export default apiClient;
