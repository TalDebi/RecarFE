import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  CanceledError,
} from "axios";
import { refreshTokens } from "./user";

type ErrorHandler = (error: AxiosError) => Promise<AxiosResponse>;

const accessToken: string =
  JSON.parse(localStorage.getItem("tokens") ?? "{}")?.accessToken ?? "";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: { Authorization: "Bearer " + accessToken },
});

const errorHandler: ErrorHandler = async (error: AxiosError<any, any>) => {
  if (error?.response?.data?.errorType === "TokenExpired") {
    const response = await refreshTokens();
    localStorage.setItem("tokens", JSON.stringify(response));
    return apiClient(error.config as AxiosRequestConfig);
  }
  return Promise.reject(error);
};

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  errorHandler
);

export { CanceledError };
export default apiClient;
