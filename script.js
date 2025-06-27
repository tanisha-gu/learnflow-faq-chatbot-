const apiKey = "sk-default-6iRtVqFmmO6Wlow6uV0QjCVgmMAzGoUQ";
const agentId = "685e8f3aee9e7b0d87f6d65c";
const apiUrl = `https://rag-prod.studio.lyzr.ai/agent/${agentId}/inference`;

function addMessage(text, sender) {
  const chatBox = document.getElementById("chatBox");
  const msg = document.createElement("div");
  msg.className = `chat-message ${sender}`;
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const inputField = document.getElementById("userInput");
  const message = inputField.value.trim();
  if (!message) return;

  addMessage(message, "user");
  inputField.value = "";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey
      },
      body: JSON.stringify({ input: message })
    });

    const data = await response.json();
    const reply = data.response || "Sorry, I didn’t get that.";
    addMessage(reply, "bot");
  } catch (err) {
    console.error(err);
    addMessage("Oops! Something went wrong. Try again later.", "bot");
  }
}

// Optional: Send message on Enter key
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("userInput");
  input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMessage();
  });
});
