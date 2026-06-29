import axios from "axios";
import {toast} from "sonner";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:7000/api",
  withCredentials: true,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

let lastToast = "";
let lastToastTime = 0;

const showToastOnce = (message) => {
  const now = Date.now();

  // Prevent duplicate toast within 3 seconds
  if (lastToast === message && now - lastToastTime < 3000) return;

  lastToast = message;
  lastToastTime = now;

  toast.error(message);
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Network error / server unreachable
    if (!error.response) {
      showToastOnce("Please check your internet connection and try again.");
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    switch (status) {
      case 400:
      case 401:
      case 403:
      case 404:
      case 409:
      case 422:
        showToastOnce(data?.message || "Request could not be processed.");
        break;

      case 429:
        showToastOnce("Too many requests. Please try again later.");
        break;

      default:
        if (status >= 500) {
          showToastOnce(
            "Something went wrong on our server. Please try again later.",
          );
        } else {
          showToastOnce(data?.message || "Something went wrong.");
        }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
