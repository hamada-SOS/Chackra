import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import jwtDecode from 'jwt-decode';

// Define the API base URL and token storage
const API_URL = 'http://localhost:5149/api';
const REFRESH_TOKEN_URL = '/Auth/refresh-token';
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_URL,
});

// Axios request interceptor to attach the access token
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token) {
    config.headers = config.headers ||{};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token expiration
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        const { data } = await axios.post(`${API_URL}${REFRESH_TOKEN_URL}`, {
          token: localStorage.getItem(ACCESS_TOKEN_KEY),
          refreshToken: refreshToken
        });

        // Store the new access and refresh tokens
        localStorage.setItem(ACCESS_TOKEN_KEY, data.token);
        localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Handle refresh token expiration (e.g., force logout)
        console.error('Refresh token expired or invalid, logging out...');
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
