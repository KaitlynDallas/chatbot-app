import React, { useState } from "react";

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [lastQuestion, setLastQuestion] = useState("");
  const [lastResponse, setLastResponse] = useState(""); // New state for last bot response

  const sendQuestion = async () => {
    if (!question.trim()) return;
    const newChat = [...chat, { type: "user", text: question }];
    setChat(newChat);
    setLastQuestion(question);
    setQuestion("");
    
    const blob = new Blob([question], { type: "text/plain" });
    const formData = new FormData();
    formData.append("file", blob, "question.txt");

    try {
      await fetch("http://localhost:5001/upload", {
        method: "POST",
        body: formData,
      });
      fetchResponse(newChat);
    } catch (error) {
      console.error("Error sending question:", error);
    }
  };

  const fetchResponse = async (updatedChat) => {
    try {
      const res = await fetch("http://localhost:5001/response");
      const blob = await res.blob();
      const reader = new FileReader();

      reader.onload = function () {
        const responseText = reader.result;
        setChat([...updatedChat, { type: "bot", text: responseText }]);
        setLastResponse(responseText); // Update the last response
      };

      reader.readAsText(blob);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  const exportChat = () => {
    const chatText = chat
      .map((msg) => `${msg.type === "user" ? "User" : "Bot"}: ${msg.text}`)
      .join("\n");
    const blob = new Blob([chatText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "chat_history.txt";
    link.click();
  };

  // New function to export the last bot response
  const exportLastResponse = () => {
    if (!lastResponse) {
      console.warn("No last response available to export.");
      return;
    }
    const blob = new Blob([lastResponse], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "last-response.txt";
    link.click();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <div style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "15px", height: "60vh", overflowY: "auto" }}>
        {chat.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                backgroundColor: msg.type === "user" ? "#007bff" : "#e5e5e5",
                color: msg.type === "user" ? "white" : "black",
                padding: "10px 15px",
                borderRadius: "15px",
                maxWidth: "70%",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", marginTop: "15px" }}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your query..."
          style={{ flex: 1, padding: "10px", borderRadius: "20px", border: "1px solid #ccc", resize: "none", minHeight: "40px" }}
        />
        <button
          onClick={sendQuestion}
          style={{ marginLeft: "10px", padding: "10px 15px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "20px", cursor: "pointer" }}
        >
          Send
        </button>
      </div>
      <button
        onClick={() => setQuestion(lastQuestion)}
        style={{ marginTop: "10px", padding: "10px", backgroundColor: "#ffc107", color: "black", border: "none", borderRadius: "5px", cursor: "pointer", width: "100%" }}
      >
        Edit Search
      </button>
      <button
        onClick={exportChat}
        style={{ marginTop: "10px", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", width: "100%" }}
      >
        Export Full Chat
      </button>
      <button
        onClick={exportLastResponse}
        style={{ marginTop: "10px", padding: "10px", backgroundColor: "#17a2b8", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", width: "100%" }}
      >
        Export Last Response
      </button>
    </div>
  );
};

export default Chatbot;
