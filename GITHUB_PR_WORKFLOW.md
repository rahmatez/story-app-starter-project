# 🔄 GitHub Pull Request Deployment Workflow

## 🎯 Tujuan Saran 6
Melakukan deployment menggunakan GitHub Pull Request workflow yang otomatis deploy ke Firebase Hosting.

## 📋 Proses GitHub PR Deployment

### WORKFLOW OVERVIEW:
```
Feature Branch → Pull Request → Preview Deploy → Review → Merge → Production Deploy
```

## 🚀 LANGKAH-LANGKAH IMPLEMENTASI

### STEP 1: Setup GitHub Secrets
```bash
# Buka GitHub Repository Settings
# Add these secrets:
# - FIREBASE_SERVICE_ACCOUNT (JSON dari Firebase)
# - FIREBASE_PROJECT_ID (project ID Firebase)
```

### STEP 2: Create Feature Branch
```bash
# 1. Create dan switch ke feature branch
git checkout -b feature/final-deployment

# 2. Make some changes untuk trigger workflow
echo "# Final Deployment Test" >> DEPLOYMENT_LOG.md

# 3. Commit changes
git add .
git commit -m "feat: final deployment test untuk submission"
```

### STEP 3: Push Branch dan Create PR
```bash
# 1. Push feature branch
git push origin feature/final-deployment

# 2. Buka GitHub repository
# 3. Create Pull Request dari feature/final-deployment ke main
# 4. Add description: "Final deployment test untuk Submission Dicoding"
```

### STEP 4: GitHub Actions Auto-Deploy Preview
```
✅ GitHub Actions akan otomatis:
1. Run ESLint check
2. Build project  
3. Deploy ke Firebase preview channel
4. Comment di PR dengan preview URL
```

### STEP 5: Review dan Merge
```bash
# 1. Review PR changes
# 2. Check preview deployment URL
# 3. Ensure all checks pass
# 4. Merge Pull Request
# 5. Auto-deploy ke production
```

## 📸 SCREENSHOT REQUIREMENTS

### 1. GitHub Pull Request Page
**Capture ini untuk submission:**
- PR title dan description
- GitHub Actions status (✅ passed)
- Preview URL comment dari bot
- "All checks have passed"
- "Merge pull request" button

### 2. GitHub Actions Workflow
**Capture ini juga:**
- Actions tab dengan workflow runs
- Build dan deploy logs
- Success status

### 3. Firebase Preview URLs
**Capture aplikasi live:**
- Preview URL dari PR comment
- Production URL setelah merge
- Firebase console dengan deployment

## 🔧 Alternative: Simple PR Workflow

Jika GitHub Secrets sulit di-setup, gunakan workflow sederhana:

### STEP 1: Manual Firebase Deploy
```bash
# Deploy manual ke Firebase
firebase deploy
```

### STEP 2: Create Documentation PR
```bash
# 1. Create branch
git checkout -b docs/deployment-documentation

# 2. Update dokumentasi dengan URL live
# 3. Commit dan push
# 4. Create PR dengan documentation changes
# 5. Screenshot PR process
# 6. Merge PR
```

## 📋 CHECKLIST SUBMISSION

### ✅ Yang Harus Diselesaikan:
- [ ] GitHub Actions workflow configured
- [ ] Firebase secrets setup (atau manual deploy)
- [ ] Create Pull Request dengan changes
- [ ] Screenshot PR page dengan deployment info
- [ ] Screenshot Firebase console
- [ ] Screenshot live application
- [ ] Merge PR untuk production
- [ ] Dokumentasi deployment process

### 📸 Screenshots untuk Folder:
```
screenshots/
├── github-pull-request.png      # PR page dengan deployment
├── github-actions-workflow.png  # Actions workflow success  
├── firebase-hosting-console.png # Firebase console
└── app-live-deployment.png     # Live app running
```

## 🎯 HASIL AKHIR

Setelah workflow selesai:
- ✅ GitHub PR workflow documented
- ✅ Automated deployment setup
- ✅ Preview dan production URLs
- ✅ Screenshots untuk submission
- ✅ **SARAN 6 COMPLETE!**

---

**Status**: Setup workflow ini untuk mendapat nilai maksimal pada Saran 6! 🏆
