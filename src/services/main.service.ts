import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const timeout = parseInt(import.meta.env.VITE_API_TIMEOUT || "50000", 10);

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
