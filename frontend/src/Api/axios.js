import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => { // har request se pehle ye function chalega -> is function me hum token ko header me attach karenge
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}); // isse protected routes pe bhi token attach ho jayega aur hume manually har request me token attach karne ki zarurat nahi padegi

export default api;