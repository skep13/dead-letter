# JavaScript file map

Run the game through VS Code Live Server or a local HTTP server, not a file:// URL.
From the project folder: `python3 -m http.server 8000`
Then visit http://localhost:8000.

| File | Edit here for |
| --- | --- |
| main.js | Startup order and new module imports |
| windows.js | App opening/closing, focus and drag behaviour |
| notes.js | Notes password puzzle |
| taskbar.js | Taskbar, running indicators and minimise/restore |
| notifications.js | Chime, mute, toast and incoming message delivery |
| messages.js | Conversation history, message rendering and scripted replies |
| dialogue.js | Prewritten dialogue choices |
| terminal.js | Commands and greenhouse archive text |
| photographs.js | Winterhouse viewer, zoom and label inspection |
| evidence.js | Notebook entries and clue collection |
| story.js | Story progress and one-time event triggers |
| events.js | Shared event helpers |

Append new code at the bottom of its relevant module. Imports go at the top
when needed; explain edits to existing code before making them. Avoid copying
handlers into another file: each feature should have one owner.

Shared events: `archive-opened` carries the archive name;
`photograph-inspected` carries the photograph name. Story and evidence subscribe
with `listen`; the terminal and viewer publish with `announce`.

Progress is still session-only. Chapter-two dialogue has not been implemented.
