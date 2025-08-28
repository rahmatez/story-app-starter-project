import { LitElement, html } from 'lit';
import { localeManager } from '../locales/locale-manager.js';
import { AuthService } from '../api/story-api.js';

export class AppNavigation extends LitElement {
  // Disable shadow DOM to use Bootstrap styling
  createRenderRoot() {
    return this;
  }

  static properties = {
    currentPage: { type: String },
    locale: { type: String },
    isAuthenticated: { type: Boolean },
    currentUser: { type: Object }
  };

  constructor() {
    super();
    this.currentPage = 'dashboard';
    this.locale = localeManager.getLocale();
    this.isAuthenticated = AuthService.isAuthenticated();
    this.currentUser = AuthService.getCurrentUser();
    this._onLocaleChange = this._onLocaleChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    localeManager.addListener(this._onLocaleChange);
    
    // Listen for authentication events
    window.addEventListener('login-success', this._handleAuthChange.bind(this));
    window.addEventListener('logout', this._handleAuthChange.bind(this));
    window.addEventListener('auth-failed', this._handleAuthFailed.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    localeManager.removeListener(this._onLocaleChange);
    window.removeEventListener('login-success', this._handleAuthChange.bind(this));
    window.removeEventListener('logout', this._handleAuthChange.bind(this));
    window.removeEventListener('auth-failed', this._handleAuthFailed.bind(this));
  }

  _handleAuthChange() {
    this.isAuthenticated = AuthService.isAuthenticated();
    this.currentUser = AuthService.getCurrentUser();
    this.requestUpdate();
  }

  _handleAuthFailed() {
    this.isAuthenticated = false;
    this.currentUser = null;
    this._handlePageChange('login');
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

  _handleLogin() {
    this._handlePageChange('login');
  }

  _handleRegister() {
    this._handlePageChange('register');
  }

  _handleLogout() {
    AuthService.logout();
    this.isAuthenticated = false;
    this.currentUser = null;
    
    // Dispatch logout event
    window.dispatchEvent(new CustomEvent('logout'));
    
    // Navigate to dashboard
    this._handlePageChange('dashboard');
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
                ${this.isAuthenticated ? html`
                  <li class="nav-item">
                    <a class="nav-link ${this.currentPage === 'add-story' ? 'active' : ''}" 
                       href="#" @click=${(e) => { e.preventDefault(); this._handlePageChange('add-story'); }}>
                      <i class="fas fa-plus"></i>
                      ${msg('add-story')}
                    </a>
                  </li>
                ` : ''}
                <li class="nav-item">
                  <a class="nav-link ${this.currentPage === 'about' ? 'active' : ''}" 
                     href="#" @click=${(e) => { e.preventDefault(); this._handlePageChange('about'); }}>
                    <i class="fas fa-info-circle"></i>
                    ${msg('about')}
                  </a>
                </li>
                
                <!-- Authentication Section -->
                ${this.isAuthenticated ? html`
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" 
                       data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="fas fa-user-circle"></i>
                      ${this.currentUser?.name || 'User'}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                      <li><h6 class="dropdown-header">
                        <i class="fas fa-user me-2"></i>
                        ${this.currentUser?.name}
                      </h6></li>
                      <li><hr class="dropdown-divider"></li>
                      <li>
                        <a class="dropdown-item" href="#" @click=${(e) => { e.preventDefault(); this._handleLogout(); }}>
                          <i class="fas fa-sign-out-alt me-2"></i>
                          ${msg('logout') || 'Logout'}
                        </a>
                      </li>
                    </ul>
                  </li>
                ` : html`
                  <li class="nav-item">
                    <a class="nav-link" href="#" @click=${(e) => { e.preventDefault(); this._handleLogin(); }}>
                      <i class="fas fa-sign-in-alt"></i>
                      ${msg('login') || 'Login'}
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#" @click=${(e) => { e.preventDefault(); this._handleRegister(); }}>
                      <i class="fas fa-user-plus"></i>
                      ${msg('register') || 'Register'}
                    </a>
                  </li>
                `}
                
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
