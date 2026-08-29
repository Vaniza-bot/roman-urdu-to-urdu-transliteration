import React from "react";

function HowItWorks() {
  return (
    <div style={styles.page} id="how-it-works">
      <div style={styles.card}>
        <h1 style={styles.title}>System Workflow</h1>

        <h3>1. Input Processing</h3>
        <p style={styles.text}>Users enter Roman Urdu text into the system interface.</p>

        <h3>2. Text Normalization</h3>
        <p style={styles.text}>
          The input is cleaned and standardized to handle spelling variations, informal writing styles, and mixed punctuation usage.
        </p>

        <h3>3. Model Inference</h3>
        <p style={styles.text}>
          A trained NLP model processes the input and predicts the most probable Urdu script equivalent.
        </p>

        <h3>4. Context Optimization</h3>
        <p style={styles.text}>
          Post-processing improves grammatical consistency and readability.
        </p>

        <h3>5. Output Generation</h3>
        <p style={styles.text}>
          The final Urdu text is returned instantly to the user.
        </p>
      </div>
    </div>
  );
}

export default HowItWorks;

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