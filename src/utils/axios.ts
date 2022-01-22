// config
import axios from "axios";
// ----------------------------------------------------------------------
//baseURL: 'https://api.ann-beautyskincare.com',
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
