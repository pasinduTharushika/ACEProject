import axios from "axios";
import { getAccessToken } from "./auth.service";

const BASE_URL = process.env.BASE_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    const auth = token ? `Bearer ${token}` : "";
    config.headers = { Authorization: auth };
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
