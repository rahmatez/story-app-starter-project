import { LitElement, html, css } from 'lit';
import { localeManager } from '../locales/locale-manager.js';

export class AppNavigation extends LitElement {
  // Disable shadow DOM to use Bootstrap styling
  createRenderRoot() {
    return this;
  }

  static properties = {
    currentPage: { type: String },
    locale: { type: String }
  };

  constructor() {
    super();
    this.currentPage = 'dashboard';
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

  _handlePageChange(page) {
    this.currentPage = page;
    this.dispatchEvent(new CustomEvent('page-change', {
      detail: { page },
      bubbles: true,
      composed: true
    }));
  }

  _toggleLanguage() {
    const newLocale = this.locale === 'id' ? 'en' : 'id';
    localeManager.setLocale(newLocale);
  }

  render() {
    const msg = (key) => localeManager.getMessage(key);

    return html`
      <nav class="navbar navbar-expand-lg app-header">
        <div class="container">
          <a class="navbar-brand" href="#" @click=${(e) => { e.preventDefault(); this._handlePageChange('dashboard'); }}>
            <i class="fas fa-book-open"></i>
            ${msg('app-title')}
          </a>

          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" 
                  data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
                  aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" 
               aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">${msg('app-title')}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" 
                      aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                  <a class="nav-link ${this.currentPage === 'dashboard' ? 'active' : ''}" 
                     href="#" @click=${(e) => { e.preventDefault(); this._handlePageChange('dashboard'); }}>
                    <i class="fas fa-home"></i>
                    ${msg('dashboard')}
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link ${this.currentPage === 'add-story' ? 'active' : ''}" 
                     href="#" @click=${(e) => { e.preventDefault(); this._handlePageChange('add-story'); }}>
                    <i class="fas fa-plus"></i>
                    ${msg('add-story')}
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link ${this.currentPage === 'about' ? 'active' : ''}" 
                     href="#" @click=${(e) => { e.preventDefault(); this._handlePageChange('about'); }}>
                    <i class="fas fa-info-circle"></i>
                    ${msg('about')}
                  </a>
                </li>
                <li class="nav-item">
                  <button class="btn btn-outline-light btn-sm ms-2" 
                          @click=${this._toggleLanguage}
                          type="button">
                    <i class="fas fa-globe"></i>
                    ${this.locale.toUpperCase()}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define('app-navigation', AppNavigation);
