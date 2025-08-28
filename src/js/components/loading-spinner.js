import { LitElement, html, css } from 'lit';
import { localeManager } from '../locales/locale-manager.js';

export class LoadingSpinner extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
    }

    .spinner-container {
      text-align: center;
    }

    .custom-spinner {
      width: 50px;
      height: 50px;
      border: 4px solid rgba(99, 102, 241, 0.2);
      border-left: 4px solid #6366f1;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }

    .loading-text {
      color: #6366f1;
      font-weight: 500;
      font-size: 1rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  static properties = {
    text: { type: String },
    locale: { type: String }
  };

  constructor() {
    super();
    this.text = '';
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

  render() {
    const defaultText = this.locale === 'id' ? 'Memuat...' : 'Loading...';
    const loadingText = this.text || defaultText;

    return html`
      <div class="spinner-container">
        <div class="custom-spinner"></div>
        <div class="loading-text">${loadingText}</div>
      </div>
    `;
  }
}

customElements.define('loading-spinner', LoadingSpinner);
