// Firebase Initialization
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "smart-burme-app.firebaseapp.com",
  projectId: "smart-burme-app",
  storageBucket: "smart-burme-app.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

// Firebase Authentication object
const auth = firebase.auth();

// -------------------------
// Login Function
// -------------------------
function loginUser(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Redirect to mail.html
      window.location.href = "mail.html";
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
}

// -------------------------
// Register Function
// -------------------------
function registerUser(email, password) {
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Registration successful!");
      window.location.href = "mail.html";
    })
    .catch((error) => {
      alert("Register failed: " + error.message);
    });
}

// -------------------------
// Forget Password Function
// -------------------------
function resetPassword(email) {
  auth.sendPasswordResetEmail(email)
    .then(() => {
      alert("Password reset email sent!");
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

// -------------------------
// Logout Function
// -------------------------
function logoutUser() {
  auth.signOut()
    .then(() => {
      window.location.href = "login.html";
    });
}
