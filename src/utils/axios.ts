// config
import axios from "axios";
// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: 'http://appserverskincare-env.eba-aeumpumc.ap-southeast-1.elasticbeanstalk.com',
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;
