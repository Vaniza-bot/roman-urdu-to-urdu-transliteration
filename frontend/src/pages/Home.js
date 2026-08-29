import React, { useState } from "react";
import TranslatorBox from "../components/TranslatorBox";

function Home() {
  const [darkMode] = useState(false);

  return (
    <div style={styles.page}>
      
      {/* CENTER AREA */}
      <div style={styles.centerWrapper}>
        <div style={styles.card}>
          <h2 style={styles.title}>SAEVIZA AI Transliterator</h2>

          <p style={styles.tagline}>
            Roman Urdu → Urdu Transliteration
          </p>

          <TranslatorBox darkMode={darkMode} />
        </div>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        <div>© 2026 SAEVIZA AI • Built by Saleha Eman & Vaniza Shahid</div>

        <div style={{ marginTop: "4px" }}>
          A research-based Roman Urdu to Urdu transliteration web system developed at University of Education, Attock Campus
        </div>

        <div>
          Powered by NLP and machine learning to improve Urdu language accessibility.
        </div>
      </div>

    </div>
  );
}

export default Home;

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    justifyContent: "flex-start", // 🔥 FIX: removes flex centering issue
    background: "transparent",
  },

  centerWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",

    paddingTop: "95px",
    paddingBottom: "125px",
  },

  card: {
    width: "380px",
    padding: "14px",
    borderRadius: "14px",

    background: "#ffffff",
    boxShadow: "0px 10px 20px rgba(0,0,0,0.10)",

    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  title: {
    fontSize: "19px",
    fontWeight: "bold",
  },

  tagline: {
    fontSize: "13px",
    fontWeight: "500",
  },

  footer: {
  marginTop: "-100px",    // 🔥 increased a bit more
  paddingBottom: "-140px",
  fontSize: "12px",
  opacity: 0.7,
  textAlign: "center",
},
};