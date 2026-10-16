// SHARED EVENTS: modules announce discoveries without inspecting each other's UI.
const events = new EventTarget();
export function announce(name, detail) {
  events.dispatchEvent(new CustomEvent(name, { detail }));
}
export function listen(name, handler) {
  events.addEventListener(name, event => handler(event.detail));
}
