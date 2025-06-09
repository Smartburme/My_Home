import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// Firebase Init
initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage();

// Gemini
const genAI = new GoogleGenerativeAI("AIzaSyBCMZC7_QlpDmoBT-m4qN39H1Qsg2PNQMY");

document.getElementById("login-btn").onclick = () => signInWithPopup(auth, provider);
document.getElementById("logout-btn").onclick = () => signOut(auth);

onAuthStateChanged(auth, user => {
  if (user) {
    document.getElementById("login-btn").style.display = "none";
    document.getElementById("user-info").style.display = "inline";
    document.getElementById("user-pic").src = user.photoURL;
    document.getElementById("user-name").textContent = user.displayName;
  } else {
    document.getElementById("login-btn").style.display = "block";
    document.getElementById("user-info").style.display = "none";
  }
});

async function sendMessage() {
  const input = document.getElementById("user-input").value.trim();
  const file = document.getElementById("img-upload").files[0];

  if (!input && !file) return;

  appendMessage("You", input || "(image)");

  if (file) {
    // Upload image to Firebase Storage
    const imgRef = ref(storage, "uploads/" + file.name);
    await uploadBytes(imgRef, file);
    const url = await getDownloadURL(imgRef);

    const blob = await fetch(url).then(r => r.blob());
    const base64 = await toBase64(blob);

    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const result = await model.generateContent([
      { text: input || "What's in this image?" },
      { inlineData: { mimeType: file.type, data: base64 } }
    ]);
    appendMessage("AI", result.response.text());
  } else {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(input);
    appendMessage("AI", result.response.text());
  }

  document.getElementById("user-input").value = "";
  document.getElementById("img-upload").value = "";
}

function appendMessage(sender, text) {
  const box = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.innerHTML = `<strong>${sender}:</strong> ${text}`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function toBase64(blob) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onloadend = () => res(reader.result.split(',')[1]);
    reader.onerror = rej;
    reader.readAsDataURL(blob);
  });
}
