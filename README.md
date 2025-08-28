# Story App

Story App adalah aplikasi web berbagi cerita yang dibangun menggunakan teknologi modern seperti **Lit Web Components**, **Bootstrap 5**, dan **Sass**. Aplikasi ini memungkinkan pengguna untuk melihat dan menambahkan cerita dengan foto.

## 🎯 Fitur Utama

- **Dashboard Cerita**: Menampilkan daftar cerita dari pengguna dalam format card yang menarik
- **Tambah Cerita**: Form untuk menambahkan cerita baru dengan validasi Bootstrap
- **Halaman About**: Informasi tentang aplikasi dan developer
- **Multi-bahasa**: Mendukung Bahasa Indonesia dan English
- **Responsive Design**: Tampilan yang optimal di semua perangkat
- **Date Formatting**: Menampilkan tanggal dalam format yang mudah dibaca

## 🛠 Teknologi yang Digunakan

### Frontend Framework & Library
- **Lit**: Modern web components library
- **Bootstrap 5**: CSS framework untuk styling
- **Sass**: CSS preprocessor dengan fitur modular

### Build Tools
- **Webpack**: Module bundler
- **Babel**: JavaScript transpiler
- **Autoprefixer**: CSS vendor prefix

### Styling Architecture
- **Variables**: Warna, typography, spacing yang konsisten
- **Mixins**: Reusable style patterns
- **Nested Selectors**: Hierarchical styling
- **Ampersand Operator**: Parent selector referencing
- **Modular Sass**: Menggunakan @import untuk modularitas

## 📋 Kriteria Submission yang Dipenuhi

### ✅ Kriteria Wajib

1. **Memanfaatkan Story Dummy** 
   - ✅ Menggunakan data dari `storyapp.json`
   - ✅ Menampilkan nama user, gambar, deskripsi, dan tanggal

2. **Fungsionalitas Aplikasi**
   - ✅ Halaman Dashboard dengan navigation bar
   - ✅ Halaman Tambah Story dengan form validation
   - ✅ Navigation yang responsif dengan offcanvas

3. **Desain Berbeda dari Money Tracker App**
   - ✅ Navigation bar dengan offcanvas
   - ✅ Card layout untuk stories
   - ✅ Halaman About untuk developer
   - ✅ Layout form yang berbeda

4. **Styling dengan Sass**
   - ✅ Variables (`_variables.scss`)
   - ✅ Mixins (`_mixins.scss`)
   - ✅ Nested Selector
   - ✅ Ampersand Operator (`&:hover`, `&.active`)
   - ✅ Modular dengan @import (kompatibel dengan Bootstrap)

5. **Bootstrap sebagai Styling**
   - ✅ Navbar
   - ✅ Cards
   - ✅ Buttons
   - ✅ Forms
   - ✅ Modal/Offcanvas
   - ✅ Grid System
   - ✅ Form Validation

6. **Minimal 5 Lit Component**
   - ✅ `app-navigation` (Navigation component)
   - ✅ `app-footer` (Footer component)
   - ✅ `story-card` (Story display component)
   - ✅ `add-story-form` (Form component)
   - ✅ `loading-spinner` (Loading indicator - dengan Shadow DOM)
   - ✅ `about-page` (About page component - dengan Shadow DOM)

### ✅ Saran Tambahan

1. **Kustomisasi Bootstrap**
   - ✅ Custom navbar styling
   - ✅ Custom card styling
   - ✅ Custom button styling
   - ✅ Custom form styling
   - ✅ Custom footer styling

2. **Lit Component dengan Shadow DOM**
   - ✅ `loading-spinner` component
   - ✅ `about-page` component (partial shadow DOM)

3. **Lit Localization**
   - ✅ Sistem lokalisasi dengan `LocaleManager`
   - ✅ Dukungan Bahasa Indonesia dan English
   - ✅ Dynamic language switching

4. **Format Tanggal yang Mudah Dibaca**
   - ✅ Menggunakan `DateFormatter` utility
   - ✅ Konversi ISO 8601 ke format readable
   - ✅ Relative time (misal: "2 jam yang lalu")

## 🚀 Cara Menjalankan

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Development Mode**
   ```bash
   npm run serve
   ```
   Aplikasi akan berjalan di `http://localhost:8080`

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📁 Struktur Project

```
src/
├── js/
│   ├── components/          # Lit Components
│   │   ├── app-navigation.js
│   │   ├── app-footer.js
│   │   ├── story-card.js
│   │   ├── add-story-form.js
│   │   ├── loading-spinner.js
│   │   └── about-page.js
│   ├── locales/            # Localization
│   │   ├── messages.js
│   │   └── locale-manager.js
│   ├── utils/              # Utilities
│   │   └── date-formatter.js
│   └── index.js           # Main app
├── sass/
│   ├── abstracts/         # Variables & Mixins
│   │   ├── _variables.scss
│   │   └── _mixins.scss
│   ├── layout/            # Layout components
│   │   ├── _header.scss
│   │   └── _footer.scss
│   ├── components/        # Component styles
│   │   ├── _story-card.scss
│   │   └── _add-story-form.scss
│   ├── pages/             # Page-specific styles
│   │   ├── _dashboard.scss
│   │   └── _add-story.scss
│   └── main.scss          # Main stylesheet
├── data/
│   └── storyapp.json      # Story data
├── views/
│   └── index.html         # Main HTML template
└── public/
    └── favicon.png        # App icon
```

## 🎨 Fitur Styling

### Bootstrap Components yang Digunakan
1. **Navbar** - Navigation dengan offcanvas
2. **Cards** - Display stories
3. **Buttons** - Actions dan navigation
4. **Forms** - Add story form dengan validation
5. **Grid System** - Layout responsif
6. **Alerts** - Error/success messages
7. **Offcanvas** - Mobile navigation

### Custom Sass Features
- **Variables**: Consistent color scheme, typography, dan spacing
- **Mixins**: Reusable button, card, dan layout patterns
- **Nested Selectors**: Organized component styling
- **Ampersand Operator**: Hover states dan modifiers
- **Responsive Design**: Mobile-first approach

## 🌐 Fitur Lokalisasi

Aplikasi mendukung dua bahasa:
- **Bahasa Indonesia (ID)**: Default language
- **English (EN)**: Alternative language

Pengguna dapat mengubah bahasa melalui tombol globe di navigation bar.

## 🎯 Komponen Lit

### 1. `app-navigation`
- Navigation bar dengan offcanvas
- Language switcher
- Active page indicator

### 2. `story-card`
- Menampilkan story dengan format card
- Avatar generator dari nama
- Formatted date display
- Action buttons

### 3. `add-story-form`
- Form validation dengan Bootstrap
- File upload dengan drag & drop UI
- Custom error messages

### 4. `loading-spinner` (Shadow DOM)
- Custom loading indicator
- Isolated styling

### 5. `about-page` (Partial Shadow DOM)
- Developer information
- Technology stack info

### 6. `app-footer`
- Social links
- Copyright information

## 📱 Responsive Design

Aplikasi dirancang mobile-first dengan breakpoints:
- **Mobile**: < 576px
- **Tablet**: 768px - 991px
- **Desktop**: ≥ 992px

## 🔧 Build Configuration

- **Webpack**: Module bundling dan development server
- **Sass Loader**: Compile Sass ke CSS
- **Babel**: ES6+ transpilation
- **Autoprefixer**: Vendor prefix otomatis
- **Hot Module Replacement**: Live reload saat development

## 👨‍💻 Developer

Dikembangkan oleh **Story App Team** menggunakan best practices modern web development.

---

**© 2024 Story App. All rights reserved.**
