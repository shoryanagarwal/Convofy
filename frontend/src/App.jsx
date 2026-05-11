import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Auth/Auth.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import { isTokenValid } from "./utils/auth.js";

function App() {
  const [token, setToken] = useState(isTokenValid());

  useEffect(() => {
    const interval = setInterval(() => {
      const valid = isTokenValid();

      if (!valid) {
        setToken(false); // 👈 force logout
      }
    }, 5000); // check every 5 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <Routes>
      <Route
        path="/auth"
        element={!token ? <Auth setToken={setToken} /> : <Navigate to="/dashboard" />}
      />

      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/auth" />}
      />

      <Route
        path="*"
        element={<Navigate to={token ? "/dashboard" : "/auth"} />}
      />
    </Routes>
  );
}

export default App;
