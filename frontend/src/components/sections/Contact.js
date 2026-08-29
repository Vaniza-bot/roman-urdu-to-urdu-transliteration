import React from "react";

function Contact() {
  return (
    <div style={styles.page} id="contact">
      <div style={styles.card}>
        <h1 style={styles.title}>Get in Touch</h1>

        <p style={styles.text}>
          We are open to collaboration, feedback, and research partnerships.
        </p>

        <p style={styles.text}>
          Whether you are a developer, researcher, or organization interested in language technologies, we would love to hear from you.
        </p>

        <h2 style={styles.subtitle}>Contact Information</h2>
        <p style={styles.text}>📧 Email: support@yourdomain.com</p>
        <p style={styles.text}>🌐 Website: https://yourdomain.com</p>
        <p style={styles.text}>📍 Location: Islamabad, Pakistan (Remote-First Team)</p>

        <h2 style={styles.subtitle}>Business & Research Inquiries</h2>
        <p style={styles.text}>
          For API access, academic collaboration, or integration opportunities, please reach out via email with a clear subject line.
        </p>

        <p style={styles.text}>
          We typically respond within 24–48 hours.
        </p>
      </div>
    </div>
  );
}

export default Contact;

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