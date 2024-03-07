import axios, { CanceledError } from "axios";

export { CanceledError }
const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers:{ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVhMTU4YWRlOGI5MzIwMTQ5Yzk0NTIiLCJpYXQiOjE3MDk4NDA3NTgsImV4cCI6MTcwOTg3MDc1OH0.O47NfwV_R1kCuSU-Wr_aXwLnGmvAhJz7l74DSHMGC4U'}
});

export default apiClient;
