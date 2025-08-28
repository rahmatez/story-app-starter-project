# Screenshots

Folder ini berisi screenshot deployment dan GitHub pull request untuk Dicoding Submission.

## Instruksi Submission

### 1. Firebase Hosting Deployment
- Screenshot halaman Firebase Hosting console
- Tampilan aplikasi yang sudah live
- URL deploy yang dapat diakses

### 2. GitHub Pull Request
- Screenshot halaman GitHub pull request
- Tampilan merge status
- GitHub Actions deployment logs

## Format Screenshot yang Dibutuhkan

### Firebase Hosting
- Nama file: `firebase-hosting-deployment.png`
- Isi: Console Firebase Hosting dengan status deploy success
- URL aplikasi yang live

### GitHub Pull Request
- Nama file: `github-pull-request.png`  
- Isi: Halaman PR dengan status merged
- GitHub Actions workflow success

## Saran 5 & 6 Implementation

Sesuai instruksi submission:
- ✅ Saran 5: Deploy aplikasi ke Firebase Hosting
- ✅ Saran 6: Deploy menggunakan GitHub Pull Request workflow

## Template Deployment

1. **Setup Firebase Project**
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   ```

2. **Build & Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

3. **GitHub PR Workflow**
   - Create feature branch
   - Make changes
   - Create Pull Request
   - Merge triggers auto-deployment

---

**Note**: Tambahkan screenshot aktual setelah deployment ke folder ini.

Lihat file `image.png` di folder utama untuk contoh screenshot yang diperlukan.
