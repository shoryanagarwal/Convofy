import axios from "axios";

// creating an axios instance

const api= axios.create({
    baseURL:"http://localhost:5000/api/v1",
    withCredentials:true, // to send cookies with requests
})


// adding a request interceptor to include the token in headers
 api.interceptors.request.use((config) => { // Interceptor-> it allows us to modify the request before it is sent to the server

  const token = localStorage.getItem("token");// get the token from local storage

  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // if token exists, add it to the headers of the request
  }

  return config;
});
export default api;