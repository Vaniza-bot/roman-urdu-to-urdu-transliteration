import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function TranslatorBox({ darkMode }) {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (text.trim()) {
        translate(text);
      } else {
        setOutput("");
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [text]);

  const translate = async (inputText) => {
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/translate",
        { text: inputText },
        { withCredentials: true }
      );

      setOutput(res.data.output);
    } catch (err) {
      setOutput("Error connecting to backend");
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setText(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Roman Urdu → Urdu</h2>

        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          placeholder="Type Roman Urdu..."
          style={styles.textarea}
        />

        <div style={styles.counter}>{text.length} characters</div>

        {loading && <div style={styles.loader}></div>}

        {/* 🔥 FIX: prevent layout push */}
        <div style={styles.outputWrapper}>
          {output && (
            <div style={styles.outputBox}>
              <p style={styles.outputText}>{output}</p>

              <button style={styles.button} onClick={copyText}>
                Copy
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TranslatorBox;

/* ================= STYLES ================= */

const styles = {
  wrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "16px",
    borderRadius: "14px",

    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(12px)",

    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",

    display: "flex",
    flexDirection: "column",
    gap: "8px",
    textAlign: "center",
  

    /* 🔥 FIX: remove internal scroll conflict */
    maxHeight: "unset",
    overflow: "visible",
  },

  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#000",
  },

  textarea: {
    minHeight: "10px",
    maxHeight: "23px",

    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    resize: "none",

    background: "rgba(255,255,255,0.9)",
    fontSize: "13px",
  },

  counter: {
    fontSize: "11px",
    color: "#333",
    textAlign: "right",
  },

  loader: {
    width: "20px",
    height: "20px",
    margin: "6px auto",
    border: "3px solid #ddd",
    borderTop: "3px solid #6366f1",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  /* 🔥 NEW WRAPPER FIX */
  outputWrapper: {
    marginTop: "4px",
  },

  outputBox: {
    marginTop: "4px",
  },

  outputText: {
    fontSize: "15px",
    color: "#000",
    fontWeight: "500",
  },

  button: {
    marginTop: "6px",
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    cursor: "pointer",
  },
};