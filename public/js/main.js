(() => {
  const socket = io();

  const form = document.getElementById('chat-form');
  const msgInput = document.getElementById('msg');
  const chatBox = document.getElementById('chat-box');

  msgInput.addEventListener('focus', () => {
    setTimeout(() => {
      msgInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300); // mobile-friendly scroll
  });

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
})();
