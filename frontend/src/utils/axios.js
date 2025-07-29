import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://f8198a861c57.ngrok-free.app',  
});

export default axiosInstance;
