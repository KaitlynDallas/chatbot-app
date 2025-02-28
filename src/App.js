import React from "react";
import Chatbot from "./components/Chatbot";
import ImagePlaceholder from "./ImagePlaceholder.png"; // ✅ Import the image

function App() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100vw",
      height: "100vh",
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      boxSizing: "border-box"
    }}>
      {/* Left-aligned title and image */}
      <div style={{ position: "absolute", top: "20px", left: "20px" }}>
        <h1 style={{ marginBottom: "10px", fontSize: "clamp(16px, 2vw, 32px)" }}>Query Bot</h1>
        <img 
          src={ImagePlaceholder} 
          alt="Query Bot" 
          style={{ width: "clamp(100px, 15vw, 200px)", height: "auto", marginBottom: "10px" }} 
        />
      </div>

      {/* Centered chatbox with dynamic width */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "1px" }}>
        <Chatbot />
      </div>

      {/* Help & Feedback Links */}
      <div style={{ textAlign: "center", marginTop: "1px" }}>
        <p>
          <a href="#" style={{ color: "#007bff", textDecoration: "none", fontSize: "clamp(12px, 1.5vw, 16px)" }}>
            Help Documentation
          </a>
        </p>
        <p>
          <a href="#" style={{ color: "#007bff", textDecoration: "none", fontSize: "clamp(12px, 1.5vw, 16px)" }}>
            Provide Feedback
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
