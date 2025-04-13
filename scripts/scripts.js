document.getElementById('registration-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    
    // Simple validation
    if (!name || !email) {
        alert('ကျေးဇူးပြု၍ အချက်အလက်များကို ဖြည့်စွက်ပါ။');
        return;
    }
    
    // Email validation
    if (!validateEmail(email)) {
        alert('ကျေးဇူးပြု၍ မှန်ကန်သော အီးမေးလ်လိပ်စာကို ရေးပါ။');
        return;
    }
    
    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    alert(`မှတ်ပုံတင်ခြင်း အောင်မြင်ပါသည်!\nနာမည်: ${name}\nအီးမေးလ်: ${email}`);
    
    // Reset the form
    this.reset();
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
