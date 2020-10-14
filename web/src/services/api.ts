import axios from 'axios';

export default axios.create({
  baseURL: window.location.hostname.includes('localhost')
    ? process.env.REACT_APP_URL_BACKEND_LOCAL
    : process.env.REACT_APP_URL_BACKEND_REMOTE,
});
