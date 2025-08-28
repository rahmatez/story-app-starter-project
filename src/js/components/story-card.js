import { LitElement, html } from 'lit';
import { DateFormatter } from '../utils/date-formatter.js';
import { localeManager } from '../locales/locale-manager.js';

export class StoryCard extends LitElement {
  // Disable shadow DOM to use Bootstrap styling
  createRenderRoot() {
    return this;
  }

  static properties = {
    story: { type: Object },
    locale: { type: String }
  };

  constructor() {
    super();
    this.story = {};
    this.locale = localeManager.getLocale();
    this._onLocaleChange = this._onLocaleChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    localeManager.addListener(this._onLocaleChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    localeManager.removeListener(this._onLocaleChange);
  }

  _onLocaleChange(newLocale) {
    this.locale = newLocale;
  }

  _getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  _handleImageError(event) {
    event.target.src = 'https://via.placeholder.com/1200x700/6366f1/ffffff?text=Story+Image';
  }

  _getValidPhotoUrl(photoUrl) {
    // Validasi: photoUrl harus string dan mengandung 'http' atau 'blob:' atau 'data:'
    if (typeof photoUrl === 'string' && 
        (photoUrl.startsWith('http') || 
         photoUrl.startsWith('blob:') || 
         photoUrl.startsWith('data:'))) {
      return photoUrl;
    }
    // Fallback ke placeholder
    return 'https://via.placeholder.com/1200x700/6366f1/ffffff?text=Story+Image';
  }

  render() {
    if (!this.story.id) return html``;

    const formattedDate = DateFormatter.formatToReadable(this.story.createdAt, this.locale);
    const relativeTime = DateFormatter.getRelativeTime(this.story.createdAt, this.locale);

    return html`
      <div class="story-card fade-in">
        <div class="card-header">
          <div class="user-info">
            <div class="avatar">
              ${this._getInitials(this.story.name)}
            </div>
            <div class="user-details">
              <p class="username">${this.story.name}</p>
              <p class="date" title="${formattedDate}">${relativeTime}</p>
            </div>
          </div>
        </div>
        
        <div class="card-image">
          <img src="${this._getValidPhotoUrl(this.story.photoUrl)}" 
               alt="Story by ${this.story.name}"
               @error=${this._handleImageError}
               loading="lazy">
        </div>
        
        <div class="card-body">
          <p class="description">${this.story.description}</p>
          
          <div class="card-actions">
            <div class="action-buttons">
              <button class="btn btn-sm">
                <i class="far fa-heart"></i>
                ${this.locale === 'id' ? 'Suka' : 'Like'}
              </button>
              <button class="btn btn-sm">
                <i class="far fa-comment"></i>
                ${this.locale === 'id' ? 'Komentar' : 'Comment'}
              </button>
              <button class="btn btn-sm">
                <i class="far fa-share-square"></i>
                ${this.locale === 'id' ? 'Bagikan' : 'Share'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('story-card', StoryCard);
