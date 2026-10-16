# Dead Letter

[Play the live demo](https://skep13.github.io/dead-letter/)

Marina's computer was last online at 04:15. Then you opened the archive.

Dead Letter is a work-in-progress browser horror investigation game being built for Hack Club Phantom. You explore a missing students computer read her messages recover archived conversations and inspect photos to work out what happened to her and her friend

The computer is the game: clues live in its files, messages and simulated terminal. The desktop uses dark windows and a blood-red rose wallpaper, with small changes to familiar interface elements as the investigation unfolds.

![Dead Letter's blood-red rose desktop wallpaper](assets/blood-roses.png)

*The game's wallpaper, rather than a gameplay screenshot.*

## What you can do

- Open, close and drag app windows, and bring them to the foreground.
- Launch apps from the taskbar; Files and Terminal currently support minimising.
- Explore a diary, unlock Marina's notes and read a broadcast transcript.
- Switch between Evelyn's message history, Marina's conversation and an unsent draft.
- Reply using prewritten dialogue choices.
- Receive a sliding message notification with a sound, unread indicators and a mute control.
- Use fictional terminal commands to recover archives.
- Zoom into a greenhouse photograph and inspect a suspicious plant label.
- Collect three discoveries in an evidence notebook.

Messages and terminal commands are part of the fiction. They do not contact real people or execute commands on your computer.

## Run locally

You need Git, Python 3 and a modern browser. Because the game uses JavaScript modules, serve it over HTTP rather than opening `index.html` directly.

1. Clone the repository. It is private, so your GitHub account needs access.

   ```sh
   git clone https://github.com/skep13/dead-letter.git
   cd dead-letter
   ```

2. Start a local server from the project folder.

   ```sh
   python3 -m http.server 8000 --bind 127.0.0.1
   ```

3. Open [localhost:8000](http://localhost:8000) in your browser.

Press **Ctrl+C** in the terminal to stop the server. Alternatively, open the folder in VS Code and use the Live Server extension to serve `index.html`.

There are no npm dependencies to install and no build step.

## Playing

Start with Files and explore the other apps for clues. Drag windows by holding the left mouse button on their title bars. The taskbar restores minimised windows.

In Terminal, type `help` for commands or `ls` to list the available archives. Messages uses selectable replies, so you do not need to guess particular dialogue phrases. Sound can be disabled from the taskbar.

## Built with

- **HTML** for the desktop and app windows.
- **CSS** for the wallpaper, responsive layout, chat interface and notifications.
- **JavaScript modules** for window management, puzzles and story events.
- **Web Audio API** for the notification chime.
- **VS Code** as the development environment.

No frontend framework or backend is used.

## Development

The project began with a desktop and two buttons then grew into connected apps. debugging included fixing mismatched HTML IDs, incomplete JavaScript blocks, window dragging that continued after releasing the mouse, and a taskbar that appeared below the screen.

As features added up one large `script.js` became difficult to navigate. It was split into smaller modules, with discovery events connecting the terminal, photograph viewer, notebook and story triggers.

```text
index.html       Desktop and app markup
style.css        Layout, atmosphere and app styling
assets/          Wallpaper and investigation images
js/
  main.js        Module startup
  windows.js     Window controls, dragging and foreground focus
  taskbar.js     App indicators, minimise and restore
  notes.js       Password puzzle
  notifications.js  Message notifications and sound
  messages.js    Conversations and scripted responses
  dialogue.js    Prewritten reply choices
  terminal.js    Commands and greenhouse archive
  photographs.js    Winterhouse viewer and inspection
  evidence.js    Evidence notebook
  story.js       Story progress and triggers
  events.js      Shared event helpers
```

See [the JavaScript file guide](js/README.md) for more detail. New features should go in the relevant module rather than recreating a single large script.

Browser checks during development covered app controls, dragging, password validation, archive commands, notifications, dialogue choices, photograph inspection and evidence collection. Window bounds were also checked at desktop and mobile sizes. These checks do not mean the unfinished game has been tested on every browser or device.

## Current state

This is a playable opening investigation, not a finished story. Progress and conversations reset when the page is refreshed. There is no hosted demo yet use the local setup above.


## AI disclosure

i used ai to design the css and help with debugging parts of the code when functions like dragging tabs broke as well as generate the images for them i used my own llm to create them which is a previous project i made for STardance Challenge

