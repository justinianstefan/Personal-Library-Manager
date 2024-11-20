import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://personal-library-manager-service.onrender.com/', // Replace with the mock server's URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;