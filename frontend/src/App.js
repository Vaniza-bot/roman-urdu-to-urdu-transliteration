import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  };

  const translate = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setOutput(data.translated_text);
    } catch (error) {
      setOutput("Error connecting to backend");
    }

    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">TranslitAI</div>
        <div className="status">Private Beta</div>
      </nav>

      <div className="card">
        <h2>Roman Urdu → Urdu Translator</h2>

        <textarea
          ref={textareaRef}
          placeholder="Enter Roman Urdu..."
          value={text}
          onChange={handleChange}
          className="input"
        />

        <div className="counter">{text.length} characters</div>

        <button className="convert-btn" onClick={translate}>
          {loading ? "Converting..." : "Convert"}
        </button>
      </div>

      {output && (
        <div className="card result">
          <h3>Urdu Output</h3>
          <p>{output}</p>
          <button className="copy-btn" onClick={copyToClipboard}>
            Copy
          </button>
        </div>
      )}
    </div>
  );
}

export default App;