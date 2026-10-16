// WINDOW CONTROLS: open/close apps, foreground focus and title-bar dragging.
const filesButton =document.querySelector('#files-button');
const filesWindow = document.querySelector('#files-window');
const closeFilesButton = document.querySelector('#close-files');

filesButton.addEventListener('click', () => {
    filesWindow.hidden =false;
    closeFilesButton.focus();
});

closeFilesButton.addEventListener('click', () => {
    filesWindow.hidden =true;
    filesButton.focus();
});

const recordingsButton = document.querySelector('#recordings-button');
const recordingsWindow = document.querySelector('#recordings-window');
const closeRecordingsButton = document.querySelector('#close-recordings');

recordingsButton.addEventListener('click', () => {
    recordingsWindow.hidden = false;
    closeRecordingsButton.focus();
});

closeRecordingsButton.addEventListener('click', () => {
    recordingsWindow.hidden = true;
    recordingsButton.focus();
});

const messagesButton = document.querySelector('#messages-button');
const messagesWindow = document.querySelector('#messages-window');
const closeMessagesButton = document.querySelector('#close-messages');

messagesButton.addEventListener('click', () => {
    messagesWindow.hidden = false;
    closeMessagesButton.focus();
});

closeMessagesButton.addEventListener('click', () => {
    messagesWindow.hidden = true;
    messagesButton.focus();
});

// SHARED WINDOW MANAGEMENT: stacking and dragging for every app below.
const appWindows = document.querySelectorAll('.app-window');
    let highestWindowLayer = 10;

function bringToFront(appWindow) {
    appWindows.forEach(window => {
    window.classList.remove("is-active");
    });

    highestWindowLayer += 1;
    appWindow.style.zIndex = highestWindowLayer;
    appWindow.classList.add("is-active");
}

appWindows.forEach(appWindow => {
    appWindow.addEventListener('pointerdown', () => {
        bringToFront(appWindow);
    });

    appWindow.addEventListener('focusin', (event) => {
        bringToFront(appWindow);
    });
});

appWindows.forEach(appWindow => {
    const titleBar = appWindow.querySelector('.window-header');
    let drag = null;

    titleBar.addEventListener('pointerdown', (event) => {
        if (event.button !== 0 || event.target.closest('button')) return;
        drag = {
            pointerId: event.pointerId,
            offsetX: event.clientX - appWindow.offsetLeft,
            offsetY: event.clientY - appWindow.offsetTop
        };
        titleBar.setPointerCapture(event.pointerId);
        event.preventDefault();
    });

    titleBar.addEventListener('pointermove', (event) => {
        if (!drag || event.pointerId !== drag.pointerId) return;
        if (event.pointerType === 'mouse' && (event.buttons & 1) === 0) {
            stopDragging();
            return;
        }
        if (drag) {
                        const maxLeft = Math.max(0, window.innerWidth - appWindow.offsetWidth);
                        const taskbarHeight = document.querySelector('.taskbar')?.offsetHeight || 0;
                        const maxTop = Math.max(0, window.innerHeight - taskbarHeight - appWindow.offsetHeight);
                        const left = Math.max(
                                0,
                                Math.min(event.clientX - drag.offsetX, maxLeft)
                        );
                        const top = Math.max(
                                0,
                                Math.min(event.clientY - drag.offsetY, maxTop)
                        );

                            appWindow.style.left = `${left}px`;
                            appWindow.style.top = `${top}px`;
            }
        });

            function stopDragging() {
        const pointerId = drag?.pointerId;
        drag = null;
        if (pointerId !== undefined && titleBar.hasPointerCapture(pointerId)) {
            titleBar.releasePointerCapture(pointerId);
        }
            }

            titleBar.addEventListener('pointerup', stopDragging);
            titleBar.addEventListener('pointercancel', stopDragging);
            titleBar.addEventListener('lostpointercapture', stopDragging);
            window.addEventListener('blur', stopDragging);
    });


export { appWindows, bringToFront, messagesButton, messagesWindow };
