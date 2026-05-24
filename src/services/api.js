import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export function getApiError(error, fallback = 'Something went wrong. Please try again.') {
  return error.response?.data?.message || fallback;
}

export default api;
