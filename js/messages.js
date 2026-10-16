import { messagesButton, messagesWindow } from "./windows.js";
import { incomingMessage, markMarinaMessageRead } from "./notifications.js";

// ================================================================
// MESSAGES APP — conversation history, selection and scripted responses.
// Edit chatHistory for conversation text; chooseReply for Marina's replies.
// Everything is fictional and stays in this page; nothing is sent online.
// ================================================================
(() => {
  const content = messagesWindow.querySelector('.window-content');
  const originalDraft = document.createElement('article');
  originalDraft.className = 'message-draft';
  // Keep existing draft text and the original notification target intact.
  incomingMessage.remove();
  while (content.firstChild) originalDraft.append(content.firstChild);

  const shell = document.createElement('div');
  shell.className = 'messenger';
  shell.innerHTML = `
    <nav class="conversation-list" aria-label="Conversations">
      <p class="conversation-heading">INBOX</p>
      <button type="button" data-chat="evelyn"><strong>Evelyn</strong><small>Last seen Oct 12</small></button>
      <button type="button" data-chat="marina"><strong>Marina <span class="chat-badge" hidden>1</span></strong><small id="chat-marina-status">Offline</small></button>
      <button type="button" data-chat="draft"><strong>Drafts</strong><small>1 unsent message</small></button>
    </nav>
    <section class="conversation-panel" aria-labelledby="conversation-title">
      <header class="conversation-header"><h3 id="conversation-title">Evelyn</h3><p id="conversation-status"></p></header>
      <div class="chat-timeline" tabindex="0" aria-label="Conversation history"></div>
      <p class="chat-typing" role="status"></p>
      <form class="message-composer">
        <label class="visually-hidden" for="message-reply">Your reply</label>
        <input id="message-reply" placeholder="Write a message…" maxlength="500" autocomplete="off" required>
        <button type="submit">Send</button>
      </form>
      <p class="composer-help">Fictional chat · replies are not saved after refresh</p>
    </section>`;
  content.append(shell);
  content.classList.add('messenger-content');
  const timeline = shell.querySelector('.chat-timeline');
  const composer = shell.querySelector('.message-composer');
  const input = shell.querySelector('#message-reply');
  const typing = shell.querySelector('.chat-typing');
  const badge = shell.querySelector('.chat-badge');
  const chatButtons = shell.querySelectorAll('[data-chat]');
  let selectedChat = 'evelyn';
  let delivered = !incomingMessage.hidden;
  let unread = delivered;
  let replyPending = false;
  let replyStage = 0;
  const chatHistory = {
    evelyn: [
      {who:'Evelyn', text:'you left your scarf here again', time:'Oct 10 · 16:08'},
      {who:'Marina', text:'keeping you employed as my personal lost property office', time:'Oct 10 · 16:10', mine:true},
      {who:'Evelyn', text:'those roses weren’t a gift. you asked me to bring them.', time:'Oct 12 · 18:31'},
      {who:'Marina', text:'i don’t remember that.', time:'Oct 12 · 18:33', mine:true},
      {who:'Evelyn', text:'please stop listening to that broadcast. call me instead.', time:'Oct 12 · 19:02'}
    ],
    marina: []
  };

  function renderConversation() {
    // Detach reusable story nodes before clearing the visible conversation.
    incomingMessage.remove();
    originalDraft.remove();
    timeline.replaceChildren();
    chatButtons.forEach(button => {
      const active = button.dataset.chat === selectedChat;
      button.classList.toggle('selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
    badge.hidden = !unread;
    shell.querySelector('#chat-marina-status').textContent = delivered ? 'Online' : 'Offline';
    shell.querySelector('#conversation-title').textContent = selectedChat === 'draft' ? 'Unsent draft' : selectedChat === 'evelyn' ? 'Evelyn' : 'Marina';
    shell.querySelector('#conversation-status').textContent = selectedChat === 'draft' ? 'To Evelyn · October 14' : selectedChat === 'evelyn' ? 'Offline · last seen October 12' : delivered ? 'Online' : 'No messages yet';
    composer.hidden = selectedChat !== 'marina' || !delivered;
    shell.querySelector('.composer-help').hidden = composer.hidden;
    input.disabled = replyPending;
    composer.querySelector('button').disabled = replyPending;
    typing.textContent = selectedChat === 'marina' && replyPending ? 'Marina is typing…' : '';
    if (selectedChat === 'draft') {
      timeline.append(originalDraft);
      return;
    }
    if (selectedChat === 'marina') timeline.append(incomingMessage);
    for (const message of chatHistory[selectedChat]) {
      const bubble = document.createElement('article');
      bubble.className = `chat-bubble${message.mine ? ' from-me' : ''}`;
      const sender = document.createElement('strong');
      sender.textContent = message.who;
      const text = document.createElement('p');
      text.textContent = message.text;
      const stamp = document.createElement('small');
      stamp.textContent = message.time;
      bubble.append(sender, text, stamp);
      timeline.append(bubble);
    }
    if (selectedChat === 'marina' && !delivered) {
      const empty = document.createElement('p');
      empty.textContent = 'This conversation is empty.';
      timeline.append(empty);
    }
    timeline.scrollTop = timeline.scrollHeight;
  }

  function selectChat(name) {
    selectedChat = name;
    if (name === 'marina' && delivered) {
      unread = false;
      markMarinaMessageRead();
    }
    renderConversation();
  }
  chatButtons.forEach(button => button.addEventListener('click', () => selectChat(button.dataset.chat)));

  // The original notification continues to reveal this same message node.
  const deliveryObserver = new MutationObserver(() => {
    if (incomingMessage.hidden || delivered) return;
    delivered = true;
    unread = true;
    if (!messagesWindow.hidden && messagesWindow.classList.contains('is-active') && selectedChat === 'marina') {
      unread = false;
      markMarinaMessageRead();
    } else {
      document.querySelectorAll('#messages-button, [data-task-app="messages"]').forEach(button => {
        button.classList.add('has-unread');
        button.setAttribute('data-unread', '1');
      });
    }
    renderConversation();
  });
  deliveryObserver.observe(incomingMessage, {attributes:true, attributeFilter:['hidden']});
  messagesButton.addEventListener('click', () => {
    if (delivered && unread) selectChat('marina');
  });
  document.querySelector('#open-notification').addEventListener('click', () => {
    selectChat('marina');
    incomingMessage.focus();
  });

  // Scripted story responses: change these lines to expand the investigation.
  function chooseReply(text) {
    if (replyStage === 0) {
      replyStage++;
      return /evelyn/i.test(text)
        ? 'don’t let her hear the broadcast. she’ll recognise the voice.'
        : 'i can’t see you. i can only see what you open.';
    }
    if (replyStage === 1) {
      replyStage++;
      return 'the photograph. she called it winterhouse. find it before 04:16.';
    }
    return 'i have to go. don’t close the archive.';
  }
  composer.addEventListener('submit', event => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text || selectedChat !== 'marina' || !delivered || replyPending) return;
    chatHistory.marina.push({who:'You', text, time:'04:15 · Sent', mine:true});
    input.value = '';
    replyPending = true;
    renderConversation();
    setTimeout(() => {
      chatHistory.marina.push({who:'Marina', text:chooseReply(text), time:'04:15'});
      replyPending = false;
      if (selectedChat !== 'marina' || messagesWindow.hidden || !messagesWindow.classList.contains('is-active')) {
        unread = true;
        document.querySelectorAll('#messages-button, [data-task-app="messages"]').forEach(button => {
          button.classList.add('has-unread');
          button.setAttribute('data-unread', '1');
        });
      }
      renderConversation();
      if (selectedChat === 'marina' && !messagesWindow.hidden && messagesWindow.classList.contains('is-active')) input.focus();
    }, 1800);
  });
  renderConversation();
})();
