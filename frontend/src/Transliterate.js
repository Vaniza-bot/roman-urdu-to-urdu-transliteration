import React, { useState } from "react";
import axios from "axios";

function Transliterate() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim()) {
      alert("Please enter Roman Urdu text");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/translate",
        { text },
        { withCredentials: true }
      );

      setResult(res.data.output);
    } catch (err) {
      alert(err.response?.data?.msg || "Translation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>SAEVIZA AI Transliterator</h1>

        <p style={styles.subtitle}>
          Roman Urdu → Urdu
        </p>

        <textarea
          placeholder="Enter Roman Urdu text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.textarea}
        />

        <button
          onClick={handleTranslate}
          style={styles.button}
          disabled={loading}
        >
          {loading ? "Translating..." : "Translate"}
        </button>

        {result && (
          <div style={styles.resultBox}>
            <h3>Urdu Translation</h3>
            <p style={styles.result}>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Transliterate;

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #91e3f8, #ffffff)",
    padding: "20px",
    boxSizing: "border-box",
  },

  card: {
    width: "600px",
    maxWidth: "95%",
    padding: "35px",
    borderRadius: "15px",
    backgroundColor: "white",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },

  title: {
    textAlign: "center",
    color: "#111827",
    marginBottom: "5px",
  },

  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: "25px",
  },

  textarea: {
    width: "100%",
    minHeight: "150px",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
    resize: "vertical",
    boxSizing: "border-box",
    outline: "none",
  },

  button: {
    width: "100%",
    marginTop: "15px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  resultBox: {
    marginTop: "25px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f3f4f6",
  },

  result: {
    fontSize: "22px",
    direction: "rtl",
    textAlign: "right",
    lineHeight: "1.8",
  },
};