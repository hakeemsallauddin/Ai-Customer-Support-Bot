# AI Customer Support Bot

A modern, AI-powered customer support assistant that provides instant answers to user queries and FAQs via a professional conversational interface. Built with Next.js and OpenRouter LLM API. Designed for reliability, usability, and a seamless customer help experience.

---



### Homepage

![Homepage](public/screenshots/homepage.png)

### Chat in Action

![Chat Example](public/screenshots/chat-example.png)

### FAQ Section

![FAQ](public/screenshots/faq.png)

---

## 🚀 Features

### For Customers

- **Instant, AI-driven help:** Automated responses using advanced LLMs via OpenRouter API.
- **Persistent FAQ bar:** Always accessible, with collapsible/expandable questions for quick answers.
- **Modern, professional UI:** Business-ready palette, responsive for all devices.
- **Suggestion & summary:** Summarizes conversations, proposes next user actions!
- **Animated experience:** Smooth, pleasing transitions and chat effects.

---

## 🛠 Tech Stack

### Frontend

- **Next.js 14** — App Router, file-based routing, API routes
- **React 18**
- **JavaScript (ES6+)**
- **CSS-in-JS** (inline styling with modern palette)
- **Custom Components:** FAQSection, ChatBox
- **No database** — Entirely stateless client except for session

### AI & Backend

- **OpenRouter API** — LLM-based conversational support (e.g., Mistral models)
- **Next.js API Routes** — `/api/chat` handles requests to OpenRouter

### Utilities

- **uuid** — For unique message and session IDs
- **Fetch API** — Requests to OpenRouter

---

## 📁 Project Structure

ai-customer-support-bot/
├── app/
│ ├── page.tsx
│ ├── layout.tsx
├── components/
│ ├── ChatBox.jsx
│ └── FAQSection.jsx
├── data/
│ └── faqs.json
├── pages/
│ ├── api/
│ │ └── chat.js
├── public/
│ ├── icons/
│ └── screenshots/
├── README.md


---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenRouter API key

---

### Installation

Clone the repository:

git clone https://github.com/hakeemsallauddin/Ai-Customer-Support-Bot.git
cd Ai-Customer-Support-Bot


Install dependencies:

npm install

**Add your OpenRouter API key:**  
- Edit `/pages/api/chat.js` and replace the placeholder for 'Authorization' with your real OpenRouter API Key. or create an env file and add your api key for usage.

### Running Locally

npm run dev

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 🎯 Key Features Explained

### Conversational AI

Uses OpenRouter-powered LLMs to generate natural, contextually aware support answers.

### FAQ Section

Collapsible FAQ bar at the top, giving users access to instant help for common questions.

### Real-Time Suggestions

Each assistant response ends with a summary or suggested next actions for the user.

### Professional UX

- Modern animation and transitions
- Responsive chat window
- Accessible from mobile and desktop
- Subtle AI branding via watermark

---

## 🛠️ Customization

- **Edit FAQs:** Update `data/faqs.json` to reflect your business domain.
- **UI Colors:** Change color palette in the component CSS blocks in `/components/ChatBox.jsx`.
- **Model Choice:** Change the OpenRouter model in `/pages/api/chat.js`.
- **Branding:** Replace logo or watermark with your brand assets (in `/public`).

---

## 🚀 Deployment

### Deploy on [Vercel](https://vercel.com/), Netlify, or any Next.js-ready platform

1. Connect your GitHub repository.
2. Set the OpenRouter API key in your platform's environment (or directly in your API route as placeholder).
3. Deploy!

---

## 🤝 Contributing

1. Fork this repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 🆘 Support

For support, open an issue in the GitHub repo or email: [your-email@example.com]

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [OpenRouter](https://openrouter.ai/) (API for LLMs)

---

MIT License © 2025 hakeemsallauddin
