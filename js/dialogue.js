// ================================================================
// GUIDED DIALOGUE — replaces typing with authored response choices.
// Add future conversation steps to dialogueChoices below.
// The original composer is retained as the internal send mechanism.
// ================================================================
(() => {
  const composer = document.querySelector('.message-composer');
  const input = document.querySelector('#message-reply');
  const panel = document.querySelector('.conversation-panel');
  const help = panel.querySelector('.composer-help');
  composer.classList.add('guided-composer');
  help.textContent = 'Choose a reply · progress resets after refresh';

  const choicesPanel = document.createElement('div');
  choicesPanel.className = 'dialogue-choices';
  choicesPanel.setAttribute('role', 'group');
  choicesPanel.setAttribute('aria-label', 'Choose your response');
  composer.after(choicesPanel);

  // Each step offers valid lines that use the existing scripted story replies.
  const dialogueChoices = [
    ['Where is Evelyn?', 'How do you know I opened the archive?'],
    ['What do you need me to find?', 'How can I help you?'],
    ['Wait. Where are you?', 'I’ll keep the archive open.']
  ];
  let nextStep = 0;
  let lastRender = '';

  function renderChoices() {
    const pending = input.disabled;
    const signature = `${composer.hidden}:${pending}:${nextStep}`;
    if (signature === lastRender) return;
    lastRender = signature;
    choicesPanel.hidden = composer.hidden;
    choicesPanel.replaceChildren();
    if (composer.hidden) return;
    if (pending) {
      const waiting = document.createElement('p');
      waiting.textContent = 'Waiting for Marina…';
      choicesPanel.append(waiting);
      return;
    }
    if (nextStep >= dialogueChoices.length) {
      const finished = document.createElement('p');
      finished.textContent = 'Marina has stopped replying. Investigate the winterhouse clue.';
      choicesPanel.append(finished);
      return;
    }
    const heading = document.createElement('p');
    heading.textContent = 'Choose a reply';
    choicesPanel.append(heading);
    dialogueChoices[nextStep].forEach(line => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = line;
      button.addEventListener('click', () => {
        if (input.disabled || composer.hidden) return;
        input.value = line;
        // Submit through the existing conversation code, preserving bubbles,
        // typing indicators, unread state and delayed story responses.
        composer.requestSubmit();
        if (input.disabled) nextStep += 1;
        renderChoices();
        const timeline = panel.querySelector('.chat-timeline');
        timeline.focus({ preventScroll: true });
      });
      choicesPanel.append(button);
    });
  }
  const choicesObserver = new MutationObserver(renderChoices);
  choicesObserver.observe(composer, {attributes:true, attributeFilter:['hidden']});
  choicesObserver.observe(input, {attributes:true, attributeFilter:['disabled']});
  renderChoices();
})();
