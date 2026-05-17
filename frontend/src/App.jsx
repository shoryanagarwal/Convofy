import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Auth/Auth.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import api from "./Api/axios.js";
import { isTokenValid } from "./utils/auth.js";
import ProtectedRoute from "./ProtectedRoutes.jsx";


import Home from "../Homepage/pages/home.jsx";



function App() {
   const [loading, setLoading] =useState(true);
  const [token, setToken] =useState(false);

  useEffect(() => {

  const verifyUser = async () => {
      
    const token = localStorage.getItem("token");

    if (!token) {

      setToken(false);
      setLoading(false);

      return;
    }

    try {

      // backend se verify
      
      await api.get("/me");
     


      setToken(true);

    } catch (error) {
  
  console.log("user no longer exists");
  console.log(error.response?.data || error.message);

  localStorage.clear();

  setToken(false);

  window.location.href = "/auth";
}
    finally{
      setLoading(false);
    }
  };

  verifyUser();

 

  return ()=>clearInterval(interval);

}, []);

  if(loading){

    return (

       <div
        className="
          h-screen
          flex
          items-center
          justify-center
          bg-black
          text-white
        "
      >
        Loading...
      </div>

    )



  }

  return (
  <Routes>
    <Route path="/" element={<Home />} />

    <Route
      path="/auth"
      element={
        token ? (
          <Navigate to="/dashboard" />
        ) : (
          <Auth setToken={setToken} />
        )
      }
    />

    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />

    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);
}

export default App;
