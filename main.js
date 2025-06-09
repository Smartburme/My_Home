const API_KEY = "AIzaSyChZ-yBEIX_y-M8evNg1wrq85ByBAACoNU";

const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.innerHTML = `<b>${sender}:</b> ${text}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  appendMessage("You", message);
  input.value = "";

  // Save to Firebase
  database.ref("chats").push({ sender: "user", message });

  // Get Gemini AI Response
  const aiReply = await getGeminiResponse(message);
  appendMessage("AI", aiReply);

  // Save to Firebase
  database.ref("chats").push({ sender: "ai", message: aiReply });
}

async function getGeminiResponse(userInput) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userInput }] }]
      })
    }
  );

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
}
