
import React, { useState } from "react";
import API from "../Api/axios";
import { useNavigate } from "react-router-dom";

const Auth = ({ setToken }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const response = await API.post("/login", {
          email: formData.email,
          password: formData.password,
        });
        
        const token = response.data.data.token;

        localStorage.setItem("token", token);
       


        localStorage.setItem("user",JSON.stringify(response.data.data.user))    
        
         setToken(token);
        setTimeout(() => {
            navigate("/dashboard");
        
        
          }, 100);
      
          
      
        } 
        
        //signup
        else {
        console.log(formData);
        
        const response = await API.post("/signup", {
          username: formData.name,
          email: formData.email,
          password: formData.password,
        });

        const token = response.data.data.token;
        
        console.log(token);
        console.log(response.data.data);
        
        
        

        localStorage.setItem("token", token);
        
        localStorage.setItem("user",JSON.stringify(response.data.data.user))
        setToken(token);
        
        navigate("/dashboard");

      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      
      {/* Stars */}
      <div style={styles.stars1}></div>
      <div style={styles.stars2}></div>

      <div style={styles.card}>
        <h1 style={styles.logo}>
          Convo<span style={{ color: "#d4af37" }}>fy</span>
        </h1>

        <p style={styles.subtitle}>
          {isLogin
            ? "Welcome back to your space"
            : "Create your account"}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Create Account"}
          </button>
        </form>

        <p style={styles.switchText}>
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <span
            style={styles.switchBtn}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background:
      "radial-gradient(circle at top, #111111 0%, #050505 70%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
    fontFamily: "Arial, sans-serif",
  },

  stars1: {
    position: "absolute",
    width: "2px",
    height: "2px",
    background: "white",
    boxShadow: `
      50px 80px white,
      200px 150px white,
      400px 300px white,
      700px 100px white,
      900px 250px white,
      1100px 500px white,
      1300px 200px white,
      1500px 400px white
    `,
  },

  stars2: {
    position: "absolute",
    width: "1px",
    height: "1px",
    background: "#d4af37",
    boxShadow: `
      100px 200px #d4af37,
      350px 100px #d4af37,
      600px 250px #d4af37,
      850px 350px #d4af37,
      1200px 150px #d4af37,
      1450px 500px #d4af37
    `,
  },

  card: {
    width: "100%",
    maxWidth: "340px",
    padding: "32px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 0 30px rgba(0,0,0,0.5)",
    zIndex: 2,
  },

  logo: {
    textAlign: "center",
    color: "white",
    fontSize: "32px",
    marginBottom: "8px",
    letterSpacing: "1px",
  },

  subtitle: {
    textAlign: "center",
    color: "#bdbdbd",
    marginBottom: "28px",
    fontSize: "14px",
  },

  input: {
    width: "100%",
    padding: "13px",
    marginBottom: "16px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "13px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #d4af37, #f5deb3)",
    color: "#111",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "15px",
    marginTop: "6px",
  },

  switchText: {
    textAlign: "center",
    color: "#bdbdbd",
    marginTop: "20px",
    fontSize: "14px",
  },

  switchBtn: {
    color: "#f5deb3",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Auth;