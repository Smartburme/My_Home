// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAr7Hv2ApKtNTxF11MhT5cuWeg_Dgsh0TY",
  authDomain: "smart-burme-app.firebaseapp.com",
  projectId: "smart-burme-app",
  storageBucket: "smart-burme-app.appspot.com",
  messagingSenderId: "851502425686",
  appId: "1:851502425686:web:f29e0e1dfa84794b4abdf7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Bottom Navigation Buttons
const homeButton = document.getElementById('homeBtn');
const peopleButton = document.getElementById('peopleBtn');
const chatButton = document.getElementById('chatBtn');
const profileButton = document.getElementById('profileBtn');

// Navigation Actions
homeButton.addEventListener('click', function(event) {
  event.preventDefault();
  navigateToHome();
});

peopleButton.addEventListener('click', function(event) {
  event.preventDefault();
  navigateToPeople();
});

chatButton.addEventListener('click', function(event) {
  event.preventDefault();
  navigateToChat();
});

profileButton.addEventListener('click', function(event) {
  event.preventDefault();
  navigateToProfile();
});

// Navigation Functions
function navigateToHome() {
  console.log("Navigating to Home Page...");
  alert("Navigating to Home");
  // Optionally load home content dynamically or redirect to the home page
}

function navigateToPeople() {
  console.log("Navigating to People Page...");
  alert("Navigating to People");
  // You can redirect or show friends list
}

function navigateToChat() {
  console.log("Navigating to Chat Page...");
  alert("Navigating to Chat");
  // You can redirect to a chat view or show messages
}

function navigateToProfile() {
  console.log("Navigating to Profile Page...");
  alert("Navigating to Profile");
  // You can redirect or load user's profile info dynamically
}

// Firebase Authentication Logic (Check if the user is logged in)
auth.onAuthStateChanged(user => {
  if (user) {
    console.log("User is logged in:", user.email);
  } else {
    console.log("No user logged in");
  }
});
