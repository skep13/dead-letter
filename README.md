# Dead Letter

[Play the live demo](https://skep13.github.io/dead-letter/)

Marina's computer was last online at 04:15. Then you opened it

Dead Letter is a browser horror investigation game. You need to explore a missing students computer read there messages recover archived conversations and inspect photos to work out what happened to her and her friend

![Dead Letter's blood-red rose desktop wallpaper](assets/blood-roses.png)

Messages and terminal commands are part of the story, they do not contact real people or execute commands on your computer

## Playing

explore the different apps and files that are on this pc to help piece together exactly what happened

In Terminal, type `help` for commands or `ls` to list the available files,  Messages uses selectable replies, you do not need to guess dialogue phrases Sound can be removed from the taskbar it isnt necessary for the game just helps with imersion

## Built with

- **HTML** for the desktop and app windows
- **CSS** for the wallpaper, responsive layout, chat interface and notifications
- **JavaScript modules** for window management, puzzles and story events
- **Web Audio API** for the notification chime


No frontend framework or backend is used.

## Development

The project began with a desktop and two buttons then grew into connected apps. debugging included fixing mismatched HTML IDs, incomplete JavaScript blocks, window dragging that continued after releasing the mouse, and a taskbar that appeared below the screen.

As features added up one large `script.js` became difficult to navigate. It was split into smaller files with discovery events connecting the terminal photograph viewer notebook and story

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

Browser checks during development covered app controls, dragging, password validation, archive commands, notifications, dialogue choices, photograph inspection and evidence collection. Window bounds were also checked at desktop and mobile sizes

## Current state

This is a playable opening investigation, not a finished story any progress and conversations reset when the page is refreshed

## AI disclosure

i used ai to design the css and help with debugging parts of the code when functions like dragging tabs broke as well as generate the images for them i used my own llm to create them which is a previous project i made for STardance Challenge

