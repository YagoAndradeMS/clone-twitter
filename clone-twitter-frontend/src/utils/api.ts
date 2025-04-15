import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: `${url}`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('[AXIOS ERROR]', {
      url: error.config.url,
      method: error.config.method,
      data: error.response?.data,
      status: error.response?.status,
    });

    return Promise.reject(error);
  }
);
