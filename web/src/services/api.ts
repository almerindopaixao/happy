import axios from 'axios';
import { token } from './token';

const api = axios.create({
  baseURL: window.location.hostname.includes('localhost')
    ? process.env.REACT_APP_URL_BACKEND_LOCAL
    : process.env.REACT_APP_URL_BACKEND_REMOTE,
});

if (token) {
  axios.defaults.headers.authorization = `Bearer ${token}`;
}

export default api;
