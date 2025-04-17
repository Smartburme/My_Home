// Firebase SDK ထည့်ပါ
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAr7Hv2ApKtNTxF11MhT5cuWeg_Dgsh0TY",
  authDomain: "smart-burme-app.firebaseapp.com",
  projectId: "smart-burme-app",
  storageBucket: "smart-burme-app.appspot.com",
  messagingSenderId: "851502425686",
  appId: "1:851502425686:web:f29e0e1dfa84794b4abdf7"
};

// Firebase initialization
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// User Login Function
export function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('Logged in successfully', user);
      // Redirect to main page or dashboard
    })
    .catch((error) => {
      console.error('Error logging in:', error.message);
    });
}

// User Registration Function
export function register(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Registration successful', user);
      // Redirect to login page or home
    })
    .catch((error) => {
      console.error('Error registering:', error.message);
    });
}

// Password Reset Function
export function resetPassword(email) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log('Password reset email sent!');
    })
    .catch((error) => {
      console.error('Error sending reset email:', error.message);
    });
}
