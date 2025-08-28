import { LitElement, html, css } from 'lit';
import { AuthService } from '../api/story-api.js';
import { ApiErrorHandler } from '../utils/api-error-handler.js';

class RegisterPage extends LitElement {
  static properties = {
    isLoading: { type: Boolean },
    showPassword: { type: Boolean }
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

    .register-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      box-sizing: border-box;
      overflow-y: auto;
    }

    .register-card {
      background: white;
      border-radius: 1rem;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      width: 100%;
      max-width: 420px;
      padding: 2.5rem;
      margin: 0 auto;
      box-sizing: border-box;
    }

    .register-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .register-title {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .register-subtitle {
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

    .form-control.is-valid {
      border-color: #28a745;
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

    .password-requirements {
      margin-top: 0.5rem;
      font-size: 0.75rem;
      color: #6b7280;
      padding: 0.5rem;
      border-radius: 0.375rem;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
    }

    .requirement {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      margin-bottom: 0.25rem;
      transition: color 0.15s ease-in-out;
    }

    .requirement:last-child {
      margin-bottom: 0;
    }

    .requirement.valid {
      color: #059669;
    }

    .requirement.invalid {
      color: #dc2626;
    }

    .requirement i {
      font-size: 0.875rem;
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

    .login-link {
      text-align: center;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e5e7eb;
    }

    .login-link a {
      color: #6366f1;
      text-decoration: none;
      font-weight: 500;
    }

    .login-link a:hover {
      text-decoration: underline;
    }

    .invalid-feedback {
      display: block;
      width: 100%;
      margin-top: 0.25rem;
      font-size: 0.875rem;
      color: #dc3545;
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
      .register-container {
        padding: 1rem;
      }

      .register-card {
        padding: 2rem 1.5rem;
        max-width: 100%;
        margin: 0;
      }

      .back-to-home {
        top: 1rem;
        left: 1rem;
        font-size: 0.9rem;
      }

      .register-title {
        font-size: 1.75rem;
      }
    }

    @media (max-width: 480px) {
      .register-container {
        padding: 0.5rem;
      }

      .register-card {
        padding: 1.5rem 1rem;
        border-radius: 0.5rem;
      }
    }
  `;

  constructor() {
    super();
    this.isLoading = false;
    this.showPassword = false;
    this.passwordRequirements = {
      minLength: false,
      hasLetter: false,
      hasNumber: false
    };
  }

  render() {
    return html`
      <div class="register-container">
        <a href="#" class="back-to-home" @click="${this._handleBackToHome}">
          <i class="bi bi-arrow-left"></i>
          Back to Home
        </a>
        
        <div class="register-card">
          <div class="register-header">
            <h1 class="register-title">
              <i class="bi bi-person-plus text-primary"></i>
              Join Story App
            </h1>
            <p class="register-subtitle">Create your account to start sharing stories</p>
          </div>

          <div id="error-container"></div>

          <form @submit="${this._handleSubmit}">
            <div class="form-group">
              <label for="name" class="form-label">
                <i class="bi bi-person me-1"></i>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                class="form-control"
                placeholder="Enter your full name"
                required
                ?disabled="${this.isLoading}"
                @input="${this._validateName}"
              />
              <div class="invalid-feedback" id="name-error"></div>
            </div>

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
                @input="${this._validateEmail}"
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
                  placeholder="Create a password"
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
              <div class="password-requirements">
                <div class="requirement ${this.passwordRequirements.minLength ? 'valid' : 'invalid'}">
                  <i class="bi ${this.passwordRequirements.minLength ? 'bi-check-circle' : 'bi-x-circle'}"></i>
                  At least 8 characters
                </div>
                <div class="requirement ${this.passwordRequirements.hasLetter ? 'valid' : 'invalid'}">
                  <i class="bi ${this.passwordRequirements.hasLetter ? 'bi-check-circle' : 'bi-x-circle'}"></i>
                  Contains a letter
                </div>
                <div class="requirement ${this.passwordRequirements.hasNumber ? 'valid' : 'invalid'}">
                  <i class="bi ${this.passwordRequirements.hasNumber ? 'bi-check-circle' : 'bi-x-circle'}"></i>
                  Contains a number
                </div>
              </div>
              <div class="invalid-feedback" id="password-error"></div>
            </div>

            <button
              type="submit"
              class="btn btn-primary"
              ?disabled="${this.isLoading || !this._isFormValid()}"
            >
              ${this.isLoading ? html`
                <div class="spinner"></div>
                Creating Account...
              ` : html`
                <i class="bi bi-person-check"></i>
                Create Account
              `}
            </button>
          </form>

          <div class="login-link">
            <p>Already have an account? <a href="#" @click="${this._handleLoginLink}">Sign in here</a></p>
          </div>
        </div>
      </div>
    `;
  }

  _togglePassword() {
    this.showPassword = !this.showPassword;
  }

  _handleBackToHome(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: { page: 'dashboard' },
      bubbles: true,
      composed: true
    }));
  }

  _handleLoginLink(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: { page: 'login' },
      bubbles: true,
      composed: true
    }));
  }

  _validateName(e) {
    const nameInput = e.target;
    const nameError = this.shadowRoot.getElementById('name-error');
    
    if (nameInput.value.trim().length < 2) {
      nameInput.classList.add('is-invalid');
      nameInput.classList.remove('is-valid');
      nameError.textContent = 'Name must be at least 2 characters long';
    } else {
      nameInput.classList.remove('is-invalid');
      nameInput.classList.add('is-valid');
      nameError.textContent = '';
    }
  }

  _validateEmail(e) {
    const emailInput = e.target;
    const emailError = this.shadowRoot.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(emailInput.value)) {
      emailInput.classList.add('is-invalid');
      emailInput.classList.remove('is-valid');
      emailError.textContent = 'Please enter a valid email address';
    } else {
      emailInput.classList.remove('is-invalid');
      emailInput.classList.add('is-valid');
      emailError.textContent = '';
    }
  }

  _validatePassword(e) {
    const password = e.target.value;
    const passwordInput = e.target;
    
    // Update requirements
    this.passwordRequirements = {
      minLength: password.length >= 8,
      hasLetter: /[a-zA-Z]/.test(password),
      hasNumber: /\d/.test(password)
    };

    // Update input styling
    const isValid = this._isPasswordValid();
    if (isValid) {
      passwordInput.classList.remove('is-invalid');
      passwordInput.classList.add('is-valid');
    } else {
      passwordInput.classList.add('is-invalid');
      passwordInput.classList.remove('is-valid');
    }

    this.requestUpdate();
  }

  _isPasswordValid() {
    return Object.values(this.passwordRequirements).every(req => req);
  }

  _isFormValid() {
    const nameInput = this.shadowRoot?.getElementById('name');
    const emailInput = this.shadowRoot?.getElementById('email');
    const passwordInput = this.shadowRoot?.getElementById('password');

    if (!nameInput || !emailInput || !passwordInput) return false;

    return nameInput.value.trim().length >= 2 &&
           ApiErrorHandler.isValidEmail(emailInput.value) &&
           this._isPasswordValid();
  }

  async _handleSubmit(e) {
    e.preventDefault();
    
    if (this.isLoading) return;

    const formData = new FormData(e.target);
    const registerData = {
      name: formData.get('name').trim(),
      email: formData.get('email').trim(),
      password: formData.get('password')
    };

    // Validate form data
    const validation = ApiErrorHandler.validateFormData(registerData, ['name', 'email', 'password']);
    if (!validation.isValid) {
      this._showValidationErrors(validation.errors);
      return;
    }

    // Additional password validation
    if (!this._isPasswordValid()) {
      const passwordError = this.shadowRoot.getElementById('password-error');
      passwordError.textContent = 'Password does not meet all requirements';
      return;
    }

    this.isLoading = true;
    this._clearErrors();

    try {
      const response = await AuthService.register(registerData);
      
      if (response.error === false) {
        ApiErrorHandler.showSuccessMessage('Account created successfully! Please login to continue.');
        
        // Dispatch registration success event
        this.dispatchEvent(new CustomEvent('register-success', {
          detail: { user: registerData },
          bubbles: true,
          composed: true
        }));

        // Navigate to login page after a short delay
        setTimeout(() => {
          this.dispatchEvent(new CustomEvent('navigate', {
            detail: { page: 'login' },
            bubbles: true,
            composed: true
          }));
        }, 2000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorContainer = this.shadowRoot.getElementById('error-container');
      ApiErrorHandler.showErrorToUser(error, errorContainer);
    } finally {
      this.isLoading = false;
    }
  }

  _showValidationErrors(errors) {
    errors.forEach(error => {
      if (error.includes('name')) {
        const nameInput = this.shadowRoot.getElementById('name');
        const nameError = this.shadowRoot.getElementById('name-error');
        nameInput.classList.add('is-invalid');
        nameError.textContent = error;
      }
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
    errors.forEach(error => error.textContent = '');
    
    const errorContainer = this.shadowRoot.getElementById('error-container');
    errorContainer.innerHTML = '';
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

customElements.define('register-page', RegisterPage);
