import axios from "axios";

// creating an axios instance

const api= axios.create({
    baseURL:"http://localhost:5000/api/v1",
    withCredentials:true, // to send cookies with requests
})

export default api;