# 🚀 Panduan Deploy Story App ke Firebase Hosting

## 📋 Prerequisites
- ✅ Firebase CLI sudah terinstall
- ✅ Login Firebase berhasil (rahmatezdev@gmail.com)
- ✅ Project sudah di-build dengan `npm run build`

## 🔧 Langkah-langkah Deploy

### STEP 1: Buat Firebase Project Manual
1. **Buka Firebase Console**: https://console.firebase.google.com/
2. **Klik "Add project"**
3. **Project name**: `story-app-submission` atau `story-app-dicoding`
4. **Project ID**: akan auto-generate (contoh: `story-app-submission-a1b2c`)
5. **Disable Google Analytics** (tidak diperlukan)
6. **Create project**

### STEP 2: Konfigurasi Firebase di Terminal
```bash
# 1. Set project yang baru dibuat
firebase use --add

# 2. Pilih project yang baru dibuat dari list
# 3. Beri alias: default

# 4. Verifikasi project
firebase list
```

### STEP 3: Build Project
```bash
# Build production
npm run build

# Pastikan folder 'dist' terbuat dengan file:
# - index.html
# - app.bundle.js  
# - favicon.png
```

### STEP 4: Deploy ke Firebase
```bash
# Deploy pertama kali
firebase deploy

# Atau deploy hosting saja
firebase deploy --only hosting
```

## 📁 Struktur Project untuk Deploy

```
story-app-starter-project/
├── dist/                  # Build output (yang akan di-deploy)
│   ├── index.html
│   ├── app.bundle.js
│   └── favicon.png
├── firebase.json          # ✅ Sudah dikonfigurasi
├── .firebaserc           # Akan dibuat setelah firebase use
└── src/                  # Source code
```

## ⚙️ Konfigurasi Firebase.json (Sudah Ready)

\`\`\`json
{
  "hosting": {
    "public": "dist",           # Deploy dari folder dist
    "ignore": [                 # File yang diabaikan
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [               # SPA routing
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
\`\`\`

## 🌐 Setelah Deploy Berhasil

Anda akan mendapat:
1. **Hosting URL**: `https://project-id.web.app`
2. **Custom domain**: `https://project-id.firebaseapp.com`

## 📸 Screenshot yang Diperlukan

### 1. Firebase Console
- Screenshot project dashboard
- Screenshot hosting section dengan deployed app
- URL yang aktif

### 2. Live Application  
- Screenshot aplikasi running di Firebase URL
- Homepage dengan data stories loaded
- Navigation dan fitur yang berfungsi

## 🚨 Troubleshooting

### Jika "No projects found":
1. Buat project manual di Firebase Console
2. Gunakan `firebase use --add` untuk link project

### Jika build error:
```bash
# Clean dan rebuild
rm -rf dist/
npm run build
```

### Jika deploy error:
```bash
# Check firebase login
firebase login --reauth

# Check project
firebase list
```

## 📝 Langkah Selanjutnya

1. **Buat Firebase Project** di console
2. **Link project** dengan `firebase use --add`
3. **Build project** dengan `npm run build`
4. **Deploy** dengan `firebase deploy`
5. **Ambil screenshot** untuk submission
6. **Update student.md** dengan URL live

---

**Status**: Siap deploy setelah Firebase project dibuat di console!
