// TASKBAR: launch, running indicators and minimise/restore.
import { appWindows } from "./windows.js";

    const taskButtons = document.querySelectorAll("[data-task-app]");
    const minimiseButtons = document.querySelectorAll("[data-minimise]");
    const runningApps = new Set();

    function updateTaskbar() {
        taskButtons.forEach((button) => {
    const app = button.dataset.taskApp;
    const appWindow = document.querySelector(`#${app}-window`);

    const isActive =
      !appWindow.hidden &&
      appWindow.classList.contains("is-active");

    button.classList.toggle("is-open", runningApps.has(app));
    button.classList.toggle("is-active", isActive);
  });
}

taskButtons.forEach((button) => {
  const app = button.dataset.taskApp;
  const desktopButton = document.querySelector(`#${app}-button`);
  const closeButton = document.querySelector(`#close-${app}`);

  desktopButton.addEventListener("click", () => {
    runningApps.add(app);
    updateTaskbar();
  });

  closeButton.addEventListener("click", () => {
    runningApps.delete(app);
    updateTaskbar();
  });

  button.addEventListener("click", () => {
    desktopButton.click();
  });
});

minimiseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const app = button.dataset.minimise;
    const appWindow = document.querySelector(`#${app}-window`);
    const taskButton = document.querySelector(
      `[data-task-app="${app}"]`
    );

    appWindow.hidden = true;
    appWindow.classList.remove("is-active");
    taskButton.focus();
    updateTaskbar();
  });
});

const taskbarObserver = new MutationObserver(updateTaskbar);

appWindows.forEach((appWindow) => {
  taskbarObserver.observe(appWindow, {
    attributes: true,
    attributeFilter: ["hidden", "class"]
  });
});

updateTaskbar();
