document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    
    // Initial greeting from SB Ai
    addBotMessage("Hello! I'm SB Ai (Smart Burme Ai). How can I assist you today?");
    
    // Function to add user message
    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'user-message');
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to add bot message
    function addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'bot-message');
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to handle user input
    function handleUserInput() {
        const message = userInput.value.trim();
        if (message) {
            addUserMessage(message);
            userInput.value = '';
            
            // Simple response logic - in a real app, this would call an API
            setTimeout(() => {
                let response;
                if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
                    response = "Hello there! How can I help you today?";
                } else if (message.toLowerCase().includes('promotion')) {
                    response = "Congratulations on your promotion! You deserve this recognition for your hard work.";
                } else {
                    response = "I'm SB Ai, your Smart Burme assistant. I'm still learning, but I'll do my best to help!";
                }
                addBotMessage(response);
            }, 1000);
        }
    }
    
    // Event listeners
    sendBtn.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
});
