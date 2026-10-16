import { messagesButton, messagesWindow } from "./windows.js";

// NOTIFICATIONS: sound, unread indicators and the incoming Marina message.
const notification = document.querySelector("#message-notification");
const incomingMessage = document.querySelector("#marina-incoming");
const soundToggle = document.querySelector("#sound-toggle");
let notificationTimer;
let soundMuted = false;
let notificationAudio;

// Prepare audio during a player action so browsers can allow the later chime.
function prepareNotificationAudio() {
  if (soundMuted) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  try {
    notificationAudio ??= new AudioContext();
    if (notificationAudio.state === "suspended") {
      notificationAudio.resume().catch(() => {});
    }
  } catch { /* The visual message still works when audio is unavailable. */ }
}

function playNotificationSound() {
  if (soundMuted || notificationAudio?.state !== "running") return;
  const now = notificationAudio.currentTime;
  [660, 880].forEach((frequency, index) => {
    const tone = notificationAudio.createOscillator();
    const volume = notificationAudio.createGain();
    const start = now + index * 0.14;
    tone.type = "sine";
    tone.frequency.value = frequency;
    volume.gain.setValueAtTime(0, start);
    volume.gain.linearRampToValueAtTime(0.045, start + 0.015);
    volume.gain.exponentialRampToValueAtTime(0.001, start + 0.28);
    tone.connect(volume);
    volume.connect(notificationAudio.destination);
    tone.start(start);
    tone.stop(start + 0.3);
    tone.onended = () => { tone.disconnect(); volume.disconnect(); };
  });
}

soundToggle.addEventListener("click", () => {
  soundMuted = !soundMuted;
  soundToggle.textContent = soundMuted ? "Sound off" : "Sound on";
  soundToggle.setAttribute("aria-pressed", String(soundMuted));
  soundToggle.setAttribute("aria-label", soundMuted ? "Unmute notification sounds" : "Mute notification sounds");
  if (!soundMuted) prepareNotificationAudio();
});

function dismissNotification() {
  clearTimeout(notificationTimer);
  const hadFocus = notification.contains(document.activeElement);
  notification.hidden = true;
  if (hadFocus) messagesButton.focus();
}

function markMarinaMessageRead() {
  document.querySelectorAll('#messages-button, [data-task-app="messages"]').forEach((button) => {
    button.classList.remove("has-unread");
    button.removeAttribute("data-unread");
  });
}

messagesButton.addEventListener("click", () => {
  markMarinaMessageRead();
  dismissNotification();
});

document.querySelector("#dismiss-notification").addEventListener("click", dismissNotification);
document.querySelector("#open-notification").addEventListener("click", () => {
  messagesButton.click();
  incomingMessage.focus();
  incomingMessage.scrollIntoView({ block: "nearest" });
});

// Edit the message text in index.html; this function controls its delivery.
function deliverMarinaMessage() {
  incomingMessage.hidden = false;
  const alreadyReading = !messagesWindow.hidden && messagesWindow.classList.contains("is-active");
  if (!alreadyReading) {
    document.querySelectorAll('#messages-button, [data-task-app="messages"]').forEach((button) => {
      button.classList.add("has-unread");
      button.setAttribute("data-unread", "1");
    });
  }
  notification.hidden = false;
  document.querySelector("#notification-announcement").textContent = "New message from Marina: you opened it. is evelyn still there?";
  playNotificationSound();
  notificationTimer = setTimeout(() => {
    // Leave keyboard users time to interact while the notification has focus.
    if (!notification.contains(document.activeElement)) dismissNotification();
  }, 8000);
}


export { incomingMessage, markMarinaMessageRead, prepareNotificationAudio, deliverMarinaMessage };
