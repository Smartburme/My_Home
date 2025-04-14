// Redirect to Chatting Page after Login
function redirectToChat(event) {
    event.preventDefault();
    // Normally validate login here
    window.location.href = 'chatting.html';
}

// Handle Forgot Password
function handleForgotPassword(event) {
    event.preventDefault();
    const form = event.target;
    const emailInput = form.querySelector('input[type="email"]');
    const messageElement = document.getElementById('message');

    const email = emailInput ? emailInput.value.trim() : '';

    if (email) {
        // Simulate server-side reset request
        messageElement.textContent = `A password reset link has been sent to ${email}`;
        messageElement.style.color = 'limegreen';
    } else {
        messageElement.textContent = 'Please enter a valid email address.';
        messageElement.style.color = 'crimson';
    }
}

// File upload function (chatting.html)
function uploadFile() {
    const fileInput = document.getElementById('fileUpload');
    const file = fileInput?.files[0];

    if (file) {
        alert(`File uploaded: ${file.name}`);
    } else {
        alert('Please select a file to upload.');
    }
}

// Chat View Navigation Functions
function openPrivateChat() {
    alert('Opening Private Chat...');
}

function openGroupChat() {
    alert('Opening Group Chat...');
}

function openMyGroup() {
    alert('Opening My Groups...');
}
