import { announce } from "./events.js";

// Winter house - photo view and plant label

(() => {
const form = document.querySelector("#terminal-form");
const input = document.querySelector("#terminal-input");
const output = document.querySelector("#terminal-output");
const content = document.querySelector(
    "#terminal-window .window-content"
);

const archive = document.createElement("section");
archive.className = "photo-archive";
archive.hidden = true;
archive.setAttribute("aria-label", "Winterhouse photograph");

archive.innerHTML = `<header>
      <h3 id="photo-title">winterhouse_1998.jpg</h3>
      <p>Recovered photograph · October 15, 1998</p>
    </header>

    <div class="photo-viewport">
      <img
        class="archive-photo"
        src="assets/winterhouse-1998.png"
        alt="An overgrown greenhouse filled with dark red roses.
             A small wooden label stands among the stems."
      >
      <button class="photo-hotspot" type="button">
        Inspect plant label
      </button>
    </div>

    <div class="photo-controls">
      <label for="photo-zoom">Zoom</label>
      <input id="photo-zoom" type="range"
             min="1" max="3" step="0.1" value="1">
      <button class="close-photo" type="button">
        Close photograph
      </button>
    </div>

    <section class="photo-discovery" hidden
             aria-labelledby="discovery-title">
      <h4 id="discovery-title">A name between the roses</h4>
      <img
        class="label-closeup"
        src="assets/evelyn-label.png"
        alt="A wooden label reads: EVELYN.
             Planted: 15 October 1998."
      >
      <p class="photo-caption">
        Label transcription: EVELYN — Planted: 15 October 1998.
      </p>
      <p>
        Evelyn was born in 2008.
        Her name was here ten years before she existed.
      </p>
      <p>
        On the back of the photograph, Marina has written:
        “This isn’t the first photograph.”
      </p>
    </section>

    <p class="photo-status" role="status"></p>
  `;

  content.append(archive);

  // PHOTO CONTROLS: use the same names when selecting and handling elements.
  const photo = archive.querySelector(".archive-photo");
  const zoomInput = archive.querySelector("#photo-zoom");
  const hotspot = archive.querySelector(".photo-hotspot");
  const discovery = archive.querySelector(".photo-discovery");
  const status = archive.querySelector(".photo-status");

  zoomInput.addEventListener("input", () => {
    photo.style.transform = `scale(${zoomInput.value})`;
  });

  hotspot.addEventListener("click", () => {
    const firstDiscovery = discovery.hidden;
    discovery.hidden = false;
    hotspot.textContent = "Label inspected";
    if (firstDiscovery) {
      status.textContent = "Evidence discovered: Evelyn’s name appears in a 1998 photograph.";
      announce("photograph-inspected", "winterhouse");
    }
    discovery.scrollIntoView({ block: "nearest" });
  });

  archive.querySelector(".close-photo").addEventListener("click", () => {
    archive.hidden = true;
    input.focus();
  });

  // ARCHIVE COMMANDS: capture prevents the older handler processing these twice.
  form.addEventListener("submit", (event) => {
    const enteredCommand = input.value.trim();
    const command = enteredCommand.toLowerCase();
    if (!["open winterhouse", "help", "ls", "clear"].includes(command)) return;
    event.preventDefault();
    event.stopImmediatePropagation();

    if (command === "clear") {
      output.textContent = "";
      archive.hidden = true;
    } else {
      output.textContent += `\n\nmarina@local:~$ ${enteredCommand}\n`;
      if (command === "help") {
        output.textContent += [
          "help — show commands", "ls — list archived files",
          "open <name> — read an archive", "clear — clear the terminal"
        ].join("\n");
      } else if (command === "ls") {
        output.textContent += "Available archives:\n  greenhouse\n  winterhouse";
      } else {
        output.textContent += "Recovered winterhouse_1998.jpg. Inspect the photograph below.";
        archive.hidden = false;
      }
    }
    input.value = "";
    input.focus();
    if (command === "open winterhouse") {
      archive.scrollIntoView({ block: "nearest" });
    } else {
      content.scrollTop = content.scrollHeight;
    }
  }, { capture: true });
})();
