import React, { useState } from "react";

function SuggestionBox() {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      alert("Please write something first");
      return;
    }

    alert("Suggestion submitted: " + text);
    setText("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Suggestion Box</h2>
        <p style={styles.subtitle}>
          We value your feedback to improve our platform
        </p>

        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your suggestion..."
            style={styles.textarea}
          />

          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SuggestionBox;

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    padding: "20px",
  },

  card: {
    width: "450px",
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
    textAlign: "center",
  },

  title: {
    fontSize: "22px",
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: "13px",
    color: "gray",
    marginBottom: "15px",
  },

  textarea: {
    width: "95%",
    height: "120px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
    resize: "none",
  },

  button: {
    marginTop: "12px",
    padding: "10px 18px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
};