async function getWikiAnswer(question) {
  const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(question)}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.extract) {
      return data.extract;
    } else {
      return "Sorry, I couldn't find anything on Wikipedia.";
    }
  } catch (error) {
    return "Error: Failed to fetch the response.";
  }
}

async function sendMessage() {
  const input = document.getElementById("user-input");
  const msg = input.value.trim();
  if (!msg) return;

  const box = document.getElementById("chat-box");
  box.innerHTML += `<div style='color:lightgreen;'>You: ${msg}</div>`;

  input.value = "";

  const reply = await getWikiAnswer(msg);
  box.innerHTML += `<div style='color:skyblue;'>CAT-BOT: ${reply}</div>`;
  box.scrollTop = box.scrollHeight;
}
