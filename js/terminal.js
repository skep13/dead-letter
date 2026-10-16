import { prepareNotificationAudio } from "./notifications.js";
import { announce } from "./events.js";

// TERMINAL APP: opening, closing and command input.
const terminalButton = document.querySelector("#terminal-button");
const terminalWindow = document.querySelector("#terminal-window");
const closeTerminalButton = document.querySelector("#close-terminal");
const terminalForm = document.querySelector("#terminal-form");
const terminalInput = document.querySelector("#terminal-input");
const terminalOutput = document.querySelector("#terminal-output");
terminalButton.addEventListener("click", () => {
  terminalWindow.hidden = false;
  terminalInput.focus();
});
closeTerminalButton.addEventListener("click", () => {
  terminalWindow.hidden = true;
  terminalButton.focus();
});

// STORY CONTENT: edit the recovered conversation here.
const greenhouseArchive = [
  "RECOVERED ARCHIVE: greenhouse", "October 12 — 18:42", "",
  "EVELYN: I cut them down. Every rose.",
  "MARINA: Why would you do that?",
  "EVELYN: There was something underneath the roots.",
  "MARINA: What did you find?",
  "EVELYN: My name. On a label. In your handwriting.",
  "MARINA: I've never been inside that greenhouse.", "", "[Connection lost]"
].join("\n");

// TERMINAL COMMANDS: add future commands before the final else branch.
terminalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  prepareNotificationAudio();
  const enteredCommand = terminalInput.value.trim();
  const command = enteredCommand.toLowerCase();
  if (!command) return;
  let response;
  if (command === "help") {
    response = "Available commands:\nhelp — show commands\nls — list archived files\nopen <name> — read an archive\nclear — clear the terminal";
  } else if (command === "ls") {
    response = "Available archives:\n  greenhouse";
  } else if (command === "open greenhouse") {
    response = greenhouseArchive;
    announce("archive-opened", "greenhouse");
  } else if (command === "clear") {
    terminalOutput.textContent = "";
    terminalInput.value = "";
    terminalInput.focus();
    return;
  } else {
    response = "Command not recognised. Type help.";
  }
  terminalOutput.textContent += `\n\nmarina@local:~$ ${enteredCommand}\n${response}`;
  terminalInput.value = "";
  terminalInput.focus();
  const content = terminalWindow.querySelector(".window-content");
  content.scrollTop = content.scrollHeight;
});
