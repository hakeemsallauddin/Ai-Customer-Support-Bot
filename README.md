# AI Customer Support Bot

A modern, AI-powered customer support chatbot using OpenRouter’s LLM API. Features instant answer generation, an always-visible FAQ panel, clean Next.js frontend, and an easy setup workflow for rapid deployment.

---

## 📁 Project Structure

ai-customer-support-bot/
│
├── app/
│ ├── page.tsx
│ └── layout.tsx
│
├── components/
│ ├── ChatBox.jsx
│ └── FAQSection.jsx
│
├── data/
│ └── faqs.json
│
├── pages/
│ └── api/
│ └── chat.js
│
├── public/
│ └── icons/
│

---

## 🚀 Installation

### 1. Clone the repository

git clone https://github.com/hakeemsallauddin/Ai-Customer-Support-Bot.git
cd ai-customer-support-bot


### 2. Install dependencies

npm install


### 3. Environment Variables

Create a `.env.local` file in the root directory:

OPENROUTER_API_KEY=your_openrouter_api_key


Replace `your_openrouter_api_key` with your actual OpenRouter API key.

---

## 💡 Usage

1. **Start the development server**

npm run dev


2. **Open the app** in your browser at [http://localhost:3000](http://localhost:3000).

---

## 🎯 Key Features

- **AI-Powered Replies**: Integrates OpenRouter LLM models for real-time question & answer support.
- **FAQ Panel**: Always-accessible dropdown FAQ for instant answers to common questions.
- **Summary & Suggestions**: Each answer ends with a brief summary and suggested next steps.
- **Modern, Business UI**: Clean, professional design with slate blue palette and smooth chat experience.
- **No Backend Database Needed**: All state is maintained in memory/API; easy to deploy anywhere.

---

## 🛠️ Tech Stack

| Layer    | Technology                |
|----------|---------------------------|
| Frontend | Next.js, React 18         |
| Styling  | CSS-in-JS (inline styles) |
| AI Model | OpenRouter LLM API        |
| State    | React useState            |
| Auth     | API Key (.env.local)      |

---

## ⚙️ Customization

- **FAQ List**: Edit `data/faqs.json` to update support questions.
- **Model**: Change the `model` field in `/pages/api/chat.js` to use another OpenRouter-supported model.
- **Design**: Update CSS styles in `ChatBox.jsx` and `FAQSection.jsx` for branding.

---

## 🚀 Deployment

You can deploy to any platform that supports Next.js:

- Vercel (recommended)
- Netlify
- Railway
- AWS Amplify
- Heroku

Simply connect your GitHub repo, set the `OPENROUTER_API_KEY` env variable, and deploy.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Describe feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Open a Pull Request

---

## 🆘 Support

For issues or questions, please open an issue in this repository.

---

## 📝 License

MIT © 2025 hakeemsallauddin

---

> Crafted for modern, AI-driven customer excellence with minimal setup and maximum reliability.

