import { LitElement, html } from 'lit';
import { localeManager } from '../locales/locale-manager.js';

export class AboutPage extends LitElement {
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
    const content = this.locale === 'id' ? {
      title: 'Tentang Story App',
      subtitle: 'Platform berbagi cerita yang menghubungkan orang-orang',
      description: 'Story App adalah platform yang memungkinkan Anda berbagi momen-momen berharga dalam hidup. Dari pengalaman sehari-hari hingga petualangan luar biasa, setiap cerita memiliki nilai dan makna tersendiri.',
      features: [
        {
          icon: 'fas fa-camera',
          title: 'Berbagi Foto',
          description: 'Upload foto dan ceritakan kisah di baliknya'
        },
        {
          icon: 'fas fa-users',
          title: 'Komunitas',
          description: 'Terhubung dengan orang-orang yang memiliki minat serupa'
        },
        {
          icon: 'fas fa-heart',
          title: 'Inspirasi',
          description: 'Temukan inspirasi dari cerita-cerita menarik orang lain'
        },
        {
          icon: 'fas fa-globe',
          title: 'Jangkauan Global',
          description: 'Bagikan cerita Anda ke seluruh dunia'
        }
      ],
      developer: {
        title: 'Developer',
        name: 'Tim Pengembang Story App',
        description: 'Dikembangkan oleh rahmatez menggunakan teknologi web modern seperti Lit, Bootstrap, dan Sass.',
        tech: 'Teknologi yang digunakan: JavaScript ES6+, Lit Web Components, Bootstrap 5, Sass, Webpack'
      }
    } : {
      title: 'About Story App',
      subtitle: 'A story-sharing platform that connects people',
      description: 'Story App is a platform that allows you to share precious moments in life. From daily experiences to extraordinary adventures, every story has its own value and meaning.',
      features: [
        {
          icon: 'fas fa-camera',
          title: 'Share Photos',
          description: 'Upload photos and tell the stories behind them'
        },
        {
          icon: 'fas fa-users',
          title: 'Community',
          description: 'Connect with people who share similar interests'
        },
        {
          icon: 'fas fa-heart',
          title: 'Inspiration',
          description: 'Find inspiration from interesting stories of others'
        },
        {
          icon: 'fas fa-globe',
          title: 'Global Reach',
          description: 'Share your stories with the whole world'
        }
      ],
      developer: {
        title: 'Developer',
        name: 'Story App Development Team',
        description: 'Developed with ❤️ using modern web technologies like Lit, Bootstrap, and Sass.',
        tech: 'Technologies used: JavaScript ES6+, Lit Web Components, Bootstrap 5, Sass, Webpack'
      }
    };

    return html`
      <div class="about-page">
        <div class="container py-5">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="text-center mb-5">
                <h1 class="display-4 fw-bold text-gradient mb-3">${content.title}</h1>
                <p class="lead text-muted">${content.subtitle}</p>
              </div>

              <div class="card shadow-sm mb-5">
                <div class="card-body p-5">
                  <p class="fs-5 text-muted lh-lg">${content.description}</p>
                </div>
              </div>

              <div class="row g-4 mb-5">
                ${content.features.map(feature => html`
                  <div class="col-md-6">
                    <div class="card h-100 border-0 shadow-sm">
                      <div class="card-body text-center p-4">
                        <div class="text-primary mb-3">
                          <i class="${feature.icon} fa-3x"></i>
                        </div>
                        <h5 class="card-title fw-semibold">${feature.title}</h5>
                        <p class="card-text text-muted">${feature.description}</p>
                      </div>
                    </div>
                  </div>
                `)}
              </div>

              <div class="card bg-light border-0">
                <div class="card-body p-5 text-center">
                  <h3 class="fw-bold mb-3">${content.developer.title}</h3>
                  <h5 class="text-primary mb-3">${content.developer.name}</h5>
                  <p class="mb-3">${content.developer.description}</p>
                  <small class="text-muted">${content.developer.tech}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('about-page', AboutPage);
