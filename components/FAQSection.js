import React, { useState } from "react";

function FAQSection({ faqs, onSelect }) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className={`faq-sticky-top${collapsed ? " collapsed" : ""}`}>
      <div className="faq-header" onClick={() => setCollapsed(!collapsed)}>
        <span>Frequently Asked Questions</span>
        <button className="faq-toggle" aria-label="Toggle FAQ">
          <svg
            width="21"
            height="21"
            viewBox="0 0 20 20"
            fill="none"
            style={{ transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: "transform .2s" }}
          >
            <path d="M5 8L10 13L15 8" stroke="#222a" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {!collapsed && (
        <div className="faq-list">
          {faqs.map((f, idx) => (
            <button key={idx} onClick={() => onSelect(f.question)} className="faq-q">
              {f.question}
            </button>
          ))}
        </div>
      )}
      <style jsx>{`
        .faq-sticky-top {
          position: sticky;
          top: 64px; /* Adjust based on your header height */
          width: 100%;
          background: #f1f5f9;
          box-shadow: 0 1px 6px 0 #0001;
          border-radius: 12px;
          margin-bottom: 15px;
          z-index: 9;
          padding: 0;
          max-width: 100%;
        }
        .faq-header {
          font-weight: 600;
          padding: 15px 20px 9px 20px;
          font-size: 17px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          border-bottom: 1px solid #e5e7eb;
          background: #f1f5f9;
          border-radius: 12px 12px 0 0;
        }
        .faq-toggle {
          border: none;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          margin-left: 10px;
          padding: 0;
        }
        .faq-list {
          padding: 10px 20px 14px 20px;
        }
        .faq-q {
          display: block;
          background: none;
          border: none;
          color: #2463eb;
          font-size: 15px;
          cursor: pointer;
          margin-bottom: 4px;
          padding: 4px 0 4px 0;
          width: 100%;
          text-align: left;
          border-radius: 4px;
          transition: background 0.14s;
        }
        .faq-q:hover {
          background: #e8effc;
        }
      `}</style>
    </div>
  );
}
export default FAQSection;
