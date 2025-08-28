// Import our custom CSS
import '../sass/main.scss';

// Import API services
import { StoryService, AuthService } from './api/story-api.js';
import { ApiErrorHandler } from './utils/api-error-handler.js';

// Import components
import './components/app-navigation.js';
import './components/app-footer.js';
import './components/story-card.js';
import './components/add-story-form.js';
import './components/loading-spinner.js';
import './components/about-page.js';
import './components/login-page.js';
import './components/register-page.js';

// Import utilities
import { localeManager } from './locales/locale-manager.js';

class StoryApp {
  constructor() {
    this.stories = [];
    this.currentPage = 'dashboard';
    this.isLoading = false;
    this.isAuthenticated = AuthService.isAuthenticated();
    
    this.init();
  }

  async init() {
    // Check authentication status
    this.checkAuthenticationStatus();
    
    // Load initial data
    await this.loadStories();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Setup localization
    this.setupLocalization();
    
    // Show initial page
    this.showPage(this.isAuthenticated ? 'dashboard' : 'dashboard');
    
    console.log('Story App initialized successfully!');
  }

  checkAuthenticationStatus() {
    this.isAuthenticated = AuthService.isAuthenticated();
    
    // Listen for authentication events
    window.addEventListener('login-success', () => {
      this.isAuthenticated = true;
      this.loadStories(); // Reload stories after login
    });
    
    window.addEventListener('logout', () => {
      this.isAuthenticated = false;
      this.stories = []; // Clear stories on logout
      this.renderStories();
    });
    
    window.addEventListener('auth-failed', () => {
      this.isAuthenticated = false;
      this.showPage('login');
    });
  }

  async loadStories() {
    this.isLoading = true;
    this.showLoading(true);
    
    try {
      if (this.isAuthenticated) {
        // Load stories from API when authenticated
        const response = await StoryService.getAllStories({
          page: 1,
          size: 10,
          location: 0
        });
        
        if (response.error === false) {
          this.stories = response.listStory || [];
        } else {
          throw new Error(response.message || 'Failed to load stories');
        }
      } else {
        // Load dummy data when not authenticated (for demo purposes)
        const dummyStories = await this.loadDummyData();
        this.stories = dummyStories;
      }
      
      this.renderStories();
    } catch (error) {
      console.error('Error loading stories:', error);
      ApiErrorHandler.showErrorToUser(error);
      this.showError();
    } finally {
      this.isLoading = false;
      this.showLoading(false);
    }
  }

  async loadDummyData() {
    // Fallback to dummy data for non-authenticated users or API errors
    try {
      const response = await fetch('./src/data/storyapp.json');
      const data = await response.json();
      return data.listStory || [];
    } catch (error) {
      console.warn('Could not load dummy data:', error);
      return [];
    }
  }

  setupEventListeners() {
    // Navigation events
    const navigation = document.getElementById('navigation');
    navigation.addEventListener('page-change', (event) => {
      this.showPage(event.detail.page);
    });

    // Add story form events
    const addStoryForm = document.getElementById('add-story-form');
    if (addStoryForm) {
      addStoryForm.addEventListener('story-added', async (event) => {
        await this.addNewStory(event.detail.story);
      });

      addStoryForm.addEventListener('form-cancel', () => {
        this.showPage('dashboard');
      });
    }

    // Floating add button
    const floatingAddBtn = document.getElementById('floating-add-btn');
    if (floatingAddBtn) {
      floatingAddBtn.addEventListener('click', () => {
        if (this.isAuthenticated) {
          this.showPage('add-story');
        } else {
          ApiErrorHandler.showErrorToUser({
            message: 'Please login to add a story',
            status: 401
          });
          this.showPage('login');
        }
      });
    }

    // Add first story button
    const addFirstStoryBtn = document.getElementById('add-first-story-btn');
    if (addFirstStoryBtn) {
      addFirstStoryBtn.addEventListener('click', () => {
        if (this.isAuthenticated) {
          this.showPage('add-story');
        } else {
          this.showPage('login');
        }
      });
    }

    // Authentication navigation events
    document.addEventListener('navigate', (event) => {
      if (event.detail?.page) {
        this.showPage(event.detail.page);
      }
    });

    // Locale change events
    localeManager.addListener(() => {
      this.updateUITexts();
    });
  }

  setupLocalization() {
    this.updateUITexts();
  }

