import React, { useState } from "react";
import API from "../Api/axios.js";

const Auth = ({ setToken }) => {
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

  const saveAuthAndRedirect = (token, user) => {
    if (!token || !user) {
      alert("Token or user missing from backend response");
      return;
    }

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(true);
    window.location.replace("/dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const response = await API.post("/login", {
          email: formData.email.trim(),
          password: formData.password,
        });

        const token = response.data.data.token;
        const user = response.data.data.user;

        saveAuthAndRedirect(token, user);
        setToken(true);
        window.location.replace("/dashboard");
      } else {
        const response = await API.post("/signup", {
          username: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        });

        const token = response.data.data.token;
        const user = response.data.data.user;

        saveAuthAndRedirect(token, user);
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.err?.message ||
        error.message ||
        "Something went wrong";

      alert(message);
      console.log("AUTH ERROR:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.bluePlanet}></div>
      <div style={styles.goldOrbit}></div>
      <div style={styles.stars}></div>

      <div style={styles.card}>
        <h1 style={styles.logo}>
          Convo<span style={{ color: "#d6ad4a" }}>fy</span>
        </h1>

        <p style={styles.subtitle}>
          {isLogin ? "Welcome back to your space" : "Create your account"}
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
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <div style={styles.orRow}>
          <span style={styles.line}></span>
          <span style={styles.or}>or</span>
          <span style={styles.line}></span>
        </div>

        <p style={styles.switchText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span style={styles.switchBtn} onClick={() => setIsLogin(!isLogin)}>
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
    position: "relative",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    background:
      "radial-gradient(circle at 20% 35%, #142763 0%, transparent 34%), radial-gradient(circle at 78% 78%, rgba(113,75,18,0.28), transparent 28%), linear-gradient(135deg, #02040c 0%, #050816 45%, #02030a 100%)",
  },

  bluePlanet: {
    position: "absolute",
    left: "-220px",
    top: "90px",
    width: "520px",
    height: "520px",
    borderRadius: "50%",
    border: "1px solid rgba(110,145,255,0.45)",
    boxShadow:
      "0 0 90px rgba(63,102,220,0.45), inset -25px 0 80px rgba(80,120,255,0.22)",
    background:
      "radial-gradient(circle at 70% 40%, rgba(60,95,190,0.22), transparent 55%)",
  },

  goldOrbit: {
    position: "absolute",
    right: "-180px",
    bottom: "-120px",
    width: "520px",
    height: "520px",
    borderRadius: "50%",
    border: "1px solid rgba(214,173,74,0.22)",
    boxShadow: "0 0 80px rgba(214,173,74,0.14)",
  },

  stars: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(#d6ad4a 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
    backgroundSize: "130px 120px, 190px 170px",
    opacity: 0.45,
  },

  card: {
    position: "relative",
    zIndex: 2,
    width: "80%",
    maxWidth: "420px",
    padding: "28px 40px",
    borderRadius: "28px",
    background: "rgba(8, 12, 27, 0.74)",
    backdropFilter: "blur(22px)",
    border: "1px solid rgba(180,198,255,0.24)",
    boxShadow:
      "0 35px 100px rgba(0,0,0,0.72), inset 0 1px 0 rgba(255,255,255,0.08)",
  },

  logo: {
    textAlign: "center",
    color: "#fff",
    fontSize: "56px",
    lineHeight: "1",
    marginBottom: "18px",
    fontWeight: "400",
    letterSpacing: "0.5px",
  },

  subtitle: {
    textAlign: "center",
    color: "#c4cad8",
    marginBottom: "40px",
    fontSize: "18px",
  },

  input: {
    width: "100%",
    height: "58px",
    padding: "0 22px",
    marginBottom: "22px",
    borderRadius: "11px",
    border: "1px solid rgba(180,198,255,0.13)",
    background: "rgba(255,255,255,0.035)",
    color: "#fff",
    outline: "none",
    fontSize: "16px",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    height: "62px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #f4d276, #c9962e)",
    color: "#101010",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "17px",
    marginTop: "16px",
  },

  orRow: {
    display: "flex",
    alignItems: "center",
    gap: "22px",
    margin: "34px 0 26px",
  },

  line: {
    flex: 1,
    height: "1px",
    background: "rgba(255,255,255,0.18)",
  },

  or: {
    color: "#aab0bf",
    fontSize: "15px",
  },

  switchText: {
    textAlign: "center",
    color: "#c4cad8",
    fontSize: "16px",
    margin: 0,
  },

  switchBtn: {
    color: "#e5bd59",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Auth;