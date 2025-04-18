import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // adjust this based on your Django routes
});

export default API;
