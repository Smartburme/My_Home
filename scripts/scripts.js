// Redirect to Chatting Page after Login
function redirectToChat(event) {
    event.preventDefault();
    // Here you would typically validate the login credentials
    window.location.href = 'chatting.html';
}

// Handle Forgot Password
function handleForgotPassword(event) {
    event.preventDefault();
    const email = event.target[0].value; // Get the email input value
    const messageElement = document.getElementById('message');

    // Simulate sending a password reset email
    if (email) {
        // Here you would typically send a request to your server to handle the password reset
        messageElement.textContent = 'A password reset link has been sent to ' + email;
        messageElement.style.color = 'green';
    } else {
        messageElement.textContent = 'Please enter a valid email address.';
        messageElement.style.color = 'red';
    }
}

// Function to handle file upload (for chatting.html)
function uploadFile() {
    const fileInput = document.getElementById('fileUpload');
    if (fileInput.files.length > 0) {
        // Here you would typically handle the file upload
        alert('File uploaded: ' + fileInput.files[0].name);
    } else {
        alert('Please select a file to upload.');
    }
}

// Functions to open different chat views (for chatting.html)
function openPrivateChat() {
    // Logic to open private chat
    alert('Opening Private Chat...');
}

function openGroupChat() {
    // Logic to open group chat
    alert('Opening Group Chat...');
}

function openMyGroup() {
    // Logic to open my groups
    alert('Opening My Groups...');
}
