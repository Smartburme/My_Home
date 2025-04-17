// auth.js

import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

// Firebase app initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login function (User login & redirection)
window.login = function() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Firebase authentication logic (sign-in process)
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Successfully signed in, redirect to main.html
      window.location.href = "main.html";  // Redirect to main.html after successful login
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Login failed: " + errorMessage);  // Show alert with error message
    });
}
