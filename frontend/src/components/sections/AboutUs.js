import React from "react";

function AboutUs() {
  return (
    <div style={styles.page} id="about">
      <div style={styles.card}>
        <h1 style={styles.title}>About Our Platform</h1>

        <p style={styles.text}>
          We are a research-driven technology platform focused on Roman Urdu to Urdu transliteration using advanced machine learning models.
        </p>

        <p style={styles.text}>
          Our mission is to bridge the communication gap between users who type in Roman Urdu and the need for accurate, standardized Urdu script in digital communication, education, and content creation.
        </p>

        <p style={styles.text}>
          We combine Natural Language Processing (NLP) and deep learning techniques to deliver fast, reliable, and context-aware transliteration results.
        </p>

        <h2 style={styles.subtitle}>Our Vision</h2>
        <p style={styles.text}>
          To become a leading language AI system for Urdu digital transformation and accessibility.
        </p>

        <h2 style={styles.subtitle}>Our Mission</h2>
        <p style={styles.text}>
          To simplify Urdu writing for millions of users who rely on Roman Urdu in daily communication.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #ffffff)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  },

  card: {
    maxWidth: "800px",
    padding: "40px",
    background: "transparent",
    boxShadow: "none",
    borderRadius: "0px",
  },

  title: {
    fontSize: "32px",
    marginBottom: "20px",
    color: "#1a1a1a",
    fontWeight: "700",
  },

  subtitle: {
    marginTop: "20px",
    fontSize: "22px",
    color: "#222",
    fontWeight: "600",
  },

  text: {
    fontSize: "17px",
    lineHeight: "1.9",
    marginBottom: "12px",
    color: "#2b2b2b",
  },
};