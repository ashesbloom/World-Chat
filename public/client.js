
const chatMessages = document.querySelector(".chat-messages");
const input = document.querySelector(".chat-input input");
const sendButton = document.getElementById('send-button');
const socket = io();


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

const connectionStatus = document.querySelector('.connection-status');
const userCount = document.querySelector('.user-count');

function status() {
    setTimeout(() => {
        connectionStatus.textContent = 'Connecting...';
        connectionStatus.classList.add('connecting');
    }, 500);
}

// connectionStatus.textContent = 'Connected';
// connectionStatus.classList.remove('connecting');

// connectionStatus.textContent = 'Disconnected. Trying to reconnect...';
// connectionStatus.classList.add('connecting');

function updateUserCount(count) {
    userCount.textContent = count;
}






