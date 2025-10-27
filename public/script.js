const textarea = document.getElementById('message');
const count = document.getElementById('count');
const sendBtn = document.getElementById('sendBtn');
const status = document.getElementById('status');

textarea.addEventListener('input', () => {
  count.textContent = `${textarea.value.length} / 1000`;
});

sendBtn.addEventListener('click', async () => {
  const message = textarea.value.trim();
  if (!message) {
    status.textContent = "⚠️ Please write something first!";
    status.style.color = "#f87171";
    return;
  }

  sendBtn.disabled = true;
  status.textContent = "Sending...";
  status.style.color = "#9ca3af";

  try {
    const res = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    if (res.ok) {
      status.textContent = "✅ Confession sent successfully!";
      status.style.color = "#34d399";
      textarea.value = "";
      count.textContent = "0 / 1000";
    } else {
      throw new Error(data.error || "Something went wrong.");
    }
  } catch (err) {
    status.textContent = "❌ Failed to send. Please try again.";
    status.style.color = "#f87171";
  }

  sendBtn.disabled = false;
});
