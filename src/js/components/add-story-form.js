import { LitElement, html } from 'lit';
import { localeManager } from '../locales/locale-manager.js';
import { StoryService, AuthService } from '../api/story-api.js';
import { ApiErrorHandler } from '../utils/api-error-handler.js';

export class AddStoryForm extends LitElement {
  // Disable shadow DOM to use Bootstrap styling
  createRenderRoot() {
    return this;
  }

  static properties = {
    locale: { type: String },
    isSubmitting: { type: Boolean }
  };

  constructor() {
    super();
    this.locale = localeManager.getLocale();
    this.isSubmitting = false;
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

  _handleFileChange(event) {
    const file = event.target.files[0];
    const fileUpload = this.querySelector('.file-upload');
    const fileLabel = this.querySelector('.file-upload-label');
    
    if (file) {
      fileUpload.classList.add('has-file');
      const uploadText = fileLabel.querySelector('.upload-text');
      uploadText.textContent = file.name;
      
      // Clear any existing validation errors
      event.target.classList.remove('is-invalid');
      const feedback = this.querySelector('#photo-feedback');
      if (feedback) feedback.style.display = 'none';
    } else {
      fileUpload.classList.remove('has-file');
      const uploadText = fileLabel.querySelector('.upload-text');
      const msg = (key) => localeManager.getMessage(key);
      uploadText.textContent = msg('select-photo');
    }
  }

  _validateForm() {
    const description = this.querySelector('#description');
    const photo = this.querySelector('#photo');
    let isValid = true;

    const msg = (key) => localeManager.getMessage(key);

    // Validate description
    if (!description.value.trim()) {
      description.classList.add('is-invalid');
      description.classList.remove('is-valid');
      this._showFeedback('description-feedback', msg('form-description-required'), 'invalid');
      isValid = false;
    } else {
      description.classList.add('is-valid');
      description.classList.remove('is-invalid');
      this._showFeedback('description-feedback', '', 'valid');
    }

    // Validate photo
    if (!photo.files || photo.files.length === 0) {
      this._showFeedback('photo-feedback', msg('form-photo-required'), 'invalid');
      isValid = false;
    } else {
      const file = photo.files[0];
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        this._showFeedback('photo-feedback', 'Please select a valid image file', 'invalid');
        isValid = false;
      }
      // Check file size (max 1MB as per API documentation)
      else if (file.size > 1024 * 1024) {
        this._showFeedback('photo-feedback', 'Image size must be less than 1MB', 'invalid');
        isValid = false;
      } else {
        this._showFeedback('photo-feedback', '', 'valid');
      }
    }

    return isValid;
  }

  _showFeedback(elementId, message, type) {
    const feedback = this.querySelector(`#${elementId}`);
    if (feedback) {
      feedback.textContent = message;
      feedback.className = type === 'invalid' ? 'invalid-feedback' : 'valid-feedback';
      feedback.style.display = message ? 'block' : 'none';
    }
  }

  async _handleSubmit(event) {
    event.preventDefault();
    
    if (!this._validateForm()) {
      return;
    }

    // Check authentication
    if (!AuthService.isAuthenticated()) {
      ApiErrorHandler.showErrorToUser({
        message: 'Please login to add a story',
        status: 401
      });
      return;
    }

    this.isSubmitting = true;
    
    const description = this.querySelector('#description').value.trim();
    const photo = this.querySelector('#photo').files[0];

    try {
      // Create FormData for multipart/form-data request
      const formData = new FormData();
      formData.append('description', description);
      formData.append('photo', photo);
      
      // Optional: Add location data if geolocation is available
      if (navigator.geolocation) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              timeout: 5000,
              enableHighAccuracy: false
            });
          });
          
          formData.append('lat', position.coords.latitude);
          formData.append('lon', position.coords.longitude);
        } catch (locationError) {
          console.warn('Could not get location:', locationError);
          // Continue without location data
        }
      }

      // Send story to API using Axios
      const response = await StoryService.addStory(formData);
      
      if (response.error === false) {
        // Show success message
        ApiErrorHandler.showSuccessMessage('Story added successfully!');
        
        // Dispatch custom event with form data
        this.dispatchEvent(new CustomEvent('story-added', {
          detail: { story: formData },
          bubbles: true,
          composed: true
        }));
        
        // Reset form
        this._resetForm();
        
      } else {
        throw new Error(response.message || 'Failed to add story');
      }
      
    } catch (error) {
      console.error('Error adding story:', error);
      ApiErrorHandler.showErrorToUser(error);
    } finally {
      this.isSubmitting = false;
    }
  }

  _showSuccessMessage() {
    // Success message is now handled by ApiErrorHandler.showSuccessMessage()
    // This method is kept for backward compatibility
  }

  _showErrorMessage() {
    // Error message is now handled by ApiErrorHandler.showErrorToUser()
    // This method is kept for backward compatibility
  }

  _resetForm() {
    const form = this.querySelector('form');
    form.reset();
    
    // Reset file upload UI
    const fileUpload = this.querySelector('.file-upload');
    fileUpload.classList.remove('has-file');
    const uploadText = this.querySelector('.upload-text');
    const msg = (key) => localeManager.getMessage(key);
    uploadText.textContent = msg('select-photo');
    
    // Remove validation classes
    this.querySelectorAll('.form-control').forEach(input => {
      input.classList.remove('is-valid', 'is-invalid');
    });
    
    // Hide feedback messages
    this.querySelectorAll('.invalid-feedback, .valid-feedback').forEach(feedback => {
      feedback.style.display = 'none';
    });
  }

  _handleCancel() {
    this.dispatchEvent(new CustomEvent('form-cancel', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const msg = (key) => localeManager.getMessage(key);

    return html`
      <div class="add-story-form">
        <div class="form-header">
          <h2>${msg('add-story')}</h2>
          <p>${this.locale === 'id' ? 'Bagikan momen berharga Anda dengan dunia' : 'Share your precious moments with the world'}</p>
        </div>

        <form @submit=${this._handleSubmit} novalidate>
          <div class="form-group">
            <label for="description">${msg('description')} *</label>
            <textarea 
              id="description" 
              name="description"
              class="form-control" 
              placeholder="${msg('form-description-placeholder')}"
              rows="4"
              required></textarea>
            <div id="description-feedback" class="invalid-feedback"></div>
          </div>

          <div class="form-group">
            <label for="photo">${msg('photo')} *</label>
            <div class="file-upload">
              <input 
                type="file" 
                id="photo" 
                name="photo"
                accept="image/*"
                required
                @change=${this._handleFileChange}>
              <label for="photo" class="file-upload-label">
                <i class="fas fa-cloud-upload-alt"></i>
                <span class="upload-text">${msg('select-photo')}</span>
                <span class="upload-hint">${msg('drag-drop-hint')}</span>
              </label>
            </div>
            <div id="photo-feedback" class="invalid-feedback"></div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click=${this._handleCancel}>
              <i class="fas fa-arrow-left me-1"></i>
              ${msg('cancel')}
            </button>
            <button type="submit" class="btn btn-primary" ?disabled=${this.isSubmitting}>
              ${this.isSubmitting ? html`
                <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                ${this.locale === 'id' ? 'Mengirim...' : 'Submitting...'}
              ` : html`
                <i class="fas fa-paper-plane me-1"></i>
                ${msg('submit')}
              `}
            </button>
          </div>
        </form>
      </div>
    `;
  }
}

customElements.define('add-story-form', AddStoryForm);
