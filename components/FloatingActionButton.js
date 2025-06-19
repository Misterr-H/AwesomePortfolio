import React from "react";

const buttonStyle = {
  position: "fixed",
  bottom: "32px",
  right: "32px",
  zIndex: 1000,
  background: "#222",
  color: "#fff",
  padding: "16px 24px",
  borderRadius: "32px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
  fontWeight: 600,
  fontSize: "1rem",
  textDecoration: "none",
  transition: "transform 0.2s cubic-bezier(0.4,0,0.2,1), background 0.2s",
  cursor: "pointer",
  display: "inline-block"
};

const FloatingActionButton = () => {
  return (
    <a
      href="https://buy.himanshu-saini.com"
      style={buttonStyle}
      className="floating-action-btn"
      target="_blank"
      rel="noopener noreferrer"
    >
      Liked this portfolio? Make it yours -&gt;
      <style jsx>{`
        .floating-action-btn:hover {
          transform: scale(1.08);
        }
      `}</style>
    </a>
  );
};

export default FloatingActionButton; 