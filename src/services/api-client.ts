import axios, { CanceledError } from "axios";

export { CanceledError }
const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers:{ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWMzYmI3ZjUyYjJlODA0NjM4ZWNhY2EiLCJpYXQiOjE3MDk3Mzk3MTQsImV4cCI6MTcwOTc2OTcxNH0.WmbZLAewIYUIXhZF0DXcXdC8rrg2Q2ZRPTTzFRkTnag'}
});

export default apiClient;
