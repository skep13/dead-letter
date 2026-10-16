import { deliverMarinaMessage } from "./notifications.js";
import { listen } from "./events.js";

// STORY STATE: discoveries reset when the page is refreshed.
let greenhouseDiscovered = false;

// STORY EVENT: called only when the greenhouse archive is opened.
function revealMarinaOnline() {
  if (greenhouseDiscovered) return;
  greenhouseDiscovered = true;
  const status = document.querySelector("#marina-status");
  status.textContent = "Marina — online";
  status.classList.add("is-online");
  setTimeout(deliverMarinaMessage, 2500);
}


// Future story triggers belong below this listener.
listen("archive-opened", name => {
  if (name === "greenhouse") revealMarinaOnline();
});
