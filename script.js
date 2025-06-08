function sendMessage() {
  const chatArea = document.getElementById('chatArea');
  const inputElement = document.getElementById('chatInput');
  const input = inputElement.value;
  const error = document.getElementById('error');

  if (!input.trim()) {
    error.textContent = "တောင်းပန်ပါတယ် လိုင်းမကောင်းပါ \n ခနနေမှ ထပ်ကြိုးစားပါ";
    return;
  }

  const message = document.createElement('p');
  message.textContent = input;
  chatArea.appendChild(message);

  inputElement.value = '';
  error.textContent = '';

  setTimeout(() => {
    const reply = document.createElement('p');
    reply.textContent = "AI: ဒီကိစ္စအတွက် ဖြေကြားချက်ဖြစ်ပါတယ်။";
    chatArea.appendChild(reply);
  }, 1000);
}
