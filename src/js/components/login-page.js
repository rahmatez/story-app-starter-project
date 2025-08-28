import { LitElement, html, css } from 'lit';
import { AuthService } from '../api/story-api.js';
import { ApiErrorHandler } from '../utils/api-error-handler.js';

class LoginPage extends LitElement {
  static properties = {
    isLoading: { type: Boolean },
    showPassword: { type: Boolean },
    passwordStrength: { type: Object }
  };

  static styles = css`
    * {
      box-sizing: border-box;
    }

    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      z-index: 1000;
    }

    .login-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      box-sizing: border-box;
    }

    .login-card {
      background: white;
      border-radius: 1rem;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      width: 100%;
      max-width: 420px;
      padding: 2.5rem;
      margin: 0 auto;
      box-sizing: border-box;
    }

    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .login-title {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .login-subtitle {
      color: #6b7280;
      font-size: 0.875rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #374151;
      font-size: 0.9rem;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-family: inherit;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      box-sizing: border-box;
      background: white;
    }

    .form-control:focus {
      outline: none;
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    .form-control.is-invalid {
      border-color: #dc3545;
    }

    .password-input-group {
      position: relative;
    }

    .password-toggle {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #6b7280;
      cursor: pointer;
      padding: 0;
      font-size: 1.25rem;
    }

    .password-toggle:hover {
      color: #374151;
    }

    .btn {
      width: 100%;
      padding: 0.875rem 1rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      font-family: inherit;
      cursor: pointer;
      transition: all 0.15s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      box-sizing: border-box;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .spinner {
      width: 1rem;
      height: 1rem;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    .register-link {
      text-align: center;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e5e7eb;
    }

    .register-link a {
      color: #6366f1;
      text-decoration: none;
      font-weight: 500;
    }

    .register-link a:hover {
      text-decoration: underline;
    }

    .invalid-feedback {
      display: block;
      width: 100%;
      margin-top: 0.25rem;
      font-size: 0.875rem;
      color: #dc3545;
    }

    .password-strength {
      margin-top: 0.5rem;
      font-size: 0.75rem;
      color: #6b7280;
    }

    .password-strength.valid {
      color: #10b981;
    }

    .password-strength.invalid {
      color: #ef4444;
    }

    .back-to-home {
      position: absolute;
      top: 2rem;
      left: 2rem;
      color: white;
      text-decoration: none;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: opacity 0.15s ease-in-out;
      z-index: 1001;
    }

    .back-to-home:hover {
      opacity: 0.8;
      color: white;
    }

    @media (max-width: 768px) {
      .login-container {
        padding: 1rem;
      }

      .login-card {
        padding: 2rem 1.5rem;
        max-width: 100%;
        margin: 0;
      }

      .back-to-home {
        top: 1rem;
        left: 1rem;
        font-size: 0.9rem;
      }

      .login-title {
        font-size: 1.75rem;
      }
    }

    @media (max-width: 480px) {
      .login-container {
        padding: 0.5rem;
      }

      .login-card {
        padding: 1.5rem 1rem;
        border-radius: 0.5rem;
      }
    }
  `;

  constructor() {
    super();
    this.isLoading = false;
    this.showPassword = false;
    this.passwordStrength = {
      minLength: false,
      isValid: false
    };
  }

  render() {
    return html`
      <div class="login-container">
        <a href="#" class="back-to-home" @click="${this._handleBackToHome}">
          <i class="bi bi-arrow-left"></i>
          Back to Home
        </a>
        
        <div class="login-card">
          <div class="login-header">
            <h1 class="login-title">
              <i class="bi bi-person-circle text-primary"></i>
              Welcome Back
            </h1>
            <p class="login-subtitle">Sign in to your Story App account</p>
          </div>

          <div id="error-container"></div>

          <form @submit="${this._handleSubmit}">
            <div class="form-group">
              <label for="email" class="form-label">
                <i class="bi bi-envelope me-1"></i>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                class="form-control"
                placeholder="Enter your email"
                required
                ?disabled="${this.isLoading}"
              />
              <div class="invalid-feedback" id="email-error"></div>
            </div>

            <div class="form-group">
              <label for="password" class="form-label">
                <i class="bi bi-lock me-1"></i>
                Password
              </label>
              <div class="password-input-group">
                <input
                  type="${this.showPassword ? 'text' : 'password'}"
                  id="password"
                  name="password"
                  class="form-control"
                  placeholder="Enter your password"
                  minlength="8"
                  required
                  ?disabled="${this.isLoading}"
                  @input="${this._validatePassword}"
                />
                <button
                  type="button"
                  class="password-toggle"
                  @click="${this._togglePassword}"
                  ?disabled="${this.isLoading}"
                  title="${this.showPassword ? 'Hide password' : 'Show password'}"
                >
                  <i class="bi ${this.showPassword ? 'bi-eye-slash' : 'bi-eye'}"></i>
                </button>
              </div>
              <div class="password-strength ${this.passwordStrength.isValid ? 'valid' : 'invalid'}">
                <i class="bi ${this.passwordStrength.minLength ? 'bi-check-circle' : 'bi-exclamation-circle'}"></i>
                Password must be at least 8 characters
              </div>
              <div class="invalid-feedback" id="password-error"></div>
            </div>

            <button
              type="submit"
              class="btn btn-primary"
              ?disabled="${this.isLoading}"
            >
              ${this.isLoading ? html`
                <div class="spinner"></div>
                Signing In...
              ` : html`
                <i class="bi bi-box-arrow-in-right"></i>
                Sign In
              `}
            </button>
          </form>

          <div class="register-link">
            <p>Don't have an account? <a href="#" @click="${this._handleRegisterLink}">Create one here</a></p>
          </div>
        </div>
      </div>
    `;
  }

