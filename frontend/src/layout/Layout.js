import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

function Layout() {
  const navigate = useNavigate();

  // 🔥 LOGOUT (production-safe)
  const handleLogout = async () => {
  try {
    await axios.post(
      "http://localhost:5000/logout",
      {},
      { withCredentials: true }
    );

    // optional cleanup
    localStorage.clear();

    // HARD redirect (BEST FIX)
    window.location.href = "/signup";

  } catch (err) {
    alert("Logout failed");
  }
};

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.logo}>SAEVIZA AI</div>

        <nav style={styles.nav}>
          <span onClick={() => navigate("/app")} style={styles.link}>Home</span>
          <span onClick={() => navigate("/app/transliterate")} style={styles.link}>Transliterator</span>
          <span onClick={() => navigate("/app/how")} style={styles.link}>How it Works</span>
          <span onClick={() => navigate("/app/why")} style={styles.link}>Why Use</span>
          <span onClick={() => navigate("/app/faq")} style={styles.link}>FAQ</span>
          <span onClick={() => navigate("/app/about")} style={styles.link}>About</span>
          <span onClick={() => navigate("/app/contact")} style={styles.link}>Contact</span>
          <span onClick={() => navigate("/app/privacy")} style={styles.link}>Privacy</span>
          <span onClick={() => navigate("/app/terms")} style={styles.link}>Terms</span>

          {/* 🔥 LOGOUT BUTTON */}
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </nav>
      </header>

      {/* CONTENT */}
      <main style={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background: "linear-gradient(135deg, #91e3f8, #ffffff)",
  },

  header: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "70px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    padding: "0 30px",

    background: "transparent",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",

    zIndex: 1000,
  },

  logo: {
    position: "absolute",
    left: "25px",
    fontSize: "22px",
    fontWeight: "bold",
    color: "#111827",
  },

  nav: {
    display: "flex",
    gap: "22px",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },

  link: {
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    color: "#111827",
  },

  logoutBtn: {
    marginLeft: "10px",
    padding: "6px 12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "white",
    fontSize: "13px",
    cursor: "pointer",
  },

  content: {
    paddingTop: "80px",

    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",

// eslint-disable-next-line
    paddingTop: "00px",
    minHeight: "100vh",
// eslint-disable-next-line
    display: "block",
  },
};