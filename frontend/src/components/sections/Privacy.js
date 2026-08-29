import React from "react";

function Privacy() {
  return (
    <div style={styles.page} id="privacy">
      <div style={styles.card}>
        <h1 style={styles.title}>Privacy Policy</h1>

        <h3>Privacy Commitment</h3>
        <p style={styles.text}>
          We value user privacy and data protection.
        </p>

        <h3>Data Handling</h3>
        <p style={styles.text}>
          We do not store user input permanently. Inputs are processed in real-time for transliteration only.
        </p>

        <p style={styles.text}>
          Temporary logs may be used for debugging and performance improvement.
        </p>

        <h3>Data Sharing</h3>
        <p style={styles.text}>
          We do not sell, rent, or share user data with third parties.
        </p>

        <h3>Security</h3>
        <p style={styles.text}>
          We implement standard security practices to ensure safe handling of all requests.
        </p>
      </div>
    </div>
  );
}

export default Privacy;

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #ffffff)",

    // ✅ IMPORTANT FIX for header overlap
    padding: "90px 40px 40px",

    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start", // better than center for long pages
  },

  card: {
    maxWidth: "800px",
    padding: "30px 40px",
    background: "transparent",
    boxShadow: "none",
  },

  title: {
    fontSize: "28px",   // smaller
    marginBottom: "20px",
    fontWeight: "700",
    color: "#1a1a1a",
  },

  subtitle: {
    marginTop: "20px",
    fontSize: "18px",   // smaller
    fontWeight: "600",
    color: "#222",
  },

  text: {
    fontSize: "15px",   // smaller text
    lineHeight: "1.8",
    marginBottom: "12px",
    color: "#2b2b2b",
  },
};