// NOTES PUZZLE: password checks and the unlocked note.
const notesButton =document.querySelector('#notes-button');
const notesWindow = document.querySelector('#notes-window');
const closeNotesButton = document.querySelector('#close-notes');
const notesForm = document.querySelector('#notes-form');
const notesPasswordInput = document.querySelector('#notes-password');
const passwordMessage = document.querySelector('#password-message');
const secretNotes = document.querySelector('#secret-note');

notesButton.addEventListener('click', () => {
    notesWindow.hidden =false;
    closeNotesButton.focus();
});

closeNotesButton.addEventListener('click', () => {
    notesWindow.hidden =true;
    notesButton.focus();
});

notesForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const password = notesPasswordInput.value;
    if (password === 'rose') {
        secretNotes.hidden = false;
        notesForm.hidden = true;
        passwordMessage.textContent = '';
        document.querySelector('#notes-title').textContent = 'Notes — Marina';
    } else {
        passwordMessage.textContent = 'Incorrect password. Please try again.';
    }
});
