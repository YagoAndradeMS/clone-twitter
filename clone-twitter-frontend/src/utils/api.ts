import axios from 'axios';
import Cookies from 'js-cookie';

const url = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: `${url}`,
  withCredentials: true, // se quiser mandar cookies também
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token no header Authorization
api.interceptors.request.use(config => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para log de erro (como você já tinha)
api.interceptors.response.use(
  response => response,
  error => {
    console.error('[AXIOS ERROR]', {
      url: error.config?.url,
      method: error.config?.method,
      data: error.response?.data,
      status: error.response?.status,
    });

    return Promise.reject(error);
  }
);
