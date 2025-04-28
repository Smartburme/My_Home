// Firebase Configuration (Set up your Firebase config here)
const firebaseConfig = {
    apiKey: "AIzaSyAr7Hv2ApKtNTxF11MhT5cuWeg_Dgsh0TY",
    authDomain: "smart-burme-app.firebaseapp.com",
    projectId: "smart-burme-app",
    storageBucket: "smart-burme-app.appspot.com",
    messagingSenderId: "851502425686",
    appId: "1:851502425686:web:f29e0e1dfa84794b4abdf7"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();

// Floating Add Button Click Event
const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', function() {
  // Redirect to the photo/video upload page or open upload modal
  alert("Upload your photo/video!");
  // You can also add logic to open a modal for file selection, etc.
});

// Bottom Navigation Logic
const homeButton = document.querySelector('.navigation a:nth-child(1)');
const peopleButton = document.querySelector('.navigation a:nth-child(2)');
const chatButton = document.querySelector('.navigation a:nth-child(3)');
const profileButton = document.querySelector('.navigation a:nth-child(4)');

// Navigate to different sections
homeButton.addEventListener('click', function() {
  alert("Navigating to Home");
  // Add your logic here to load the home section (e.g., load main feed)
});

peopleButton.addEventListener('click', function() {
  alert("Navigating to People");
  // Add your logic here to load the people section (e.g., load friends list)
});

chatButton.addEventListener('click', function() {
  alert("Navigating to Chat");
  // Add your logic here to load the chat section (e.g., load message inbox)
});

profileButton.addEventListener('click', function() {
  alert("Navigating to Profile");
  // Add your logic here to load the profile section
});

// Firebase Authentication Logic (Example: Login)
auth.onAuthStateChanged(user => {
  if (user) {
    console.log("User is logged in:", user.email);
  } else {
    console.log("No user logged in");
  }
});

// File Upload Logic (For Floating Add Button - Upload photo/video)
function uploadFile(file) {
  const storageRef = storage.ref();
  const fileRef = storageRef.child('uploads/' + file.name);

  fileRef.put(file).then(() => {
    alert("File uploaded successfully!");
  }).catch((error) => {
    console.error("Error uploading file:", error);
  });
}
