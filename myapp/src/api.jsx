import axios from 'axios';

// The URL where your Django server is running
const API_URL = 'http://127.0.0.1:8000/api/';

const api = axios.create({
  baseURL: API_URL,
});

export const getTasks = (token) => {
  return api.get('tasks/', {
    headers: {
      Authorization: `Bearer ${token}` // This sends your JWT to Django
    }
  });
};

export default api;