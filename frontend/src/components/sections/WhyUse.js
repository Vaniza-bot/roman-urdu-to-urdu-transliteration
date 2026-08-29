import React from "react";

function WhyUse() {
  return (
    <div style={styles.page} id="why-use">
      <div style={styles.card}>
        <h1 style={styles.title}>Why Choose Our Platform</h1>

        <ul style={styles.list}>
          <li>🚀 High Performance - Optimized for fast real-time transliteration</li>
          <li>🧠 AI-Powered Accuracy - Uses trained machine learning model</li>
          <li>🌍 Language Focused - Built specifically for Roman Urdu</li>
          <li>🔄 Context Awareness - Understands variations in spelling</li>
          <li>🔌 Developer Friendly - Future API support</li>
          <li>🎯 Research Based - Built for NLP Urdu language processing</li>
        </ul>
      </div>
    </div>
  );
}

export default WhyUse;

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