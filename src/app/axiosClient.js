import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: "https://libelit.com/api/",
  //baseURL: 'http://localhost:8080/',
  withCredentials: true,
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // add headers or tokens
    // console.log("Request Interceptor:", config);

    // cookie only added in localhost as it is not sent by default due to CORS issue, comment this while push to main branch
    const cookies = Cookies.get("access-token");

    config.headers.Authorization = "Bearer " + cookies;
    config.headers["Access-Control-Allow-Origin"] = "*";
    return config;
  },
  (error) => {
    // Handle request error
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Modify the response data if needed
    // console.log("Response Interceptor:", response.data);
    return response;
  },
  (error) => {
    // Handle response error
    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);

export default axiosClient;

// ashim.neupane23@gmail.com
// test1234
