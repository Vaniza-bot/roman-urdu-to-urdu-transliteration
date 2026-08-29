import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/signup",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        navigate("/app");
      } else {
        alert("Signup failed");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Signup error");
    }
  };

  return (
    <div style={styles.page}>

      {/* 🔥 SAME HEADER AS LOGIN */}
      <h1 style={styles.header}>Welcome to SAEVIZA AI Transliterator</h1>

      <div style={styles.card}>
        <h2>Sign Up</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleSignup} style={styles.button}>
          Sign Up
        </button>

        <p onClick={() => navigate("/login")} style={styles.link}>
          Already have account?
        </p>
      </div>
    </div>
  );
}

export default Signup;

/* ================= STYLES ================= */

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",   // 🔥 IMPORTANT (for header)
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #91e3f8, #ffffff)", // ✅ same as login
  },

  /* 🔥 SAME HEADER STYLE */
  header: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#111827",
  },

  card: {
    width: "320px",
    padding: "25px",
    borderRadius: "12px",
    backgroundColor: "white",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    textAlign: "center",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  button: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",   // ✅ match login button color
    color: "white",
    cursor: "pointer",
  },

  link: {
    cursor: "pointer",
    color: "#4f46e5",
    fontSize: "14px",
  },
};