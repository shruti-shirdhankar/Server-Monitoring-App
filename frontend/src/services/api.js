import axios from 'axios';

const API = axios.create({
  baseURL: 'https://server-monitoring-app.onrender.com/api/', // adjust this based on your Django routes
});

export default API;
