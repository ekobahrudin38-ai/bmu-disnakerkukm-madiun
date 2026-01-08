# 🚀 PANDUAN DEPLOY ULANG KE VERCEL - STEP BY STEP

## 📋 PERSIAPAN

Pastikan Anda sudah punya:
- ✅ Akun Vercel (https://vercel.com)
- ✅ Repository Git (GitHub/GitLab/Bitbucket)
- ✅ File project BMU yang sudah diperbaiki

---

## 🔧 METODE 1: AUTO-DEPLOY VIA GIT (RECOMMENDED)

### **Langkah 1: Update File di Local**

File yang sudah diperbaiki:
- ✅ `index.html` - Langsung tampilkan login
- ✅ `vercel.json` - Perbaikan rewrite rules
- ✅ `bmu-script.js` - Enhanced sync (opsional)

### **Langkah 2: Commit ke Git**

**A. Jika menggunakan Git GUI (GitHub Desktop, SourceTree):**
1. Buka aplikasi Git GUI
2. Pilih repository BMU
3. Lihat perubahan file (Changes)
4. Centang semua file yang berubah
5. Tulis commit message: "Fix: Perbaiki deployment Vercel"
6. Klik "Commit"
7. Klik "Push" untuk upload ke GitHub

**B. Jika menggunakan Command Line:**
```bash
# Masuk ke folder project
cd path/to/bmu-project

# Cek status file
git status

# Add semua perubahan
git add .

# Commit dengan pesan
git commit -m "Fix: Perbaiki deployment Vercel - tombol tidak bisa diakses"

# Push ke GitHub
git push origin main
```

### **Langkah 3: Vercel Auto-Deploy**

1. **Buka Vercel Dashboard:** https://vercel.com/dashboard
2. **Pilih project:** bmu-disnakerkukm-madiun
3. **Lihat tab "Deployments"**
4. **Tunggu proses build:** Status akan berubah dari "Building" → "Ready"
5. **Estimasi waktu:** 2-3 menit

### **Langkah 4: Verifikasi Deployment**

1. **Klik "Visit"** pada deployment yang baru
2. **Atau buka:** https://bmu-disnakerkukm-madiun.vercel.app/
3. **Clear cache browser:** Ctrl + Shift + R
4. **Cek halaman login muncul dengan benar**

---

## 🔧 METODE 2: MANUAL DEPLOY VIA VERCEL CLI

Jika auto-deploy tidak berfungsi:

### **Langkah 1: Install Vercel CLI**

```bash
# Install via npm
npm install -g vercel

# Atau via yarn
yarn global add vercel
```

### **Langkah 2: Login ke Vercel**

```bash
# Login
vercel login

# Pilih metode login (Email, GitHub, GitLab, Bitbucket)
# Ikuti instruksi di browser
```

### **Langkah 3: Deploy Project**

```bash
# Masuk ke folder project
cd path/to/bmu-project

# Deploy ke production
vercel --prod

# Ikuti prompt:
# - Set up and deploy? Yes
# - Which scope? Pilih account Anda
# - Link to existing project? Yes
# - What's the name? bmu-disnakerkukm-madiun
# - Overwrite? Yes
```

### **Langkah 4: Tunggu Deployment Selesai**

```bash
# Output akan menampilkan:
# ✓ Production: https://bmu-disnakerkukm-madiun.vercel.app
# ✓ Deployed to production
```

---

## 🔧 METODE 3: MANUAL UPLOAD VIA VERCEL DASHBOARD

Jika tidak menggunakan Git:

### **Langkah 1: Siapkan File**

1. **Compress folder project** menjadi ZIP
2. **Pastikan semua file ada:**
   - index.html
   - bmu-login.html
   - bmu-index.html
   - bmu-login-styles.css
   - bmu-login-script.js
   - bmu-script.js
   - bmu-supabase-config.js
   - vercel.json
   - dll.

### **Langkah 2: Upload ke Vercel**

1. **Buka:** https://vercel.com/new
2. **Klik "Browse"** atau drag & drop ZIP file
3. **Tunggu upload selesai**
4. **Configure project:**
   - Project Name: bmu-disnakerkukm-madiun
   - Framework Preset: Other
   - Root Directory: ./
5. **Klik "Deploy"**

### **Langkah 3: Tunggu Build Selesai**

1. **Monitor build logs**
2. **Tunggu status "Ready"**
3. **Klik "Visit" untuk test**

---

## 🧪 TESTING SETELAH DEPLOYMENT

### **Test 1: Halaman Login**

```
URL: https://bmu-disnakerkukm-madiun.vercel.app/

✅ PASS jika:
- Halaman login muncul dengan form
- Ada input username dan password
- Ada tombol "Masuk ke Dashboard"
- Background animasi berfungsi

❌ FAIL jika:
- Hanya menampilkan teks footer
- Halaman kosong/blank
- Error 404
```

### **Test 2: Login Functionality**

```
1. Masukkan username: BMU-Madiun08
2. Masukkan password: BMU-Madiun08
3. Klik "Masuk ke Dashboard"

✅ PASS jika:
- Redirect ke dashboard BMU
- Dashboard menampilkan menu dan data

❌ FAIL jika:
- Error message muncul
- Tidak ada respon
- Redirect ke halaman salah
```

### **Test 3: All Routes**

```
Test semua URL:
1. / (root) → Halaman login
2. /login → Halaman login
3. /dashboard → Dashboard BMU (setelah login)
4. /demo → Demo page

✅ PASS: Semua route berfungsi
❌ FAIL: Ada route yang error 404
```

---

## 🚨 TROUBLESHOOTING

### ❌ Problem: "Building" stuck terlalu lama

**Solution:**
```bash
# 1. Cancel deployment
# Di Vercel Dashboard > Deployments
# Klik "..." > Cancel Deployment

# 2. Redeploy
# Klik "Redeploy" pada deployment sebelumnya
```

### ❌ Problem: Build failed dengan error

**Solution:**
```bash
# 1. Cek Build Logs
# Di Vercel Dashboard > Deployments > Build Logs
# Lihat error message

# 2. Common errors:
# - Missing files: Pastikan semua file ter-upload
# - Syntax error: Cek file yang error
# - Permission denied: Cek .vercelignore

# 3. Fix error dan redeploy
```

### ❌ Problem: Halaman masih menampilkan versi lama

**Solution:**
```bash
# 1. Clear Vercel cache
# Vercel Dashboard > Settings > General
# Scroll ke "Clear Cache" > Klik

# 2. Clear browser cache
# Chrome: Ctrl + Shift + Delete
# Pilih "Cached images and files"
# Clear data

# 3. Test di Incognito mode
# Chrome: Ctrl + Shift + N
# Buka URL website
```

### ❌ Problem: CSS/JS tidak ter-load

**Solution:**
```bash
# 1. Cek file ada di deployment
# Vercel Dashboard > Deployments > Source
# Pastikan file CSS/JS ada

# 2. Cek path di HTML
# Pastikan path relatif benar:
# <link rel="stylesheet" href="bmu-login-styles.css">
# <script src="bmu-login-script.js"></script>

# 3. Cek .vercelignore
# Pastikan file CSS/JS tidak di-ignore
```

---

## 📊 MONITORING DEPLOYMENT

### **Cek Status Deployment**

```bash
# Via Vercel CLI
vercel ls

# Output:
# bmu-disnakerkukm-madiun
# Production: https://bmu-disnakerkukm-madiun.vercel.app
# Status: Ready
```

### **Cek Logs**

```bash
# Via Vercel CLI
vercel logs https://bmu-disnakerkukm-madiun.vercel.app

# Atau via Dashboard:
# Vercel Dashboard > Project > Logs
```

### **Cek Analytics**

```bash
# Via Dashboard:
# Vercel Dashboard > Project > Analytics
# Lihat:
# - Page views
# - Unique visitors
# - Response time
```

---

## ✅ CHECKLIST DEPLOYMENT BERHASIL

- [ ] Git commit dan push berhasil
- [ ] Vercel auto-deploy triggered
- [ ] Build status "Ready" (bukan "Error")
- [ ] URL website bisa diakses
- [ ] Halaman login muncul dengan benar
- [ ] Form login berfungsi
- [ ] Login berhasil redirect ke dashboard
- [ ] Semua route berfungsi
- [ ] CSS dan JS ter-load dengan benar
- [ ] Tidak ada error di browser console

---

## 🎯 HASIL AKHIR

Setelah deployment berhasil:

✅ **Website:** https://bmu-disnakerkukm-madiun.vercel.app/
✅ **Status:** Online dan berfungsi
✅ **Login:** Username/Password berfungsi
✅ **Dashboard:** Bisa diakses setelah login
✅ **Semua fitur:** Berfungsi normal

---

## 📞 BANTUAN LEBIH LANJUT

Jika masih ada masalah:

1. **Cek Vercel Status:** https://www.vercel-status.com/
2. **Vercel Documentation:** https://vercel.com/docs
3. **Vercel Support:** https://vercel.com/support
4. **Community Forum:** https://github.com/vercel/vercel/discussions

---

## 🎉 SELESAI!

Deployment berhasil! Website BMU sekarang bisa diakses dengan normal.

**Next Steps:**
1. Test semua functionality
2. Lakukan perbaikan sinkronisasi (lihat PERBAIKAN-SINKRONISASI.md)
3. Update database Supabase (lihat supabase-sql-fix-recycle.sql)
4. Monitor performance dan error logs