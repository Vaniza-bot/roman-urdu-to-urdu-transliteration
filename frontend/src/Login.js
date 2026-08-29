import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        navigate("/app");
      } else {
        alert(res.data.msg);
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div style={styles.page}>

      {/* 🔥 NEW HEADER */}
      <h1 style={styles.header}>Welcome to SAEVIZA AI Transliterator</h1>

      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>

        <p style={styles.link} onClick={() => navigate("/signup")}>
          New user? Signup
        </p>
      </div>
    </div>
  );
}

export default Login;

// ✅ STYLES
const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",   // 🔥 important (stack header + card)
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #91e3f8, #ffffff)",
  },

  /* 🔥 NEW HEADER STYLE */
  header: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",   // space between header and box
    color: "#111827",
  },

  card: {
    width: "350px",
    padding: "30px",
    borderRadius: "15px",
    backgroundColor: "white",
    boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  title: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
  },

  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  link: {
    textAlign: "center",
    cursor: "pointer",
    color: "#4f46e5",
    fontSize: "14px",
  },
};