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
