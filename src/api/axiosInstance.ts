import axios from "axios";

import store from "../redux/store";
import { logout } from "../redux/slices/authSlice";
import toast from 'react-hot-toast';

// Axios instance setup
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/${import.meta.env.VITE_API_VERSION}`,
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

axiosInstance.interceptors.response.use(
  (response) => response, // If the response is successful, return it
  async (error) => {
    // If 401 error (token expired or invalid)
    if (error.response?.status === 401) {
      // Get the access and refresh tokens from the Redux store
      store.dispatch(logout());
      toast.error("Invalid or expired token. Login Again");

    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
