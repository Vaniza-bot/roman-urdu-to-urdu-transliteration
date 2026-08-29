import React from "react";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>TranslitAI</h2>

      <div style={styles.links}>
        <a href="#how">How it Works</a>
        <a href="#why">Why Use</a>
        <a href="#faq">FAQ</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;

const styles = {
  nav: {
    position: "fixed",
    top: 0,
    width: "100%",
    height: "60px",
    background: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 25px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    zIndex: 1000,
  },
  logo: {
    fontWeight: "700",
  },
  links: {
    display: "flex",
    gap: "18px",
  },
};