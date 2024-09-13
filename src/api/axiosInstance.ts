import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5005'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5005', // Replace with your API base URL
  timeout: 10000, // Optional timeout setting
  headers: {
    'Content-Type': 'application/json',
    // Add any custom headers you need
  },
});

// Optional: Add interceptors for request and response
axiosInstance.interceptors.request.use(
  config => {
    // Modify config before sending the request (e.g., add auth token)
    return config;
  },
  error => {
    // Handle request errors
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Handle response errors
    return Promise.reject(error);
  }
);

export default axiosInstance;
