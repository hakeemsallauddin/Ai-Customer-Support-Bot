import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import faqs from '../data/faqs.json';
import FAQSection from "./FAQSection";

const BOT_AVATAR = "https://cdn-icons-png.flaticon.com/512/4712/4712027.png";
const USER_AVATAR = "https://cdn-icons-png.flaticon.com/512/147/147144.png";
const LOGO = "https://cdn-icons-png.flaticon.com/512/906/906175.png";

function handleEscalation(setMessages) {
  setMessages(prev => [
    ...prev,
    { id: uuidv4(), content: "Let me escalate this issue to a human agent.", sender: "bot" }
  ]);
}

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    let sid = localStorage.getItem("chat-session-id");
    if (!sid) {
      sid = uuidv4();
      localStorage.setItem("chat-session-id", sid);
    }
    setSessionId(sid);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");
    const userMessage = { id: uuidv4(), content: text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    // "escalate" keyword check preserved, in case you want escalation to trigger by chat only
    if (text.toLowerCase().includes("escalate")) {
      handleEscalation(setMessages);
      return;
    }
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ message: text, sessionId }),
      });
      const data = await res.json();
      const botMessage = {
        id: uuidv4(),
        content: data.answer,
        sender: "bot",
        summary: data.summary || null,
      };
      const escalateMessage = {
        id: uuidv4(),
        content: "If you have further queries, we can escalate the issue to our human agent.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage, escalateMessage]);
    } catch (error) {
      console.error("Chat API Error:", error);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") sendMessage();
  }

  function handleFAQSelect(question) {
    const faq = faqs.find((f) => f.question === question);
    const escalateMessage = {
      id: uuidv4(),
      content: "If you have further queries, we can escalate the issue to our human agent.",
      sender: "bot",
    };
    setMessages((prev) => [
      ...prev,
      { id: uuidv4(), content: question, sender: "user" },
      { id: uuidv4(), content: faq?.answer, sender: "bot" },
      escalateMessage,
    ]);
  }

  return (
    <div className="chat-container">
      <div className="watermark">AI Customer Support</div>
      <div className="chat-header">
        <img src={LOGO} alt="Logo" className="logo" />
        <h2 className="header-title">AI Customer Support Bot</h2>
      </div>
      <FAQSection faqs={faqs} onSelect={handleFAQSelect} />
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-bubble ${msg.sender} fade-in`}>
            <img
              src={msg.sender === "bot" ? BOT_AVATAR : USER_AVATAR}
              className="avatar"
              alt={`${msg.sender} avatar`}
            />
            <div className="content">{msg.content}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="summary-box">
        💡 <strong>Summary & Suggestions:</strong> Assistant is ready to help.
      </div>
      <div className="input-wrapper">
        <div className="chat-input-area">
          <input
            type="text"
            className="chat-input"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button className="send-button" onClick={sendMessage}>
            <svg width="28" height="28" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <line x1="26" y1="4" x2="14" y2="17"></line>
              <polygon points="26 4 18 26 14 17 2 11 26 4"></polygon>
            </svg>
          </button>
        </div>
      </div>
      <style jsx>{`
        * { font-family: "Segoe UI", Arial, sans-serif; }
        .chat-container {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: linear-gradient(135deg, #e3edfc 0%, #f6f9fc 100%);
          color: #1a1f36;
          overflow: hidden;
        }
        .watermark {
          position: absolute;
          z-index: 0;
          top: 56%;
          left: 50%;
          width: 490px;
          height: 120px;
          transform: translate(-50%, -50%);
          pointer-events: none;
          opacity: 0.10;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.6rem;
          font-weight: 700;
          letter-spacing: 4px;
          color: #144272;
          user-select: none;
          text-align: center;
        }
        .chat-header {
          display: flex;
          align-items: center;
          padding: 1rem 2rem;
          background: #144272;
          color: #fff;
          font-size: 1.18rem;
          font-weight: 600;
          box-shadow: 0 2px 8px #14427211;
        }
        .logo { width: 38px; margin-right: 14px; }
        .chat-messages {
          flex: 1;
          padding: 24px 30px;
          overflow-y: auto;
          background: none;
          z-index: 1;
        }
        .chat-bubble {
          display: flex;
          align-items: flex-end;
          margin-bottom: 18px;
          max-width: 78%;
          word-wrap: break-word;
          line-height: 1.5;
          opacity: 0;
          transform: translateY(12px);
          animation: fadeIn 0.35s cubic-bezier(.38,1.24,.58,1) forwards;
        }
        .fade-in { animation-delay: 0.05s; }
        .chat-bubble.bot { justify-content: flex-start; }
        .chat-bubble.user { justify-content: flex-end; margin-left: auto; }
        .avatar { width: 38px; height: 38px; border-radius: 50%; margin: 0 11px; }
        .chat-bubble .content {
          padding: 13px 20px;
          border-radius: 18px;
          font-size: 1rem;
          font-weight: 500;
          box-shadow: 0 2px 10px #1442720c;
          background: #e8eef8;
          color: #133662;
          border: 1.5px solid rgba(44,44,44,0.14); /* Light black border */
          white-space: pre-wrap;
          transition: background 0.18s, border 0.18s;
        }
        .chat-bubble.bot .content {
          background: linear-gradient(90deg, #e8eef8 0%, #f0f3f6 95%);
          color: #133662;
        }
        .chat-bubble.user .content {
          background: linear-gradient(90deg, #2563eb 0%, #1e293b 100%);
          color: #fff;
        }
        .summary-box {
          background: #f7fafc;
          padding: 11px 22px;
          font-size: 1rem;
          color: #4361ee;
          font-weight: 500;
          border-top: 1.5px solid #a4bdfc;
          z-index: 2;
        }
        .input-wrapper {
          position: sticky;
          bottom: 0;
          background: #fff;
          padding: 1.05rem .5rem;
          border-top: 2px solid #deebfc;
          z-index: 4;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .chat-input-area {
          display: flex;
          align-items: center;
          width: 100%;
          max-width: 900px;
          background: #f4f6fb;
          border-radius: 25px;
          padding: 9px 18px;
          box-shadow: 0 3px 9px #dbeafe22;
          transition: box-shadow 0.2s, border-color 0.2s;
        }
        .chat-input {
          flex: 1;
          padding: 13px 12px;
          border: none;
          border-radius: 15px;
          outline: none;
          background: transparent;
          font-size: 1rem;
          color: #1a212b;
        }
        .chat-input::placeholder { color: #86a1c7; }
        .send-button {
          width: 36px;
          height: 36px;
          margin-left: 9px;
          background: linear-gradient(90deg, #2563eb 0%, #144272 100%);
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .send-button svg { stroke: #fff; }
        @keyframes fadeIn {
          to { opacity: 1; transform: translateY(0);}
        }
        @media (max-width: 900px) {
          .chat-header { font-size: 0.98rem; padding: 10px 6px;}
          .chat-messages { padding: 8px 2px; }
          .chat-input-area { max-width: 98%; }
          .summary-box { font-size: .95rem; }
          .watermark { font-size: 1.1rem; width: 190px;}
        }
      `}</style>
    </div>
  );
}
