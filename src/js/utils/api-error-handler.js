/**
 * API Error Handler Utility
 * Provides consistent error handling for API responses
 */
export class ApiErrorHandler {
  /**
   * Handle API errors and return user-friendly messages
   * @param {Object} error - Error object from API
   * @returns {Object} Formatted error object
   */
  static handleError(error) {
    let errorMessage = 'An unexpected error occurred';
    let errorCode = 'UNKNOWN_ERROR';
    let statusCode = 0;

    if (error.status) {
      statusCode = error.status;
    }

    // Handle specific error cases
    switch (statusCode) {
      case 400:
        errorMessage = error.message || 'Invalid request. Please check your input.';
        errorCode = 'BAD_REQUEST';
        break;
      case 401:
        errorMessage = 'Authentication failed. Please login again.';
        errorCode = 'UNAUTHORIZED';
        break;
      case 403:
        errorMessage = 'Access denied. You don\'t have permission to perform this action.';
        errorCode = 'FORBIDDEN';
        break;
      case 404:
        errorMessage = 'Resource not found.';
        errorCode = 'NOT_FOUND';
        break;
      case 413:
        errorMessage = 'File too large. Please choose a smaller image (max 1MB).';
        errorCode = 'FILE_TOO_LARGE';
        break;
      case 422:
        errorMessage = error.message || 'Invalid data provided. Please check your input.';
        errorCode = 'VALIDATION_ERROR';
        break;
      case 429:
        errorMessage = 'Too many requests. Please try again later.';
        errorCode = 'TOO_MANY_REQUESTS';
        break;
      case 500:
        errorMessage = 'Server error. Please try again later.';
        errorCode = 'SERVER_ERROR';
        break;
      case 0:
        errorMessage = error.message || 'Network error. Please check your internet connection.';
        errorCode = 'NETWORK_ERROR';
        break;
      default:
        errorMessage = error.message || errorMessage;
        errorCode = 'API_ERROR';
    }

    return {
      message: errorMessage,
      code: errorCode,
      status: statusCode,
      originalError: error
    };
  }

  /**
   * Show error message to user
   * @param {Object} error - Error object
   * @param {HTMLElement} container - Container element to show error
   */
  static showErrorToUser(error, container = null) {
    const formattedError = this.handleError(error);
    
    if (container) {
      this.displayErrorInContainer(formattedError, container);
    } else {
      this.displayGlobalError(formattedError);
    }
  }

  /**
   * Display error in specific container
   * @param {Object} error - Formatted error object
   * @param {HTMLElement} container - Container element
   */
  static displayErrorInContainer(error, container) {
    // Remove existing error messages
    const existingErrors = container.querySelectorAll('.alert-danger');
    existingErrors.forEach(el => el.remove());

    // Create error alert
    const errorAlert = document.createElement('div');
    errorAlert.className = 'alert alert-danger alert-dismissible fade show';
    errorAlert.innerHTML = `
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      <strong>Error:</strong> ${error.message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    // Insert at the beginning of container
    container.insertBefore(errorAlert, container.firstChild);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      if (errorAlert && errorAlert.parentNode) {
        errorAlert.remove();
      }
    }, 5000);
  }

  /**
   * Display global error notification
   * @param {Object} error - Formatted error object
   */
  static displayGlobalError(error) {
    // Create or get global error container
    let globalErrorContainer = document.getElementById('global-error-container');
    
    if (!globalErrorContainer) {
      globalErrorContainer = document.createElement('div');
      globalErrorContainer.id = 'global-error-container';
      globalErrorContainer.className = 'position-fixed top-0 end-0 p-3';
      globalErrorContainer.style.zIndex = '1056';
      document.body.appendChild(globalErrorContainer);
    }

    // Create toast notification
    const toastId = `error-toast-${Date.now()}`;
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = 'toast align-items-center text-white bg-danger border-0';
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          ${error.message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `;

    globalErrorContainer.appendChild(toast);

    // Initialize and show toast
    const toastElement = new bootstrap.Toast(toast, {
      autohide: true,
      delay: 5000
    });
    toastElement.show();

    // Remove toast element after hiding
    toast.addEventListener('hidden.bs.toast', () => {
      toast.remove();
    });
  }

  /**
   * Validate form data before API request
   * @param {Object} data - Form data to validate
   * @param {Array} requiredFields - Array of required field names
   * @returns {Object} Validation result
   */
  static validateFormData(data, requiredFields = []) {
    const errors = [];

    // Check required fields
    requiredFields.forEach(field => {
      if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
        errors.push(`${field} is required`);
      }
    });

    // Email validation
    if (data.email && !this.isValidEmail(data.email)) {
      errors.push('Please enter a valid email address');
    }

    // Password validation
    if (data.password && data.password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} Validation result
   */
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Show success message to user
   * @param {string} message - Success message
   * @param {HTMLElement} container - Container element (optional)
   */
  static showSuccessMessage(message, container = null) {
    if (container) {
      this.displaySuccessInContainer(message, container);
    } else {
      this.displayGlobalSuccess(message);
    }
  }

  /**
   * Display success message in container
   * @param {string} message - Success message
   * @param {HTMLElement} container - Container element
   */
  static displaySuccessInContainer(message, container) {
    // Remove existing messages
    const existingMessages = container.querySelectorAll('.alert-success, .alert-danger');
    existingMessages.forEach(el => el.remove());

    // Create success alert
    const successAlert = document.createElement('div');
    successAlert.className = 'alert alert-success alert-dismissible fade show';
    successAlert.innerHTML = `
      <i class="bi bi-check-circle-fill me-2"></i>
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    container.insertBefore(successAlert, container.firstChild);

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      if (successAlert && successAlert.parentNode) {
        successAlert.remove();
      }
    }, 3000);
  }

  /**
   * Display global success notification
   * @param {string} message - Success message
   */
  static displayGlobalSuccess(message) {
    // Create or get global success container
    let globalContainer = document.getElementById('global-error-container');
    
    if (!globalContainer) {
      globalContainer = document.createElement('div');
      globalContainer.id = 'global-error-container';
      globalContainer.className = 'position-fixed top-0 end-0 p-3';
      globalContainer.style.zIndex = '1056';
      document.body.appendChild(globalContainer);
    }

    // Create toast notification
    const toastId = `success-toast-${Date.now()}`;
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = 'toast align-items-center text-white bg-success border-0';
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          <i class="bi bi-check-circle-fill me-2"></i>
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `;

    globalContainer.appendChild(toast);

    // Initialize and show toast
    const toastElement = new bootstrap.Toast(toast, {
      autohide: true,
      delay: 3000
    });
    toastElement.show();

    // Remove toast element after hiding
    toast.addEventListener('hidden.bs.toast', () => {
      toast.remove();
    });
  }
}
