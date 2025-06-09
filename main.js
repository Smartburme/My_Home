// Firebase Import & Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCK8xFznYs4FFuH-JBmXhX69I9iIdFC-DY",
  authDomain: "smart-burme-ai.firebaseapp.com",
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
  if (!text) return alert("မေးခွန်းရေးပါ");

  responseDiv.textContent = "⏳ AI မှာ မေးနေပါပြီ...";

  // Firebase မှာ Message သိမ်းမယ်
  const messagesRef = ref(db, 'messages/');
  await push(messagesRef, {
    text: text,
    timestamp: Date.now()
  });

  // Gemini API Key (သင်ပေးထားတဲ့)
  const geminiKey = "AIzaSyBCMZC7_QlpDmoBT-m4qN39H1Qsg2PNQMY";

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: text }] }]
        })
      }
    );

    const data = await res.json();

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "🤖 AI မှ မဖြေနိုင်သေးပါ။";
    responseDiv.textContent = reply;

  } catch (error) {
    console.error(error);
    responseDiv.textContent = "❌ AI API မှ ပြဿနာရှိနေပါသည်။ ပြန်ကြိုးစားပါ။";
  }
});
