const socket = io();

const chatMessages = document.querySelector(".chat-messages");
const input = document.querySelector(".chat-input input");
const sendButton = document.getElementById('send-button');

const connectionStatus = document.querySelector('.connection-status');
const userCount = document.querySelector('.user-count');

socket.on('connect', () => {
    connectionStatus.textContent = 'Connecting...';
    connectionStatus.classList.add('connecting');
    setTimeout(() => {
        if (socket.connected) {
            connectionStatus.textContent = 'Connected';
            connectionStatus.classList.remove('connecting');
        }
    }, 1300);
});

function emitInBackend(content) {
    addMessage(content, true);
    socket.emit('user-message', content);
};

socket.on('backend-user-message', (message, id) => {
    if (socket.id !== id) {
        addMessage(message, false);
    }
})

socket.on('total-user', (count) => {
    updateUserCount(count);
})



function addMessage(content, isSent) {
    const message = document.createElement("div");
    message.classList.add("message", isSent ? "sent" : "received");
    message.innerHTML = `<div class="message-content">${content}</div>`;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendButton.addEventListener("click", () => {
    if (input.value.trim()) {
        emitInBackend(input.value);
        input.value = "";
    }
});

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && input.value.trim()) {
        emitInBackend(input.value);
        input.value = "";
    }
});

function updateUserCount(count) {
    userCount.textContent = count;
}

const disconnectBtn = document.getElementById('disconnect-button');

disconnectBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (socket.connected) {
        connectionStatus.textContent = 'Disconnected';
        connectionStatus.classList.add('connecting');
        socket.disconnect();
    } else {
        socket.connect();
    }
});





