// config
import axios from "axios";
// ----------------------------------------------------------------------
// baseURL: 'http://localhost:8080',
const axiosInstance = axios.create({
  baseURL: 'https://api.ann-beautyskincare.com',
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;
