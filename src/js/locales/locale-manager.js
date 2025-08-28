import { messages } from './messages.js';

class LocaleManager {
  constructor() {
    this.currentLocale = localStorage.getItem('locale') || 'id';
    this.listeners = [];
  }

  setLocale(locale) {
    if (messages[locale]) {
      this.currentLocale = locale;
      localStorage.setItem('locale', locale);
      this.notifyListeners();
    }
  }

  getLocale() {
    return this.currentLocale;
  }

  getMessage(key) {
    return messages[this.currentLocale]?.[key] || messages['id'][key] || key;
  }

  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback(this.currentLocale));
  }
}

export const localeManager = new LocaleManager();
