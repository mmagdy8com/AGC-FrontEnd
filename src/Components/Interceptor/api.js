import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("error", error);

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log("Sdsdsdsdsd");
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        console.log("refreshToken", refreshToken);
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/refreshToken`,
          { refreshToken }
        );
        const { accessToken } = response.data;

        localStorage.setItem("accessToken", accessToken);
        console.log("accessToken", accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        localStorage.clear();
        // window.location.href = "/signin";
        // Handle refresh token error or redirect to login
      }
    }

    return Promise.reject(error);
  }
);
export default api;
