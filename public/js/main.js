(() => {
  const socket = io();

  const form = document.getElementById('chat-form');
  const msgInput = document.getElementById('msg');
  const chatBox = document.getElementById('chat-box');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const msg = msgInput.value.trim();
    if (msg) {
      socket.emit('chatMessage', msg);
      msgInput.value = '';
    }
    msgInput.focus();
  });

  socket.on('message', msg => {
    const div = document.createElement('div');
    div.textContent = msg;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
  });

  // Ensure we scroll to latest message even on mobile when keyboard shows
  msgInput.addEventListener('focus', () => {
    setTimeout(() => {
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 300);
  });
})();
