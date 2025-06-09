const API_KEY = "AIzaSyBCMZC7_QlpDmoBT-m4qN39H1Qsg2PNQMY";
let genAI;

async function initGemini() {
  const { GoogleGenerativeAI } = window;
  genAI = new GoogleGenerativeAI(API_KEY);
}

async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("You", message);
  input.value = "";

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(message);
    const reply = result.response.text();
    appendMessage("AI", reply);
  } catch (err) {
    appendMessage("AI", "⚠️ Error: " + err.message);
  }
}

function appendMessage(sender, text) {
  const box = document.getElementById("chat-box");
  const messageElem = document.createElement("div");
  messageElem.innerHTML = `<strong>${sender}:</strong> ${text}`;
  box.appendChild(messageElem);
  box.scrollTop = box.scrollHeight;
}

// Initialize Gemini API
initGemini();
