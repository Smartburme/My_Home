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
    
    // Function to handle help option selection
    window.selectOption = function(optionNumber) {
        let message = "";
        let response = "";
        
        switch(optionNumber) {
            case 1:
                message = "Help me to close a personal branding and web page";
                response = "I can help you with personal branding and website creation. Let's discuss your requirements in detail. What specific aspects do you need help with?";
                break;
            case 2:
                message = "Who is right based on my website data";
                response = "Based on your website analytics, I can provide insights about your audience demographics, behavior patterns, and content performance. Would you like me to analyze specific metrics?";
                break;
            case 3:
                message = "Who is stalled, engaging content, with a focus quality";
                response = "For creating engaging, high-quality content, I can help with content strategy, SEO optimization, and audience engagement techniques. What type of content are you focusing on?";
                break;
        }
        
        addUserMessage(message);
        
        setTimeout(() => {
            addBotMessage(response);
        }, 1000);
    }
    
    // Function to handle user input
    function handleUserInput() {
        const message = userInput.value.trim();
        if (message) {
            addUserMessage(message);
            userInput.value = '';
            
            // Simple response logic
            setTimeout(() => {
                let response;
                if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
                    response = "Hello there! How can I help you today?";
                } else if (message.toLowerCase().includes('thank')) {
                    response = "You're welcome! Is there anything else I can assist you with?";
                } else if (message.toLowerCase().includes('brand') || message.toLowerCase().includes('website')) {
                    response = "For personal branding and websites, we should focus on your unique value proposition and target audience. Would you like me to generate some ideas?";
                } else if (message.toLowerCase().includes('data') || message.toLowerCase().includes('analytics')) {
                    response = "I can analyze website metrics like bounce rate, session duration, and conversion rates. Please specify which data you're interested in.";
                } else if (message.toLowerCase().includes('content') || message.toLowerCase().includes('engage')) {
                    response = "Quality content should be valuable, relevant, and consistent. I can help brainstorm topics and optimize your content strategy.";
                } else {
                    response = "I'm SB Ai, your Smart Burme assistant. I'm here to help with your queries about branding, website data, and content quality. Feel free to ask anything!";
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
