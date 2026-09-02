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

  async handleSubmit(e) {
    e.preventDefault();
    const text = this.input.value.trim();
    if (!text) return;

    // 1. Add user message
    this.addMessage(text, 'user');
    
    // 2. Clear input
    this.input.value = '';
    this.handleInput();

    // 3. Process response
    this.showTypingIndicator();
    await this.processResponse(text);
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

  async processResponse(text) {
    const lowerText = text.toLowerCase();
    
    // Check for URL
    const urlMatch = text.match(/(https?:\/\/[^\s]+)/);
    if (urlMatch) {
      this.removeTypingIndicator();
      this.validateURL(urlMatch[1]);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: text })
      });

      this.removeTypingIndicator();

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      // We will parse minimal markdown here for formatting (basic bold and newlines)
      let formattedText = data.response
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
        
      this.addMessage(formattedText, 'system', true);
      
    } catch (error) {
      console.error('Chat API Error:', error);
      this.removeTypingIndicator();
      // Fallback
      if (lowerText.includes('save') || lowerText.includes('watch later')) {
        this.addMessage("To save a video, click the 'Save' button. (Note: AI backend is currently offline)");
      } else {
        this.addMessage("I'm sorry, I'm having trouble connecting to my AI brain right now. Please ensure the backend is running!");
      }
    }
  }

  async validateURL(url) {
    this.showTypingIndicator();
    this.addMessage("Analyzing URL...", 'system');
    
    try {
      const response = await fetch('http://localhost:8000/api/v1/chat/validate-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url })
      });

      this.removeTypingIndicator();

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.is_educational) {
        const cardHTML = `
          <div class="message-bubble" style="background: var(--surface-raised); border: 1px solid var(--border); border-radius: var(--radius-md); padding: var(--sp-3); width: 280px;">
            <div style="background: var(--bg); height: 120px; border-radius: 4px; display:flex; align-items:center; justify-content:center; margin-bottom: var(--sp-2);">
               <span style="color:var(--ink-muted)">Video Preview</span>
            </div>
            <h4 style="margin: 0 0 var(--sp-1) 0; font-size: 0.875rem; color: var(--ink); line-height: 1.3;">${this.escapeHTML(data.title)}</h4>
            <p style="margin: 0 0 var(--sp-3) 0; font-size: 0.75rem; color: var(--ink-muted);">${this.escapeHTML(data.topic)} • ${data.duration_minutes} mins • ${this.escapeHTML(data.level)}</p>
            <p style="margin: 0 0 var(--sp-3) 0; font-size: 0.75rem; color: var(--ink); font-style: italic;">"${this.escapeHTML(data.reason)}"</p>
            <div style="display: flex; gap: var(--sp-2);">
              <button class="primary-button" style="flex: 1; padding: 6px; font-size: 0.75rem;" onclick="
                let saved = JSON.parse(localStorage.getItem('g2l_saved_videos') || '[]');
                saved.push(${JSON.stringify(url).replace(/"/g, '&quot;')});
                localStorage.setItem('g2l_saved_videos', JSON.stringify(saved));
                this.textContent = 'Saved!';
                this.disabled = true;
                this.style.background = 'var(--success)';
              ">Save to Workspace</button>
            </div>
          </div>
        `;
        this.addMessage("This looks like a great resource. Here's what I found:", 'system');
        setTimeout(() => this.addMessage(cardHTML, 'system', true), 300);
      } else {
        this.addMessage(`This doesn't seem like an educational video. Reason: ${data.reason}. If you still want to save it, you can use the 'Add Link' button at the top!`);
      }
      
    } catch (error) {
      console.error('URL Validation API Error:', error);
      this.removeTypingIndicator();
      this.addMessage("I'm sorry, I couldn't validate that URL right now. Please try again later.");
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.getti = new GettiAssistant();
});