  _togglePassword() {
    this.showPassword = !this.showPassword;
  }

  _validatePassword(e) {
    const password = e.target.value;
    const passwordInput = e.target;
    
    // Update password strength
    this.passwordStrength = {
      minLength: password.length >= 8,
      isValid: password.length >= 8
    };

    // Update input styling
    if (password.length > 0) {
      if (this.passwordStrength.isValid) {
        passwordInput.classList.remove('is-invalid');
        passwordInput.classList.add('is-valid');
      } else {
        passwordInput.classList.add('is-invalid');
        passwordInput.classList.remove('is-valid');
      }
    } else {
      passwordInput.classList.remove('is-invalid', 'is-valid');
    }

    this.requestUpdate();
  }

  _handleBackToHome(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: { page: 'dashboard' },
      bubbles: true,
      composed: true
    }));
  }

  _handleRegisterLink(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: { page: 'register' },
      bubbles: true,
      composed: true
    }));
  }

  async _handleSubmit(e) {
    e.preventDefault();
    
    if (this.isLoading) return;

    const formData = new FormData(e.target);
    const loginData = {
      email: formData.get('email').trim(),
      password: formData.get('password')
    };

    // Client-side validation
    let isValid = true;
    this._clearErrors();

    // Validate email
    if (!loginData.email) {
      this._showFieldError('email', 'Email is required');
      isValid = false;
    } else if (!ApiErrorHandler.isValidEmail(loginData.email)) {
      this._showFieldError('email', 'Please enter a valid email address');
      isValid = false;
    }

    // Validate password
    if (!loginData.password) {
      this._showFieldError('password', 'Password is required');
      isValid = false;
    } else if (loginData.password.length < 8) {
      this._showFieldError('password', 'Password must be at least 8 characters long');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    this.isLoading = true;
    this._clearErrors();

    try {
      const response = await AuthService.login(loginData);
      
      if (response.error === false) {
        ApiErrorHandler.showSuccessMessage('Login successful! Welcome back.');
        
        // Dispatch login success event
        this.dispatchEvent(new CustomEvent('login-success', {
          detail: { user: response.loginResult },
          bubbles: true,
          composed: true
        }));

        // Navigate to dashboard after a short delay
        setTimeout(() => {
          this.dispatchEvent(new CustomEvent('navigate', {
            detail: { page: 'dashboard' },
            bubbles: true,
            composed: true
          }));
        }, 1000);
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorContainer = this.shadowRoot.getElementById('error-container');
      ApiErrorHandler.showErrorToUser(error, errorContainer);
    } finally {
      this.isLoading = false;
    }
  }

  _showFieldError(fieldName, message) {
    const input = this.shadowRoot.getElementById(fieldName);
    const error = this.shadowRoot.getElementById(`${fieldName}-error`);
    if (input && error) {
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
      error.textContent = message;
      error.style.display = 'block';
    }
  }

  _showValidationErrors(errors) {
    errors.forEach(error => {
      if (error.includes('email')) {
        const emailInput = this.shadowRoot.getElementById('email');
        const emailError = this.shadowRoot.getElementById('email-error');
        emailInput.classList.add('is-invalid');
        emailError.textContent = error;
      }
      if (error.includes('password') || error.includes('Password')) {
        const passwordInput = this.shadowRoot.getElementById('password');
        const passwordError = this.shadowRoot.getElementById('password-error');
        passwordInput.classList.add('is-invalid');
        passwordError.textContent = error;
      }
    });
  }

  _clearErrors() {
    const inputs = this.shadowRoot.querySelectorAll('.form-control');
    const errors = this.shadowRoot.querySelectorAll('.invalid-feedback');
    
    inputs.forEach(input => {
      input.classList.remove('is-invalid', 'is-valid');
    });
    errors.forEach(error => {
      error.textContent = '';
      error.style.display = 'none';
    });
    
    const errorContainer = this.shadowRoot.getElementById('error-container');
    if (errorContainer) {
      errorContainer.innerHTML = '';
    }
  }

  connectedCallback() {
    super.connectedCallback();
    
    // Check if user is already logged in
    if (AuthService.isAuthenticated()) {
      this.dispatchEvent(new CustomEvent('navigate', {
        detail: { page: 'dashboard' },
        bubbles: true,
        composed: true
      }));
    }
  }
}

customElements.define('login-page', LoginPage);
