import { LitElement, html, css } from 'lit';
import { localeManager } from '../locales/locale-manager.js';

export class AppFooter extends LitElement {
  // Disable shadow DOM to use Bootstrap styling
  createRenderRoot() {
    return this;
  }

  static properties = {
    locale: { type: String }
  };

  constructor() {
    super();
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
    const msg = (key) => localeManager.getMessage(key);

    return html`
      <footer class="app-footer">
        <div class="container">
          <div class="footer-content">
            <h5><i class="fas fa-book-open me-2"></i>${msg('app-title')}</h5>
            <p>${msg('footer-text')}</p>
            <div class="social-links">
              <a href="#" title="Facebook"><i class="fab fa-facebook"></i></a>
              <a href="#" title="Twitter"><i class="fab fa-twitter"></i></a>
              <a href="#" title="Instagram"><i class="fab fa-instagram"></i></a>
              <a href="#" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
            </div>
          </div>
          <div class="copyright">
            ${msg('copyright')}
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('app-footer', AppFooter);
