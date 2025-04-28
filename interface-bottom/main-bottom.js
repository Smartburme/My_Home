// Firebase Init
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAr7Hv2ApKtNTxF11MhT5cuWeg_Dgsh0TY",
  authDomain: "smart-burme-app.firebaseapp.com",
  projectId: "smart-burme-app",
  storageBucket: "smart-burme-app.appspot.com",
  messagingSenderId: "851502425686",
  appId: "1:851502425686:web:f29e0e1dfa84794b4abdf7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

// --- Bottom Navigation Functions ---

function loadHomeContent() {
  console.log("Home Page Loaded");
}

function loadFriendList() {
  console.log("Friend List Loaded");
}

function uploadNewPost() {
  console.log("Add New Post Page Opened");
}

function loadMessages() {
  console.log("Messages Page Loaded");
}

function loadUserProfile() {
  console.log("User Profile Page Loaded");
}

// --- Bottom Navigation Event Handler ---
document.addEventListener('DOMContentLoaded', () => {
  const bottomIcons = document.querySelectorAll('.bottom-icon');

  bottomIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      const target = e.currentTarget.getAttribute('data-target');

      switch (target) {
        case 'home':
          loadHomeContent();
          break;
        case 'friend':
          loadFriendList();
          break;
        case 'add':
          uploadNewPost();
          break;
        case 'message':
          loadMessages();
          break;
        case 'account':
          loadUserProfile();
          break;
        default:
          console.log("Unknown action");
      }
    });
  });
});
