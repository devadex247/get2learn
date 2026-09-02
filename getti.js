/**
 * Getti AI Assistant - Local Mode implementation
 */

class GettiAssistant {
  constructor() {
    this.container = document.getElementById('getti-container');
    this.fab = document.getElementById('getti-fab');
    this.panel = document.getElementById('getti-panel');
    this.closeBtn = document.getElementById('getti-close');
    this.messagesContainer = document.getElementById('getti-messages');
    this.form = document.getElementById('getti-input-form');
    this.input = document.getElementById('getti-input');
    this.sendBtn = document.getElementById('getti-send');
    this.suggestions = document.querySelectorAll('.getti-suggestion-chip');

    this.isOpen = localStorage.getItem('getti-open') === 'true';

    this.init();
  }

  init() {
    if (!this.container || !this.panel) return;

    // Set initial state
    if (this.isOpen) {
      this.openPanel(false);
    }

    // Event Listeners
    this.fab.addEventListener('click', () => this.togglePanel());
    this.closeBtn.addEventListener('click', () => this.closePanel());
    
    // Input handling
    this.input.addEventListener('input', () => this.handleInput());
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Suggestions handling
    this.suggestions.forEach(chip => {
      chip.addEventListener('click', (e) => {
        this.input.value = e.target.textContent;
        this.handleInput();
        this.input.focus();
      });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closePanel();
      }
    });
  }

  togglePanel() {
    if (this.isOpen) {
      this.closePanel();
    } else {
      this.openPanel(true);
    }
  }

  openPanel(animate = true) {
    this.isOpen = true;
    localStorage.setItem('getti-open', 'true');
    this.panel.removeAttribute('hidden');
    this.fab.setAttribute('aria-expanded', 'true');
    
    // Auto-focus input when opened
    if (animate) {
      setTimeout(() => this.input.focus(), 200);
    }
  }

  closePanel() {
    this.isOpen = false;
    localStorage.setItem('getti-open', 'false');
    this.panel.setAttribute('hidden', '');
    this.fab.setAttribute('aria-expanded', 'false');
  }

  handleInput() {
    const text = this.input.value.trim();
    this.sendBtn.disabled = text.length === 0;
  }

  handleSubmit(e) {
    e.preventDefault();
    const text = this.input.value.trim();
    if (!text) return;

    // 1. Add user message
    this.addMessage(text, 'user');
    
    // 2. Clear input
    this.input.value = '';
    this.handleInput();

    // 3. Process response (Local Fallback Mode)
    this.showTypingIndicator();
    
    setTimeout(() => {
      this.removeTypingIndicator();
      this.processLocalResponse(text);
    }, 800);
  }

  addMessage(text, sender = 'system', isCard = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `getti-message getti-message--${sender}`;
    
    if (isCard) {
      msgDiv.innerHTML = text; // Expecting raw HTML for cards
    } else {
      msgDiv.innerHTML = `
        <div class="message-bubble">
          <p style="margin:0">${this.escapeHTML(text)}</p>
        </div>
      `;
    }
    
    this.messagesContainer.appendChild(msgDiv);
    this.scrollToBottom();
  }

  showTypingIndicator() {
    const msgDiv = document.createElement('div');
    msgDiv.className = `getti-message getti-message--system getti-typing`;
    msgDiv.id = 'getti-typing-indicator';
    msgDiv.innerHTML = `
      <div class="message-bubble">
        <p style="margin:0; opacity: 0.6;">Getti is thinking...</p>
      </div>
    `;
    this.messagesContainer.appendChild(msgDiv);
    this.scrollToBottom();
  }

  removeTypingIndicator() {
    const el = document.getElementById('getti-typing-indicator');
    if (el) el.remove();
  }

  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag])
    );
  }

  // --- Local Mode Heuristics ---

  processLocalResponse(text) {
    const lowerText = text.toLowerCase();
    
    // Check for URL
    const urlMatch = text.match(/(https?:\/\/[^\s]+)/);
    if (urlMatch) {
      this.handleURLSubmission(urlMatch[1]);
      return;
    }

    // Navigation/Help heuristics
    if (lowerText.includes('save') || lowerText.includes('watch later')) {
      this.addMessage("To save a video, click the 'Save' button (bookmark icon) on any video card. You can find all your saved videos in the 'My Learning' tab.");
    } else if (lowerText.includes('progress') || lowerText.includes('completed')) {
      this.addMessage("Your progress is tracked automatically when you click the 'Done' button on a video. Check the 'My Learning' section to see your stats.");
    } else if (lowerText.includes('add') || lowerText.includes('new video')) {
      this.addMessage("You can add a new video by clicking 'Add Link' in the top menu, or simply by pasting a YouTube or Vimeo link right here in our chat!");
    } else if (lowerText.includes('playlist')) {
      this.addMessage("Playlists let you organize videos by topic. You can create a new playlist from the 'Playlist' panel in the top navigation bar.");
    } else {
      this.addMessage("I am currently in local mode, so I can only help with basic app navigation. Try asking me how to save a video, or paste a video link here to add it to your workspace!");
    }
  }

  handleURLSubmission(url) {
    const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
    
    if (isYouTube) {
      const cardHTML = `
        <div class="message-bubble" style="background: var(--surface-raised); border: 1px solid var(--border); border-radius: var(--radius-md); padding: var(--sp-3); width: 280px;">
          <div style="background: var(--bg); height: 120px; border-radius: 4px; display:flex; align-items:center; justify-content:center; margin-bottom: var(--sp-2);">
             <span style="color:var(--ink-muted)">Video Preview</span>
          </div>
          <h4 style="margin: 0 0 var(--sp-1) 0; font-size: 0.875rem; color: var(--ink);">Parsed Video Title</h4>
          <p style="margin: 0 0 var(--sp-3) 0; font-size: 0.75rem; color: var(--ink-muted);">YouTube • 12 mins • Intermediate</p>
          <div style="display: flex; gap: var(--sp-2);">
            <button class="primary-button" style="flex: 1; padding: 6px; font-size: 0.75rem;" onclick="alert('Video saved locally!')">Save to Workspace</button>
          </div>
        </div>
      `;
      this.addMessage("I've analyzed this link! It looks like an educational video. Would you like to save it?", 'system');
      setTimeout(() => this.addMessage(cardHTML, 'system', true), 300);
    } else {
      this.addMessage("This link doesn't look like a standard educational video source to me right now. Are you sure you want to add it?");
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.getti = new GettiAssistant();
});
