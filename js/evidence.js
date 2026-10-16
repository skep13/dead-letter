import { listen } from "./events.js";

// EVIDENCE BOOK — collected clues, kept together in their own scope.
(() => {
  const notebook = document.createElement("details");
  notebook.className = "evidence-notebook";
  notebook.innerHTML = `
    <summary>Evidence Book · <span>0</span></summary>
    <p class="notebook-empty">No evidence collected. Explore Marina’s computer.</p>
    <ul aria-label="Collected evidence"></ul>
    <p class="notebook-announcement visually-hidden" role="status"></p>
  `;
  document.querySelector("#desktop > nav").after(notebook);

  const evidence = new Set();
  const list = notebook.querySelector("ul");
  const count = notebook.querySelector("summary span");
  const empty = notebook.querySelector(".notebook-empty");
  const announcement = notebook.querySelector(".notebook-announcement");

  function collectEvidence(id, description) {
    if (evidence.has(id)) return;
    evidence.add(id);
    const entry = document.createElement("li");
    entry.textContent = description;
    list.append(entry);
    count.textContent = evidence.size;
    empty.hidden = true;
    announcement.textContent = `Evidence collected: ${description}`;
  }

  // Broadcast evidence is collected when Recordings opens.
  document.querySelector("#recordings-button").addEventListener("click", () => {
    collectEvidence("broadcast", "The broadcast knows Marina’s name and mentions her roses.");
  });

  // Discoveries arrive from the terminal and photo viewer, not DOM mutations.
  listen("archive-opened", name => {
    if (name === "greenhouse") {
      collectEvidence("greenhouse", "Evelyn found a label bearing her name beneath the roses.");
    }
  });
  listen("photograph-inspected", name => {
    if (name === "winterhouse") {
      collectEvidence("winterhouse", "A 1998 photograph bears Evelyn’s name, ten years before her birth.");
    }
  });
})();
