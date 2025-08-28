# 🔐 Setup GitHub Secrets untuk Firebase Deployment

## Secrets yang Diperlukan

Untuk GitHub Actions workflow berfungsi, Anda perlu menambahkan secrets berikut di GitHub repository:

### 1. FIREBASE_SERVICE_ACCOUNT
```bash
# Generate Firebase service account key
firebase init hosting:github

# Atau manual:
# 1. Go to Firebase Console > Project Settings > Service Accounts
# 2. Generate new private key
# 3. Copy JSON content ke GitHub Secrets
```

### 2. FIREBASE_PROJECT_ID
```
# Project ID Firebase Anda (contoh: story-app-submission-a1b2c)
story-app-submission-a1b2c
```

## Cara Menambahkan Secrets

1. **Buka GitHub Repository**
   - Go to: https://github.com/rahmatez/story-app-starter-project
   
2. **Masuk ke Settings**
   - Click "Settings" tab
   - Pilih "Secrets and variables" > "Actions"
   
3. **Add Repository Secrets**
   - Click "New repository secret"
   - Name: `FIREBASE_SERVICE_ACCOUNT`
   - Value: [Firebase service account JSON]
   
   - Click "New repository secret"  
   - Name: `FIREBASE_PROJECT_ID`
   - Value: [Your Firebase project ID]

## Generate Firebase Service Account

```bash
# Method 1: Automatic setup
firebase init hosting:github

# Method 2: Manual
# 1. Firebase Console > Project Settings
# 2. Service Accounts tab
# 3. "Generate new private key"
# 4. Download JSON file
# 5. Copy content ke GitHub Secret
```

## Test Workflow

Setelah secrets ready:

```bash
# 1. Create feature branch
git checkout -b feature/test-deployment

# 2. Make some changes
echo "# Test" >> test.md

# 3. Commit and push
git add .
git commit -m "Test deployment workflow"
git push origin feature/test-deployment

# 4. Create Pull Request di GitHub
# 5. GitHub Actions akan auto-deploy preview
```

---

**Status**: Secrets setup required untuk GitHub Actions deployment workflow.
