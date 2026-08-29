import React from "react";

function FAQ() {
  return (
    <div style={styles.page} id="faq">
      <div style={styles.card}>
        <h1 style={styles.title}>Frequently Asked Questions</h1>

        <h3>What does this system do?</h3>
        <p style={styles.text}>
          It converts Roman Urdu text (e.g., “aap kaise ho”) into proper Urdu script (آپ کیسے ہو).
        </p>

        <h3>How does the model work?</h3>
        <p style={styles.text}>
          Our system uses a trained machine learning model based on NLP techniques that learns patterns between Roman Urdu inputs and their Urdu script equivalents.
        </p>

        <h3>Is the output always perfect?</h3>
        <p style={styles.text}>
          While our model is highly accurate for common phrases, results may vary for highly informal spelling, rare dialect expressions, or mixed-language input.
        </p>

        <h3>Is this tool free?</h3>
        <p style={styles.text}>
          Yes, the core transliteration tool is free for all users.
        </p>

        <h3>Can developers use this system?</h3>
        <p style={styles.text}>
          Yes, we plan to provide API access for integration into applications and platforms.
        </p>
      </div>
    </div>
  );
}

export default FAQ;

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