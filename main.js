import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCK8xFznYs4FFuH-JBmXhX69I9iIdFC-DY",
  authDomain: "smart-burme-ai.firebaseapp.com",
  databaseURL: "https://smart-burme-ai-default-rtdb.firebaseio.com",
  projectId: "smart-burme-ai",
  storageBucket: "smart-burme-ai.firebasestorage.app",
  messagingSenderId: "1057673784315",
  appId: "1:1057673784315:web:b7004e00ce88b7ecd3b95e",
  measurementId: "G-VDB178C50B"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const responseDiv = document.getElementById('response');

sendBtn.addEventListener('click', async () => {
  const text = userInput.value.trim();
  if (!text) {
    alert("မေးခွန်းရေးပါ");
    return;
  }

  responseDiv.textContent = "⏳ AI မှာ မေးနေပါပြီ...";

  try {
    const messagesRef = ref(db, 'messages/');
    await push(messagesRef, {
      text: text,
      timestamp: Date.now()
    });
  } catch (e) {
    console.error("Firebase DB write error:", e);
  }

  const geminiKey = "AIzaSyBCMZC7_QlpDmoBT-m4qN39H1Qsg2PNQMY";

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/chat-bison-001:generateMessage?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: {
            messages: [{ author: "user", content: { text: text } }]
          },
          temperature: 0.7,
          maxOutputTokens: 512
        })
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    const reply = data?.candidates?.[0]?.message?.content?.text || "🤖 AI မှ မဖြေနိုင်သေးပါ။";
    responseDiv.textContent = reply;

  } catch (error) {
    console.error("Gemini API error:", error);
    responseDiv.textContent = "❌ AI API မှ ပြဿနာရှိနေပါသည်။ ပြန်ကြိုးစားပါ။";
  }
});
