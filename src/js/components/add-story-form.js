import { LitElement, html, css } from 'lit';
import { localeManager } from '../locales/locale-manager.js';

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
      this._showFeedback('photo-feedback', '', 'valid');
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

    this.isSubmitting = true;
    
    const description = this.querySelector('#description').value;
    const photo = this.querySelector('#photo').files[0];

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Convert photo to Data URL (base64) for stable storage
      const photoDataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(photo);
      });
      
      // Create new story object
      const newStory = {
        id: `story-${Date.now()}`,
        name: 'You', // In real app, this would be the logged-in user
        description: description,
        photoUrl: photoDataUrl,
        createdAt: new Date().toISOString()
      };

      // Dispatch custom event with new story
      this.dispatchEvent(new CustomEvent('story-added', {
        detail: { story: newStory },
        bubbles: true,
        composed: true
      }));

      // Show success message
      this._showSuccessMessage();
      
      // Reset form
      this._resetForm();
      
    } catch (error) {
      console.error('Error adding story:', error);
      this._showErrorMessage();
    } finally {
      this.isSubmitting = false;
    }
  }

  _showSuccessMessage() {
    const msg = (key) => localeManager.getMessage(key);
    // You could implement a toast/notification system here
    alert(this.locale === 'id' ? 'Cerita berhasil ditambahkan!' : 'Story added successfully!');
  }

  _showErrorMessage() {
    const msg = (key) => localeManager.getMessage(key);
    alert(this.locale === 'id' ? 'Gagal menambahkan cerita. Silakan coba lagi.' : 'Failed to add story. Please try again.');
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
