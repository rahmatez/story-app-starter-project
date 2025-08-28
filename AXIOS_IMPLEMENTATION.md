# Story App - Axios Instance Implementation

## 📋 Implementation Overview

Implementasi **Axios Instance** pada Story App sesuai dengan instruksi submission kedua dari Dicoding. Implementasi ini mencakup:

### ✅ Kriteria Utama yang Dipenuhi

1. **Menjaga Seluruh Kriteria Proyek Pertama** ✅
   - Semua fitur dari submission pertama tetap berfungsi
   - Menggunakan Lit Web Components, Bootstrap 5, dan Sass

2. **Memanfaatkan Story API sebagai Penyedia Data** ✅
   - Menggunakan API dari `https://story-api.dicoding.dev/v1`
   - Menampilkan stories dari API
   - Menambahkan story baru melalui API

3. **Menambahkan Fitur Authentication** ✅
   - Halaman Login dengan validasi
   - Halaman Register dengan validasi
   - Fitur Logout
   - Perlindungan route yang memerlukan authentication

4. **HTTP Client dengan Axios** ✅
   - Menggunakan Axios sebagai HTTP client
   - Implementasi error handling yang komprehensif
   - Response dan request interceptors

5. **Menampilkan Loading** ✅
   - Loading spinner saat fetch data
   - Loading state pada form submission
   - Bootstrap spinner dan placeholder components

### ⭐ Saran yang Diimplementasikan

1. **Feedback pada Login/Register** ✅
   - Toast notifications untuk success/error
   - Inline form validation dengan feedback
   - Error handling untuk berbagai skenario

2. **Fitur Password Enhanced** ✅
   - Validasi minimal 8 karakter
   - Show/hide password toggle
   - Real-time password requirement checker

3. **Axios Instance** ✅
   - Custom axios instance dengan base configuration
   - Request interceptor untuk token authentication
   - Response interceptor untuk error handling
   - Retry logic untuk authentication errors

## 🏗 Struktur Implementasi

### 📁 API Layer

```
src/js/api/
├── api-client.js          # Axios instance configuration
└── story-api.js           # API service methods
```

#### `api-client.js`
- **Base URL**: `https://story-api.dicoding.dev/v1`
- **Timeout**: 10 seconds
- **Request Interceptor**: Automatic token attachment
- **Response Interceptor**: Error handling & auth retry logic

#### `story-api.js`
Provides service classes:
- `AuthService`: login, register, logout, isAuthenticated
- `StoryService`: getAllStories, getStoryById, addStory
- `NotificationService`: subscribe, unsubscribe

### 🛠 Utilities

```
src/js/utils/
└── api-error-handler.js   # Centralized error handling
```

#### `ApiErrorHandler`
- User-friendly error messages
- Toast notifications
- Form validation helpers
- Success message handling

### 🎨 New Components

```
src/js/components/
├── login-page.js          # Login form component
└── register-page.js       # Registration form component
```

#### Authentication Components
- **Responsive design** with gradient backgrounds
- **Real-time validation** with visual feedback
- **Password strength indicator**
- **Loading states** during API calls
- **Error handling** with specific messages

## 🔧 Key Features

### 🔐 Authentication Flow

1. **Login Process**:
   ```javascript
   AuthService.login(credentials) → Store token → Navigate to dashboard
   ```

2. **Registration Process**:
   ```javascript
   AuthService.register(userData) → Show success → Navigate to login
   ```

3. **Token Management**:
   - Stored in `localStorage`
   - Automatic attachment to requests
   - Automatic cleanup on logout/expiry

### 📊 Story Management

1. **Fetch Stories** (Authenticated):
   ```javascript
   StoryService.getAllStories() → Display in grid
   ```

2. **Add Story** (Authenticated):
   ```javascript
   StoryService.addStory(formData) → Refresh list → Navigate to dashboard
   ```

3. **Fallback for Non-authenticated**:
   - Shows dummy data from local JSON
   - Prompts login for add story functionality

### 🎯 Error Handling Strategy

```javascript
// API Client Response Interceptor
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle authentication failure
      AuthService.logout();
      window.dispatchEvent(new CustomEvent('auth-failed'));
    }
    // Format and return user-friendly error
    return Promise.reject(ApiErrorHandler.handleError(error));
  }
);
```

### 📱 Responsive UI Components

- **Mobile-first design** with Bootstrap 5
- **Progressive enhancement** for desktop
- **Accessibility features** (skip links, ARIA labels)
- **Loading states** with visual feedback
- **Toast notifications** for user feedback

## 🚀 Usage Examples

### Making API Calls

