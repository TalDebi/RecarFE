import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  CanceledError,
  InternalAxiosRequestConfig,
} from "axios";
import { refreshTokens } from "./user";

type ErrorHandler = (error: AxiosError) => Promise<AxiosResponse>;

const apiClient: AxiosInstance = axios.create({
  baseURL: `https://${process.env.SERVER}:${process.env.SERVER_PORT}`,
});

const errorHandler: ErrorHandler = async (error: AxiosError<any, any>) => {
  if (error?.response?.data?.errorType === "TokenExpired") {
    const response = await refreshTokens();
    localStorage.setItem("tokens", JSON.stringify(response));
    return apiClient(error.config as AxiosRequestConfig);
  }
  return Promise.reject(error);
};

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    config.headers.Authorization =
      "Bearer " +
        JSON.parse(localStorage.getItem("tokens") ?? "{}")?.accessToken ?? "";

    return config;
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  errorHandler
);

export { CanceledError };
export default apiClient;
