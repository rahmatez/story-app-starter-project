// Import our custom CSS
import '../sass/main.scss';

// Import data
import storyData from '../data/storyapp.json';

// Import components
import './components/app-navigation.js';
import './components/app-footer.js';
import './components/story-card.js';
import './components/add-story-form.js';
import './components/loading-spinner.js';
import './components/about-page.js';

// Import utilities
import { localeManager } from './locales/locale-manager.js';

class StoryApp {
  constructor() {
    this.stories = [];
    this.currentPage = 'dashboard';
    this.isLoading = false;
    
    this.init();
  }

  async init() {
    // Load initial data
    await this.loadStories();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Setup localization
    this.setupLocalization();
    
    // Show initial page
    this.showPage('dashboard');
    
    console.log('Story App initialized successfully!');
  }

  async loadStories() {
    this.isLoading = true;
    this.showLoading(true);
    
    try {
      // Simulate API loading delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Load stories from JSON data
      this.stories = storyData.listStory || [];
      
      this.renderStories();
    } catch (error) {
      console.error('Error loading stories:', error);
      this.showError();
    } finally {
      this.isLoading = false;
      this.showLoading(false);
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
    addStoryForm.addEventListener('story-added', (event) => {
      this.addNewStory(event.detail.story);
    });

    addStoryForm.addEventListener('form-cancel', () => {
      this.showPage('dashboard');
    });

    // Floating add button
    const floatingAddBtn = document.getElementById('floating-add-btn');
    floatingAddBtn.addEventListener('click', () => {
      this.showPage('add-story');
    });

    // Add first story button
    const addFirstStoryBtn = document.getElementById('add-first-story-btn');
    addFirstStoryBtn.addEventListener('click', () => {
      this.showPage('add-story');
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
      navigation.currentPage = pageName;
    }
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

  addNewStory(newStory) {
    // Add to beginning of stories array
    this.stories.unshift(newStory);
    
    // Re-render stories
    this.renderStories();
    
    // Navigate back to dashboard
    this.showPage('dashboard');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