```javascript
// Get all stories
try {
  const response = await StoryService.getAllStories({
    page: 1,
    size: 10,
    location: 0
  });
  
  if (response.error === false) {
    this.stories = response.listStory;
  }
} catch (error) {
  ApiErrorHandler.showErrorToUser(error);
}
```

### Adding a Story

```javascript
// Create FormData for multipart upload
const formData = new FormData();
formData.append('description', description);
formData.append('photo', photoFile);

try {
  const response = await StoryService.addStory(formData);
  ApiErrorHandler.showSuccessMessage('Story added successfully!');
} catch (error) {
  ApiErrorHandler.showErrorToUser(error);
}
```

### Authentication Check

```javascript
// Check if user is authenticated
if (AuthService.isAuthenticated()) {
  // User is logged in
  const user = AuthService.getCurrentUser();
  console.log('Welcome', user.name);
} else {
  // Redirect to login
  this.showPage('login');
}
```

## 🔍 Technical Implementation Details

### Request/Response Flow

1. **Request Preparation**:
   ```
   User Action → Form Validation → API Service → Axios Instance
   ```

2. **Request Processing**:
   ```
   Request Interceptor → Add Auth Token → Send to API
   ```

3. **Response Handling**:
   ```
   API Response → Response Interceptor → Error Check → Success/Error UI
   ```

### State Management

- **Authentication State**: Managed globally with localStorage
- **Story State**: Component-level state with API synchronization
- **UI State**: Component-specific reactive properties

### Error Recovery

- **Network Errors**: Retry prompts and offline handling
- **Authentication Errors**: Automatic logout and login redirect
- **Validation Errors**: Inline form feedback
- **Server Errors**: User-friendly error messages

## 📋 API Endpoints Used

| Endpoint | Method | Purpose | Authentication |
|----------|--------|---------|----------------|
| `/login` | POST | User login | No |
| `/register` | POST | User registration | No |
| `/stories` | GET | Get all stories | Yes |
| `/stories` | POST | Add new story | Yes |

## 🎨 UI/UX Enhancements

### Visual Feedback
- **Loading spinners** during API calls
- **Progress indicators** for form submissions
- **Toast notifications** for success/error states
- **Form validation** with real-time feedback

### Accessibility
- **Keyboard navigation** support
- **Screen reader** compatible
- **Focus management** for better UX
- **Error announcements** for assistive technology

### Responsive Design
- **Mobile-first** approach
- **Touch-friendly** interactions
- **Adaptive layouts** for different screen sizes
- **Performance optimized** for mobile networks

## 🔧 Development Notes

### Build Configuration
- Webpack configuration remains unchanged
- Axios added as dependency
- No additional build steps required

### Browser Compatibility
- Modern browsers (ES6+ support)
- Polyfills for older browsers if needed
- Progressive enhancement strategy

### Performance Considerations
- **Lazy loading** for heavy components
- **Request caching** where appropriate
- **Image optimization** for uploads
- **Bundle size optimization**

## 📈 Future Enhancements

Potential improvements that could be added:

1. **Offline Support** with Service Workers
2. **Image Compression** before upload
3. **Infinite Scrolling** for stories
4. **Real-time Updates** with WebSockets
5. **Advanced Filtering** and search
6. **Story Categories** and tags
7. **User Profiles** and following system
8. **Social Features** (likes, comments)

---

## 🎉 Status Implementasi: SELESAI ✅

**Semua fitur Axios Instance telah berhasil diimplementasikan dan diuji!**

### ✅ Yang Telah Diselesaikan:
- **Axios Instance** dengan konfigurasi lengkap dan interceptors
- **Authentication API** (Login/Register/Logout) dengan token management
- **Story API** (Get/Add stories) dengan file upload support
- **Error Handling** yang komprehensif untuk semua skenario
- **UI Components** untuk login/register dengan validasi
- **Integration** penuh dengan aplikasi utama
- **Testing** manual berhasil dan aplikasi berjalan sempurna

### 🚀 Cara Testing:
1. Jalankan `npm run serve` 
2. Buka `http://localhost:8080`
3. Test flow: Register → Login → Add Story → Logout
4. Test error scenarios untuk validasi

### 📋 Kriteria Submission Terpenuhi:
- ✅ **Axios Instance** sebagai HTTP client
- ✅ **Story API Integration** dengan authentication
- ✅ **File Upload** dengan multipart/form-data
- ✅ **Authentication Flow** yang lengkap
- ✅ **Error Handling** yang user-friendly
- ✅ **UI/UX** yang responsive dan modern

### 🎯 Ready for Submission:
Aplikasi siap untuk submission kedua dengan implementasi Axios Instance yang lengkap dan sesuai kriteria.

**Implementasi oleh**: rahmatez  
**Tanggal**: 28 Agustus 2025  
**Status**: Production Ready ✅
