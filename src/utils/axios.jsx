import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3004/api/v1",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;