  updateUITexts() {
    const msg = (key) => localeManager.getMessage(key);
    
    // Update dashboard texts
    const dashboardTitle = document.getElementById('dashboard-title');
    const dashboardSubtitle = document.getElementById('dashboard-subtitle');
    const noStoriesTitle = document.getElementById('no-stories-title');
    const noStoriesDescription = document.getElementById('no-stories-description');
    const addFirstStoryText = document.getElementById('add-first-story-text');
    
    if (dashboardTitle) {
      dashboardTitle.textContent = localeManager.getLocale() === 'id' ? 
        'Selamat Datang di Story App' : 'Welcome to Story App';
    }
    if (dashboardSubtitle) {
      dashboardSubtitle.textContent = localeManager.getLocale() === 'id' ? 
        'Bagikan momen berharga Anda dengan dunia' : 'Share your precious moments with the world';
    }
    if (noStoriesTitle) {
      noStoriesTitle.textContent = msg('no-stories');
    }
    if (noStoriesDescription) {
      noStoriesDescription.textContent = msg('no-stories-description');
    }
    if (addFirstStoryText) {
      addFirstStoryText.textContent = msg('add-first-story');
    }

    // Update add story page texts
    const addStoryTitle = document.getElementById('add-story-title');
    const addStorySubtitle = document.getElementById('add-story-subtitle');
    
    if (addStoryTitle) {
      addStoryTitle.textContent = localeManager.getLocale() === 'id' ? 
        'Tambah Cerita Baru' : 'Add New Story';
    }
    if (addStorySubtitle) {
      addStorySubtitle.textContent = localeManager.getLocale() === 'id' ? 
        'Bagikan sesuatu yang menarik dengan komunitas' : 'Share something interesting with the community';
    }

    // Update floating button title
    const floatingBtn = document.getElementById('floating-add-btn');
    if (floatingBtn) {
      floatingBtn.title = msg('add-story');
    }
  }

  showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');
    
    // Show selected page
    const targetPage = document.getElementById(`${pageName}-page`);
    if (targetPage) {
      targetPage.style.display = 'block';
      this.currentPage = pageName;
      
      // Update navigation
      const navigation = document.getElementById('navigation');
      if (navigation) {
        navigation.currentPage = pageName;
      }
    }
    
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showLoading(show) {
    const loadingSpinner = document.getElementById('loading-spinner');
    const storiesGrid = document.getElementById('stories-grid');
    const noStories = document.getElementById('no-stories');
    
    if (show) {
      loadingSpinner.style.display = 'block';
      storiesGrid.style.display = 'none';
      noStories.style.display = 'none';
    } else {
      loadingSpinner.style.display = 'none';
    }
  }

  renderStories() {
    const storiesGrid = document.getElementById('stories-grid');
    const noStories = document.getElementById('no-stories');
    
    if (this.stories.length === 0) {
      storiesGrid.style.display = 'none';
      noStories.style.display = 'block';
      return;
    }
    
    // Clear existing stories
    storiesGrid.innerHTML = '';
    
    // Render each story
    this.stories.forEach(story => {
      const storyCard = document.createElement('story-card');
      storyCard.story = story;
      storiesGrid.appendChild(storyCard);
    });
    
    storiesGrid.style.display = 'grid';
    noStories.style.display = 'none';
  }

  async addNewStory(formData) {
    if (!this.isAuthenticated) {
      ApiErrorHandler.showErrorToUser({
        message: 'Please login to add a story',
        status: 401
      });
      this.showPage('login');
      return;
    }

    try {
      // Show loading
      this.showLoading(true);
      
      // Send story to API
      const response = await StoryService.addStory(formData);
      
      if (response.error === false) {
        ApiErrorHandler.showSuccessMessage('Story added successfully!');
        
        // Reload stories to get the latest data
        await this.loadStories();
        
        // Navigate back to dashboard
        this.showPage('dashboard');
      } else {
        throw new Error(response.message || 'Failed to add story');
      }
    } catch (error) {
      console.error('Error adding story:', error);
      ApiErrorHandler.showErrorToUser(error);
    } finally {
      this.showLoading(false);
    }
  }

  showError() {
    const storiesGrid = document.getElementById('stories-grid');
    const noStories = document.getElementById('no-stories');
    
    storiesGrid.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger text-center" role="alert">
          <i class="fas fa-exclamation-triangle me-2"></i>
          ${localeManager.getLocale() === 'id' ? 
            'Gagal memuat cerita. Silakan coba lagi.' : 
            'Failed to load stories. Please try again.'}
        </div>
      </div>
    `;
    
    storiesGrid.style.display = 'grid';
    noStories.style.display = 'none';
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new StoryApp();
});

// Handle service worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Service worker registration would go here
    console.log('App ready for service worker registration');
  });
}
