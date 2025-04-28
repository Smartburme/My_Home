// main-bottom.js

// Firebase Initialization
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js';

// Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();

// Handle Authentication - Sign in Anonymously (for demo purposes)
signInAnonymously(auth)
  .then(() => {
    console.log("Signed in anonymously");
  })
  .catch((error) => {
    console.error("Error signing in:", error.message);
  });

// Handle Navigation for Bottom Menu
document.addEventListener('DOMContentLoaded', function() {

  // Navigation links
  const navItems = document.querySelectorAll('.navigation a');
  
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();  // Prevent default anchor behavior
      const selectedItem = e.target.closest('a').getAttribute('href');
      console.log('Navigating to:', selectedItem);
      // Example: Navigate to the selected section
      window.location.href = selectedItem;
    });
  });

  // Handle Floating Add Button Click (Photo/Video upload)
  const addButton = document.querySelector('.add-button');
  addButton.addEventListener('click', function() {
    console.log("Add button clicked");
    openFileUploadDialog();
  });

});

// Open file upload dialog for photo/video upload
function openFileUploadDialog() {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*,video/*';  // Accept both images and videos
  fileInput.click(); // Trigger file input click event

  fileInput.addEventListener('change', function() {
    const file = fileInput.files[0];
    if (file) {
      uploadFile(file);
    }
  });
}

// Upload file to Firebase Storage
function uploadFile(file) {
  const storageRef = ref(storage, 'uploads/' + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }, 
    (error) => {
      console.error("Error uploading file:", error);
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        alert("Upload complete! File URL: " + downloadURL);
      });
    });
}
